import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import Papa from 'papaparse';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

// --- CONFIGURATION ---
const CSV_FILE_PATH = './SB_publication_PMC.csv';
const OUTPUT_JSON_PATH = './src/data/ai-generated-data.json';
const BATCH_SIZE = 20; // Recommended: Set to 20-25 for the full run

// --- API KEY POOL MANAGEMENT ---
if (!process.env.GEMINI_API_KEYS) {
    throw new Error("GEMINI_API_KEYS not found in .env file. Please add it as a comma-separated list.");
}
const apiKeys = process.env.GEMINI_API_KEYS.split(',').map(k => k.trim());
let currentKeyIndex = 0;

let genAI = new GoogleGenerativeAI(apiKeys[currentKeyIndex]);
let model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
console.log(`🔑 Initialized with ${apiKeys.length} API keys.`);

const categories = [
    'plant-biology', 'radiation-effects', 'human-physiology', 
    'microbiology', 'cellular-biology'
];

/**
 * Scrapes the full text content from a given URL.
 * @param {string} url The URL of the article to scrape.
 * @returns {Promise<string|null>} The scraped text, or null if an error occurs.
 */
async function scrapeFullText(url) {
    try {
        const { data } = await axios.get(url, { headers: {'User-Agent': 'Mozilla/5.0'} });
        const $ = cheerio.load(data);
        const abstract = $('div#abs').text().trim();
        const body = $('div.tsec.sec').text().trim();
        const fullText = (abstract + '\n\n' + body).replace(/\s\s+/g, ' ');
        return fullText.slice(0, 15000); 
    } catch (error) {
        console.error(`❌ Failed to scrape ${url}: ${error.message}`);
        return null;
    }
}

/**
 * Analyzes text with the Gemini AI, with logic for retries and API key rotation.
 * @param {string} text The text content of the research paper.
 * @param {string} title The original title of the paper.
 * @returns {Promise<object|null>} The structured JSON object from the AI, or null if it fails.
 */
async function analyzeWithAI(text, title) {
    const prompt = `
        You are a research assistant specializing in space biology.
        Analyze the following research paper text. Based *only* on the text provided, return a JSON object with the following structure:
        {
          "summary": "A concise, easy-to-understand summary of the research (8-10 sentences).",
          "category": "The most relevant category from this list: [${categories.join(', ')}].",
          "year": The publication year (as a number). If not found, use the current year ${new Date().getFullYear()}.",
          "keywords": ["An array of 5-7 relevant keywords."]
        }
        
        Original Title: "${title}"
        Paper Text: "${text}"
    `;
    
    const maxRetries = 3;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const jsonText = response.text().replace(/```json|```/g, '').trim();
            return JSON.parse(jsonText);
        } catch (error) {
            if (error.message.includes('429 Too Many Requests')) {
                console.warn(`  - 🔑 Quota exceeded for key #${currentKeyIndex + 1}.`);
                currentKeyIndex++;

                if (currentKeyIndex >= apiKeys.length) {
                    console.error("  - 🚨 All API keys have exceeded their quotas. Please try again tomorrow.");
                    throw new Error("All API keys exhausted.");
                }

                console.log(`  - 🔄 Switching to API key #${currentKeyIndex + 1}.`);
                genAI = new GoogleGenerativeAI(apiKeys[currentKeyIndex]);
                model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
                attempt = 0; // Reset attempt counter to give the new key a full chance
                continue; 
            }

            console.error(`  - AI analysis failed for title "${title}" (Attempt ${attempt}/${maxRetries})`);
            if (attempt === maxRetries) {
                console.error(`  - ❌ Final attempt failed. Skipping article. Error: ${error.message}`);
                return null;
            }
            const delay = 2000;
            console.log(`  - ⚠️ Retrying in ${delay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    return null;
}

/**
 * Main function to orchestrate the data enrichment process.
 */
async function main() {
    console.log("🚀 Starting AI data enrichment process...");
    let existingData = [];
    if (fs.existsSync(OUTPUT_JSON_PATH)) {
        try {
            const fileContent = fs.readFileSync(OUTPUT_JSON_PATH, 'utf8');
            // Handle case where file is empty
            if (fileContent) {
              existingData = JSON.parse(fileContent);
            }
            console.log(`🔍 Found ${existingData.length} articles already processed.`);
        } catch (e) {
            console.error("⚠️ Could not parse existing JSON file. Starting from scratch.");
            existingData = [];
        }
    }

    const fileContent = fs.readFileSync(CSV_FILE_PATH, 'utf8');
    const parsedCsv = Papa.parse(fileContent, { header: true });
    
    const startIndex = existingData.length;
    const endIndex = startIndex + BATCH_SIZE;
    const articlesToProcess = parsedCsv.data.slice(startIndex, endIndex);

    if (articlesToProcess.length === 0) {
        console.log("✅ All articles have been processed. Nothing to do!");
        return;
    }

    console.log(`⚙️  Processing a new batch of ${articlesToProcess.length} articles (from #${startIndex + 1} to #${Math.min(endIndex, parsedCsv.data.length)})...`);
    
    const newlyProcessedData = [];
    try {
        for (const row of articlesToProcess) {
            if (row && row.Title && row.Link) {
                console.log(`\nProcessing: ${row.Title}`);
                
                const text = await scrapeFullText(row.Link);
                if (text) {
                    const aiData = await analyzeWithAI(text, row.Title);
                    if (aiData) {
                        console.log(`  ✅ AI analysis successful! Category: ${aiData.category}`);
                        const newId = String(startIndex + newlyProcessedData.length + 1);
                        newlyProcessedData.push({
                            id: newId, title: row.Title, url: row.Link, ...aiData, organism: 'Various', experiment: 'Multiple', duration: 'N/A', location: 'Space & Ground Studies', methodology: 'Refer to full publication.', findings: [aiData.summary], implications: ['Refer to the full publication for detailed implications.'], relatedStudies: [],
                        });
                    }
                }
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    } catch (error) {
        if (error.message === "All API keys exhausted.") {
            console.log("\nScript stopped because all API keys have run out of quota for today.");
        } else {
            console.error("\nAn unexpected error stopped the script:", error);
        }
    }

    const combinedData = [...existingData, ...newlyProcessedData];
    fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(combinedData, null, 2));
    console.log(`\n\n🎉 Success! Saved a total of ${combinedData.length} articles to ${OUTPUT_JSON_PATH}`);
}

main();