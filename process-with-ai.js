import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import Papa from 'papaparse';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

// --- CONFIGURATION ---
const CSV_FILE_PATH = './SB_publication_PMC.csv';
const OUTPUT_JSON_PATH = './src/data/ai-generated-data.json';
// ADD: Set how many articles to process in each run.
const BATCH_SIZE = 5; // You can change this number (e.g., to 10, 25, or 50)

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const categories = [
    'plant-biology', 'radiation-effects', 'human-physiology', 
    'microbiology', 'cellular-biology'
];

// --- (Scraping and AI functions remain the same) ---

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

async function analyzeWithAI(text, title) {
    const prompt = `
        You are a research assistant specializing in space biology.
        Analyze the following research paper text. Based *only* on the text provided, return a JSON object with the following structure:
        {
          "summary": "A concise, easy-to-understand summary of the research (5-7 sentences).",
          "category": "The most relevant category from this list: [${categories.join(', ')}].",
          "year": "The publication year (as a number). If not found, use the current year ${new Date().getFullYear()}.",
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
            console.error(`  - AI analysis failed for title "${title}" (Attempt ${attempt}/${maxRetries})`);
            if (attempt === maxRetries) {
                console.error(`  - ❌ Final attempt failed. Skipping this article. Error: ${error.message}`);
                return null;
            }
            const delay = 2000;
            console.log(`  - ⚠️ Model may be overloaded. Retrying in ${delay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    return null;
}

// --- MAIN ORCHESTRATION FUNCTION (UPDATED) ---
async function main() {
    console.log("🚀 Starting AI data enrichment process...");

    // --- NEW: Load existing data if it exists ---
    let existingData = [];
    if (fs.existsSync(OUTPUT_JSON_PATH)) {
        try {
            const fileContent = fs.readFileSync(OUTPUT_JSON_PATH, 'utf8');
            existingData = JSON.parse(fileContent);
            console.log(`🔍 Found ${existingData.length} articles already processed.`);
        } catch (e) {
            console.error("⚠️ Could not parse existing JSON file. Starting from scratch.");
            existingData = [];
        }
    }

    const fileContent = fs.readFileSync(CSV_FILE_PATH, 'utf8');
    const parsedCsv = Papa.parse(fileContent, { header: true });
    
    // --- NEW: Automatically determine where to start ---
    const startIndex = existingData.length;
    const endIndex = startIndex + BATCH_SIZE;
    const articlesToProcess = parsedCsv.data.slice(startIndex, endIndex);

    if (articlesToProcess.length === 0) {
        console.log("✅ All articles have been processed. Nothing to do!");
        return;
    }

    console.log(`⚙️  Processing a new batch of ${articlesToProcess.length} articles (from #${startIndex + 1} to #${Math.min(endIndex, parsedCsv.data.length)})...`);
    
    const newlyProcessedData = [];
    for (const row of articlesToProcess) {
        if (row.Title && row.Link) {
            console.log(`\nProcessing: ${row.Title}`);
            
            const text = await scrapeFullText(row.Link);
            if (text) {
                const aiData = await analyzeWithAI(text, row.Title);
                if (aiData) {
                    console.log(`  ✅ AI analysis successful! Category: ${aiData.category}`);
                    // Note: ID is now based on the overall index, not the batch index
                    const newId = String(startIndex + newlyProcessedData.length + 1);
                    newlyProcessedData.push({
                        id: newId,
                        title: row.Title,
                        url: row.Link,
                        ...aiData,
                        organism: 'Various', experiment: 'Multiple', duration: 'N/A', location: 'Space & Ground Studies', methodology: 'Refer to full publication.', findings: [aiData.summary], implications: ['Refer to the full publication for detailed implications.'], relatedStudies: [],
                    });
                }
            }
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // --- NEW: Combine old and new data ---
    const combinedData = [...existingData, ...newlyProcessedData];
    
    fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(combinedData, null, 2));
    console.log(`\n\n🎉 Success! Saved a total of ${combinedData.length} articles to ${OUTPUT_JSON_PATH}`);
}

main();