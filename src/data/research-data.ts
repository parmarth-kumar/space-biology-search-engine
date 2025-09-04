import { Leaf, Radiation, Heart, Globe, Microscope, Zap } from 'lucide-react';

export interface ResearchItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  keywords: string[];
  year: number;
  findings: string[];
  methodology: string;
  implications: string[];
  relatedStudies: string[];
  organism?: string;
  experiment: string;
  duration: string;
  location: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: any;
}

export const categories: Category[] = [
  {
    id: 'all',
    name: 'All Research',
    description: 'Browse all space biology research',
    icon: Globe
  },
  {
    id: 'plant-biology',
    name: 'Plant Biology',
    description: 'How plants grow and adapt in space',
    icon: Leaf
  },
  {
    id: 'radiation-effects',
    name: 'Radiation Effects',
    description: 'Impact of cosmic radiation on living organisms',
    icon: Radiation
  },
  {
    id: 'human-physiology',
    name: 'Human Physiology',
    description: 'Changes in human body systems in space',
    icon: Heart
  },
  {
    id: 'microbiology',
    name: 'Microbiology',
    description: 'Behavior of microorganisms in space',
    icon: Microscope
  },
  {
    id: 'cellular-biology',
    name: 'Cellular Biology',
    description: 'Cellular responses to space environment',
    icon: Zap
  }
];

