export const COPY = {
  BRAND: {
    NAME:    'ResumeAI',
    TAGLINE: 'Get Hired Faster',
    POWERED: 'Powered by Google Gemini Flash 2.5',
  },

  HERO: {
    EYEBROW:       'Powered by Google Gemini Flash 2.5',
    HEADLINE_1:    'Your resume gets',
    HEADLINE_GRAD: '7 seconds.',
    HEADLINE_2:    'Make them count.',
    SUB:           'ResumeAI analyzes, scores, and rewrites your resume the way a senior recruiter would — in 30 seconds.',
    CTA_PRIMARY:   'Analyze My Resume Free',
    CTA_SECONDARY: 'See How It Works',
    TRUST_NOTE:    'No credit card · PDF upload · Results in 30s',
  },

  UPLOAD: {
    IDLE:        'Drop your PDF resume here',
    IDLE_SUB:    'or click to browse · PDF only · Max 5 MB',
    DRAGGING:    'Release to upload',
    ANALYZING:   'Analyzing your resume…',
    SUCCESS:     'File uploaded — analyzing now',
    ERROR_TYPE:  'Only PDF files are accepted.',
    ERROR_SIZE:  'File must be under 5 MB.',
  },

  ANALYSIS: {
    ATS_LABEL:     'ATS Score',
    ATS_TOOLTIP:   'How likely an ATS system is to surface your resume for a human reviewer.',
    READINESS_LABEL: 'Job Readiness',
  },

  NAV: {
    DASHBOARD:  'Dashboard',
    ANALYSIS:   'Analysis',
    HISTORY:    'History',
    PROFILE:    'Profile',
    SETTINGS:   'Settings',
  },
};





// can also do object.freeze(COPY) to make it immutable, but that would require deep freeze for nested objects
