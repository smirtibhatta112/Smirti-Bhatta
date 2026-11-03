import { CvProfile, AcademicRecord, SkillCategory, ProjectItem } from '../types';

export const cvProfile: CvProfile = {
  name: 'Smirti Bhatta',
  tagline: 'Build Better Tomorrow...',
  motto: 'Learn • Build • Contribute',
  title: 'Diploma Civil Engineer',
  enrolledDegree: 'B.E. Civil Engineering (Enrolled)',
  location: 'Pokhara, Nepal',
  phone: '+977 98XXXXXXXX',
  email: 'smirtibhatta@gmail.com',
  nationality: 'Nepali',
  languages: ['Nepali (Native)', 'English (Professional)', 'Hindi (Fluent)'],
  photoUrl: '/assets/aistudio/file_000000008b108211afcd9734819d952e_55e22934.png',
  objective:
    'A motivated and dedicated Civil Engineering graduate seeking an opportunity to build a professional career in the civil engineering field. Eager to apply technical knowledge, develop practical skills, and contribute to meaningful infrastructure projects through hard work, teamwork and continuous learning.',
  declaration:
    'I hereby declare that all the information provided above is true and correct to the best of my knowledge and belief.',
};

export const academicRecords: AcademicRecord[] = [
  {
    id: 'be-civil',
    degree: "Bachelor's Degree in Civil Engineering",
    institution: 'Far Western University (FWU), Nepal',
    board: 'FWU Central Campus',
    status: 'Currently Enrolled (Undergraduate)',
    highlights: [
      'Advanced structural mechanics, RCC analysis, and soil mechanics coursework',
      'Hydraulics, transportation planning, and geotechnical engineering studies',
      'Integration of modern BIM, computerized design, and environmental impact assessments',
    ],
  },
  {
    id: 'diploma-civil',
    degree: 'Diploma in Civil Engineering',
    institution: 'CTEVT Constituent / Affiliated Engineering Polytechnic',
    board: 'Council for Technical Education and Vocational Training (CTEVT), Nepal',
    status: 'Completed with Technical Honors',
    highlights: [
      'Field surveying using Dumpy levels, Theodolites, and leveling staves',
      'Building construction technology, concrete mix testing, and brickwork bonding',
      'Quantity surveying, rate analysis, and preparation of Bill of Quantities (BOQ)',
    ],
  },
  {
    id: 'see',
    degree: 'Secondary Education Examination (SEE)',
    institution: 'Secondary School, Nepal',
    board: 'National Examination Board (NEB), Nepal',
    status: 'Passed with Distinction in Science & Mathematics',
    highlights: [
      'Strong foundational grounding in geometry, trigonometry, and Newtonian physics',
      'Active participation in school environmental science and model construction clubs',
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'technical-civil',
    title: 'Core Civil Engineering Principles',
    description: 'Practical field methodologies, material science, and building protocols.',
    skills: [
      {
        name: 'Building Construction & Estimation',
        level: 'Proficient',
        details: 'Foundation layout, formwork inspection, RCC slab casting, and masonry bonding.',
      },
      {
        name: 'Quantity Surveying & Cost Estimation',
        level: 'Advanced',
        details: 'Extracting takeoff quantities from 2D drawings, unit rate analysis, and preparing detailed BOQs.',
      },
      {
        name: 'Surveying & Levelling',
        level: 'Proficient',
        details: 'Profile levelling, cross-sectioning, contouring, and benchmark reduction via height-of-collimation.',
      },
      {
        name: 'Engineering Drawings Interpretation',
        level: 'Expert',
        details: 'Structural details, reinforcement schedules, elevation plans, and MEP clash detection.',
      },
      {
        name: 'Construction Materials Testing',
        level: 'Proficient',
        details: 'Concrete slump tests, compressive cube testing, aggregate sieve analysis, and cement consistency.',
      },
      {
        name: 'Site Supervision & Quality Control',
        level: 'Practical',
        details: 'Safety enforcement, daily site log maintenance, curing schedule management, and bar bending checks.',
      },
    ],
  },
  {
    id: 'computer-cad',
    title: 'Computer & Software Applications',
    description: 'Digital CAD drafting, computational spreadsheets, and engineering documentation.',
    skills: [
      {
        name: 'AutoCAD (2D Drafting & Basic 3D)',
        level: 'Proficient',
        details: 'Architectural floor plans, elevation sections, beam reinforcement details, and dimension styling.',
      },
      {
        name: 'Microsoft Excel (Engineering BOQ)',
        level: 'Advanced',
        details: 'Automated quantity takeoff sheets, rate analysis models, bar bending schedule formulas.',
      },
      {
        name: 'Microsoft Word & Documentation',
        level: 'Proficient',
        details: 'Technical site reports, contract document formatting, specifications writing.',
      },
      {
        name: 'Microsoft PowerPoint',
        level: 'Proficient',
        details: 'Visual presentations for project reviews, safety inductions, and client briefings.',
      },
    ],
  },
  {
    id: 'personal-strengths',
    title: 'Professional Strengths & Field Mindset',
    description: 'Behavioral and collaborative competencies that drive successful construction execution.',
    skills: [
      {
        name: 'Hardworking & Self-Motivated',
        level: 'High Drive',
        details: 'Relentless work ethic on remote job sites and rigorous commitment to project deadlines.',
      },
      {
        name: 'Clear Field & Client Communication',
        level: 'Strong',
        details: 'Seamlessly translating engineering drawings to masons, sub-contractors, and site crews.',
      },
      {
        name: 'Teamwork & Crew Collaboration',
        level: 'Collaborative',
        details: 'Thriving within multi-disciplinary teams composed of architects, surveyors, and field workers.',
      },
      {
        name: 'Problem-Solving & Site Adaptability',
        level: 'Resourceful',
        details: 'Troubleshooting field contingencies, weather delays, and structural tolerances efficiently.',
      },
      {
        name: 'Responsible & Punctual',
        level: 'Reliable',
        details: 'Disciplined inspection schedules, precise measurement verification, and zero tolerance for defect.',
      },
    ],
  },
];

export const civilProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: '2.5-Story RCC Residential Building Plan',
    category: 'Structural Design & Drafting',
    description: 'Complete architectural and structural layout drafted in AutoCAD with beam-column framing schedules.',
    scope: 'Architectural floor plans, structural column grid (A-D, 1-4), isolated footings, and plinth beam layout.',
    specs: [
      { label: 'Built-up Area', value: '2,400 sq.ft' },
      { label: 'Structural System', value: 'RCC Frame Structure (M20)' },
      { label: 'AutoCAD Layers', value: '18 Drafting Layers' },
      { label: 'Location Context', value: 'Pokhara Valley, Nepal' },
    ],
  },
  {
    id: 'proj-2',
    title: 'Comprehensive Quantity Takeoff & BOQ',
    category: 'Estimation & Rate Analysis',
    description: 'Full bill of quantities for substructure and superstructure elements using local government norms (DUDBC).',
    scope: 'Excavation volume, PCC 1:3:6, RCC 1:1.5:3, formwork shuttering area, and Fe500 TMT reinforcement tonnage.',
    specs: [
      { label: 'Items Estimated', value: '42 Construction Line Items' },
      { label: 'Cement Required', value: '840 Bags (50kg)' },
      { label: 'Total Steel Weight', value: '11.8 Metric Tonnes' },
      { label: 'Norms Applied', value: 'Nepal DUDBC District Rates' },
    ],
  },
  {
    id: 'proj-3',
    title: 'Road Alignment & Profile Levelling Survey',
    category: 'Field Surveying & Geomatics',
    description: 'Closed-loop dumpy level survey across undulating terrain to compute cut-and-fill earthwork volumes.',
    scope: 'Reduced levels (RL) computed via Height of Instrument method with cross-sections at 15m intervals.',
    specs: [
      { label: 'Survey Length', value: '850 Meters' },
      { label: 'Instrument Used', value: 'Auto-Level & 4m Telescopic Staff' },
      { label: 'Closing Error', value: '± 4mm (Within Tolerance)' },
      { label: 'Earthwork Balance', value: 'Optimized Cut/Fill Ratio' },
    ],
  },
];