export const researchData: ResearchItem[] = [
  {
    id: '1',
    title: 'How Plants Adapt Growth in Microgravity?',
    summary: 'Comprehensive study of how microgravity affects plant root orientation, growth rates, and cellular development patterns in space station environments.',
    category: 'plant-biology',
    keywords: ['microgravity', 'plant growth', 'root orientation', 'phototropism'],
    year: 2023,
    organism: 'Arabidopsis thaliana',
    experiment: 'Advanced Plant Habitat (APH-04)',
    duration: '120 days',
    location: 'International Space Station',
    methodology: 'Seeds were grown in specialized plant growth chambers with controlled lighting, water, and nutrient delivery systems. Growth patterns were monitored using high-resolution imaging and compared to Earth-based controls.',
    findings: [
      'Plant roots showed random orientation in microgravity instead of growing downward',
      'Overall growth rate increased by 15% compared to Earth controls',
      'Cell walls became thicker, potentially as adaptation to space environment',
      'Phototropism response was enhanced, with plants showing stronger light-seeking behavior',
      'Gene expression changes indicated stress response activation'
    ],
    implications: [
      'Future space missions can optimize plant growth systems for food production',
      'Understanding of plant adaptation mechanisms enhanced',
      'Potential for developing space-adapted crop varieties',
      'Implications for sustainable life support systems on Mars missions'
    ],
    relatedStudies: [
      'Veggie Flight Experiments',
      'Plant Signaling in Space',
      'Root Growth Mechanisms Study'
    ]
  },
  {
    id: '2',
    title: 'DNA Damage & Repair under Cosmic Radiation',
    summary: 'Long-term analysis of DNA damage and repair mechanisms in astronauts exposed to cosmic radiation during extended space missions.',
    category: 'radiation-effects',
    keywords: ['cosmic radiation', 'DNA damage', 'chromosomal aberrations', 'space medicine', 'radiation effects'],
    year: 2024,
    organism: 'Human cells (astronaut samples)',
    experiment: 'Twins Study Follow-up',
    duration: '12 months',
    location: 'International Space Station + Ground Control',
    methodology: 'Blood samples were collected from astronauts before, during, and after 6-12 month ISS missions. DNA was analyzed for double-strand breaks, chromosomal aberrations, and epigenetic changes using advanced sequencing techniques.',
    findings: [
      'Increased DNA double-strand breaks during space flight',
      'Enhanced DNA repair gene expression in space',
      'Chromosomal aberrations persisted 6 months after return',
      'Telomere length changes correlated with mission duration',
      'Individual variation in radiation sensitivity observed'
    ],
    implications: [
      'Need for improved radiation shielding on long-duration missions',
      'Personalized risk assessment for astronaut selection',
      'Development of countermeasures for DNA protection',
      'Critical considerations for Mars mission planning'
    ],
    relatedStudies: [
      'Twin Study Genomics',
      'Radiation Countermeasures',
      'Astronaut Health Monitoring'
    ]
  },
  {
    id: '3',
    title: 'Bone Loss in Long-Term Space Missions',
    summary: 'Quantitative analysis of bone mineral density changes and calcium metabolism in astronauts during missions lasting 6 months or longer.',
    category: 'human-physiology',
    keywords: ['bone density', 'calcium metabolism', 'osteoporosis', 'exercise countermeasures'],
    year: 2023,
    organism: 'Human subjects',
    experiment: 'Bone and Muscle Check',
    duration: '6-12 months',
    location: 'International Space Station',
    methodology: 'High-resolution peripheral quantitative computed tomography (HR-pQCT) scans were performed before and after missions. Blood and urine samples monitored calcium and bone turnover markers. Exercise protocols were tracked.',
    findings: [
      'Average bone density loss of 1.5% per month in weight-bearing bones',
      'Hip and spine showed greatest density reduction',
      'Calcium excretion increased significantly in early mission phases',
      'Exercise countermeasures reduced but did not prevent bone loss',
      'Recovery took 6-24 months post-mission'
    ],
    implications: [
      'Enhanced exercise protocols needed for long missions',
      'Pharmaceutical interventions may be required',
      'Pre-mission bone health optimization critical',
      'Long-term health monitoring required for returning astronauts'
    ],
    relatedStudies: [
      'COLPA Exercise Study',
      'Muscle Atrophy Research',
      'Cardiovascular Deconditioning'
    ]
  },
  {
    id: '4',
    title: 'Microbes in Spacecraft: Risks & Adaptations',
    summary: 'Investigation of how common microorganisms survive, adapt, and potentially mutate in the unique environment of spacecraft systems.',
    category: 'microbiology',
    keywords: ['microbes', 'biofilm formation', 'antibiotic resistance', 'spacecraft contamination'],
    year: 2024,
    organism: 'E. coli, Staphylococcus aureus',
    experiment: 'Microbial Tracking-3',
    duration: '6 months',
    location: 'International Space Station',
    methodology: 'Environmental samples were collected from various ISS surfaces and analyzed for microbial diversity and behavior. Laboratory experiments examined growth rates, biofilm formation, and genetic changes in controlled space conditions.',
    findings: [
      'Certain bacteria showed increased antibiotic resistance in space',
      'Enhanced biofilm formation on spacecraft surfaces observed',
      'Some species exhibited altered growth patterns and morphology',
      'Reduced effectiveness of standard sterilization procedures',
      'Novel gene expression patterns related to stress response'
    ],
    implications: [
      'Need for new sterilization protocols for spacecraft',
      'Potential health risks for crew on long missions',
      'Importance of environmental monitoring systems',
      'Development of space-specific antimicrobial strategies'
    ],
    relatedStudies: [
      'ISS Microbiome Project',
      'Biofilm Prevention Research',
      'Spacecraft Sterilization Methods'
    ]
  },
  {
    id: '5',
    title: 'Cellular Response to Simulated Mars Conditions',
    summary: 'Comprehensive study of human cell survival and adaptation mechanisms under Mars-like atmospheric and radiation conditions.',
    category: 'cellular-biology',
    keywords: ['Mars simulation', 'cellular adaptation', 'atmospheric pressure', 'UV radiation'],
    year: 2024,
    organism: 'Human cell cultures',
    experiment: 'Mars Environment Chamber',
    duration: '90 days',
    location: 'NASA Mars Simulation Laboratory',
    methodology: 'Human cell cultures were exposed to simulated Mars conditions including low atmospheric pressure, high CO2 levels, and intense UV radiation. Cell viability, gene expression, and metabolic activity were monitored continuously.',
    findings: [
      'Significant upregulation of DNA repair genes',
      'Altered cellular metabolism under low pressure conditions',
      'Enhanced oxidative stress response mechanisms',
      'Some cell types showed remarkable adaptation capabilities',
      'Critical threshold pressures identified for cell survival'
    ],
    implications: [
      'Habitat design requirements for Mars missions',
      'Understanding human health risks on Mars surface',
      'Potential for cellular adaptation to alien environments',
      'Development of protective measures for Mars explorers'
    ],
    relatedStudies: [
      'Mars Habitat Simulation',
      'Pressure Suit Requirements',
      'Radiation Shielding Research'
    ]
  },
  {
    id: '6',
    title: 'Protein Crystallization in Zero Gravity',
    summary: 'Analysis of protein structure formation and crystallization processes in microgravity environments for pharmaceutical applications.',
    category: 'cellular-biology',
    keywords: ['protein crystallization', 'drug development', 'structural biology', 'pharmaceuticals'],
    year: 2023,
    organism: 'Various proteins',
    experiment: 'Protein Crystal Growth-4',
    duration: '60 days',
    location: 'International Space Station',
    methodology: 'Multiple protein samples were crystallized in microgravity conditions using specialized crystallization equipment. Crystal quality, size, and structure were compared to Earth-grown counterparts using X-ray crystallography.',
    findings: [
      'Significantly larger and higher-quality protein crystals formed in space',
      'Reduced crystal defects and improved structural resolution',
      'Novel crystal forms not achievable on Earth',
      'Enhanced understanding of protein folding mechanisms',
      'Potential for improved drug design and development'
    ],
    implications: [
      'Space-based pharmaceutical manufacturing opportunities',
      'Better understanding of disease-related proteins',
      'Improved drug efficacy through better crystal structures',
      'Economic potential for space-based biotechnology'
    ],
    relatedStudies: [
      'Space Pharmaceutical Manufacturing',
      'Protein Folding Studies',
      'Drug Development Research'
    ]
  },
  {
    id: '7',
    title: 'Cardiovascular Deconditioning in Astronauts',
    summary: 'Longitudinal study of heart function, blood pressure regulation, and vascular health during extended space missions.',
    category: 'human-physiology',
    keywords: ['cardiovascular health', 'blood pressure', 'heart function', 'orthostatic intolerance'],
    year: 2023,
    organism: 'Human subjects',
    experiment: 'Cardiovascular Health Consequences',
    duration: '12 months',
    location: 'International Space Station',
    methodology: 'Astronauts underwent comprehensive cardiovascular assessments including echocardiograms, blood pressure monitoring, and exercise testing before, during, and after missions. Vascular ultrasound tracked structural changes.',
    findings: [
      'Decreased cardiac muscle mass and function',
      'Altered blood pressure regulation upon return to Earth',
      'Increased arterial stiffness after long-duration flight',
      'Orthostatic intolerance in 60% of returning crew',
      'Exercise countermeasures showed limited effectiveness'
    ],
    implications: [
      'Enhanced cardiovascular countermeasures needed',
      'Implications for crew safety during emergency situations',
      'Long-term health monitoring required post-flight',
      'Critical considerations for Mars mission duration limits'
    ],
    relatedStudies: [
      'Exercise Countermeasures Project',
      'Fluid Shifts Study',
      'Vascular Health Research'
    ]
  },
  {
    id: '8',
    title: 'Brain Function & Plasticity in Space',
    summary: 'Investigation of brain structure and function changes in astronauts exposed to microgravity and radiation during spaceflight.',
    category: 'human-physiology',
    keywords: ['neuroplasticity', 'brain imaging', 'cognitive function', 'spatial orientation'],
    year: 2024,
    organism: 'Human subjects',
    experiment: 'Brain Changes in Space',
    duration: '6-12 months',
    location: 'International Space Station',
    methodology: 'Astronauts underwent MRI brain scans and cognitive testing before and after missions. Eye tracking, balance tests, and psychological assessments monitored changes in brain function and adaptation.',
    findings: [
      'Structural brain changes in regions controlling spatial orientation',
      'Altered white matter integrity in some brain regions',
      'Improved spatial processing abilities developed during flight',
      'Changes persisted several months after return',
      'Individual variations in adaptation patterns observed'
    ],
    implications: [
      'Understanding human adaptation to space environment',
      'Potential cognitive advantages for space exploration',
      'Need for neurological monitoring during long missions',
      'Insights into brain plasticity and rehabilitation'
    ],
    relatedStudies: [
      'Spatial Cognition Research',
      'Vestibular Adaptation Studies',
      'Psychological Health Monitoring'
    ]
  },
  {
    id: '9',
    title: 'Space-Grown Tissue Engineering Applications',
    summary: 'Development of three-dimensional tissue constructs using stem cells and biomaterials in microgravity conditions.',
    category: 'cellular-biology',
    keywords: ['tissue engineering', 'stem cells', '3D printing', 'regenerative medicine'],
    year: 2024,
    organism: 'Human stem cells',
    experiment: 'Tissue Engineering in Space',
    duration: '45 days',
    location: 'International Space Station',
    methodology: 'Stem cells were cultured in specialized bioreactors designed for microgravity. 3D tissue constructs were grown using bioprinting techniques and scaffold materials. Tissue quality and cellular organization were analyzed.',
    findings: [
      'Enhanced 3D tissue organization in microgravity',
      'Improved cellular differentiation and maturation',
      'Novel tissue architectures not possible on Earth',
      'Reduced inflammatory responses in space-grown tissues',
      'Potential for organ replacement applications'
    ],
    implications: [
      'Revolutionary approaches to regenerative medicine',
      'Space-based medical manufacturing opportunities',
      'Treatment options for Earth-based medical conditions',
      'Enhanced understanding of tissue development'
    ],
    relatedStudies: [
      '3D Bioprinting Research',
      'Stem Cell Biology',
      'Organ-on-Chip Technologies'
    ]
  },
  {
    id: '10',
    title: 'Algae Biofuel Production in Space Conditions',
    summary: 'Evaluation of microalgae growth and lipid production for biofuel applications under space environment conditions.',
    category: 'plant-biology',
    keywords: ['algae', 'biofuel', 'lipid production', 'sustainable energy'],
    year: 2023,
    organism: 'Chlorella vulgaris',
    experiment: 'Algae Biofuel Space Production',
    duration: '90 days',
    location: 'International Space Station',
    methodology: 'Microalgae cultures were grown in closed-loop bioreactors with controlled light, nutrients, and CO2. Growth rates, biomass production, and lipid content were measured and compared to Earth-based controls.',
    findings: [
      'Increased biomass productivity under controlled space conditions',
      'Higher lipid content per cell compared to Earth cultures',
      'Enhanced photosynthetic efficiency in microgravity',
      'Potential for closed-loop life support systems',
      'Reduced contamination risks in space environment'
    ],
    implications: [
      'Sustainable fuel production for space missions',
      'Enhanced life support system capabilities',
      'Commercial space-based manufacturing potential',
      'Contributions to Earth-based biofuel industry'
    ],
    relatedStudies: [
      'Closed-Loop Life Support',
      'Photobioreactor Design',
      'Sustainable Space Resources'
    ]
  }
];