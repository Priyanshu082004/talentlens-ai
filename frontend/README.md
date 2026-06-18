# AI Resume Analyzer — Complete Frontend Architecture
### Senior Frontend Architect Blueprint · Premium SaaS Redesign

---

## 0. Design Brief Summary

**Product:** AI Resume Analysis Platform (Gemini Flash 2.5 powered)  
**Audience:** Job-seekers, students, career-changers  
**Single job of the page:** Convert visitors into users who trust the AI to improve their resume  
**Inspiration:** Polymer.co, Linear, Vercel, Perplexity  
**Aesthetic risk:** Deep-space dark background with a bioluminescent indigo/violet glow system — the AI feels like it's *seeing through* your resume, not just reading it.

---

## 1. Design System Specification

### 1.1 Color Tokens

```css
/* Design Tokens — paste into src/styles/tokens.css */
:root {
  /* Backgrounds */
  --bg-base:       #050816;   /* deepest space */
  --bg-surface:    #0F172A;   /* card base */
  --bg-elevated:   #111827;   /* elevated panel */
  --bg-overlay:    rgba(15, 23, 42, 0.85); /* glass overlay */

  /* Primary — Indigo/Violet spectrum */
  --primary-400:   #818CF8;
  --primary-500:   #6366F1;   /* main CTA */
  --primary-600:   #4F46E5;
  --primary-700:   #4338CA;

  /* Secondary — Violet */
  --secondary-500: #7C3AED;
  --secondary-600: #6D28D9;

  /* Accent — Cyan */
  --accent-400:    #22D3EE;
  --accent-500:    #06B6D4;

  /* Text */
  --text-primary:  #F8FAFC;
  --text-secondary:#CBD5E1;
  --text-muted:    #64748B;
  --text-disabled: #334155;

  /* Semantic */
  --success:       #10B981;
  --warning:       #F59E0B;
  --danger:        #EF4444;
  --info:          #06B6D4;

  /* Gradients */
  --gradient-hero: linear-gradient(135deg, #6366F1 0%, #7C3AED 50%, #06B6D4 100%);
  --gradient-card: linear-gradient(145deg, rgba(99,102,241,0.08), rgba(124,58,237,0.04));
  --gradient-glow: radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%);

  /* Glass */
  --glass-bg:      rgba(15, 23, 42, 0.6);
  --glass-border:  rgba(99, 102, 241, 0.15);
  --glass-shadow:  0 8px 32px rgba(0, 0, 0, 0.4);

  /* Spacing Scale (8px base) */
  --space-1: 4px;  --space-2: 8px;   --space-3: 12px;
  --space-4: 16px; --space-6: 24px;  --space-8: 32px;
  --space-10: 40px;--space-12: 48px; --space-16: 64px;
  --space-20: 80px;--space-24: 96px;

  /* Border Radius */
  --radius-sm: 6px;   --radius-md: 12px;
  --radius-lg: 16px;  --radius-xl: 24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.4);
  --shadow-md:  0 4px 16px rgba(0,0,0,0.5);
  --shadow-lg:  0 8px 32px rgba(0,0,0,0.6);
  --shadow-glow:0 0 40px rgba(99,102,241,0.2);

  /* Transitions */
  --ease-out:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring:cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
}
```

### 1.2 Typography

```css
/* Import in index.html <head> */
/* Inter for body, Syne for display — unusual pairing that reads tech-editorial */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-display: 'Syne', sans-serif;     /* Headlines, hero */
  --font-body:    'Inter', sans-serif;    /* All body copy */
  --font-mono:    'JetBrains Mono', monospace; /* Code, scores, data */

  /* Type Scale */
  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-3xl:  1.875rem;  /* 30px */
  --text-4xl:  2.25rem;   /* 36px */
  --text-5xl:  3rem;      /* 48px */
  --text-6xl:  3.75rem;   /* 60px */
  --text-7xl:  4.5rem;    /* 72px */

  /* Line Heights */
  --leading-tight:  1.1;
  --leading-snug:   1.3;
  --leading-normal: 1.5;
  --leading-relaxed:1.7;
}
```

**Typography Rationale:**
- **Syne** is a geometric display face with a slightly unusual stroke — it reads "engineered intelligence," not generic SaaS. Used only for H1/H2 with weight 700–800.
- **Inter** is the best-in-class legibility body face. No alternative needed.
- **JetBrains Mono** grounds data displays (ATS score: 87) in technical credibility.

### 1.3 Signature Element

The **Orbital Glow System** — each major section has a large, blurred radial gradient orb in indigo/violet that subtly shifts on scroll. It reads as the AI "illuminating" the content beneath it, reinforcing the core metaphor: intelligence shining light on your career. Used with restraint — max one orb visible per viewport.

---

## 2. Folder Structure

```
src/
├── assets/
│   ├── fonts/
│   ├── images/
│   └── icons/
│
├── components/                   # Reusable atoms/molecules
│   ├── ui/
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.module.css
│   │   ├── Card/
│   │   ├── Badge/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Spinner/
│   │   ├── Toast/
│   │   ├── Tooltip/
│   │   ├── ProgressBar/
│   │   ├── CircularProgress/
│   │   └── GlassCard/
│   │
│   ├── layout/
│   │   ├── Navbar/
│   │   ├── Sidebar/
│   │   ├── Footer/
│   │   └── PageWrapper/
│   │
│   └── shared/
│       ├── OrbGlow/              # Signature ambient glow element
│       ├── AnimatedText/         # GSAP text reveal
│       ├── ScrollReveal/         # GSAP ScrollTrigger wrapper
│       ├── GradientBorder/       # Animated gradient border
│       └── LoadingScreen/
│
├── pages/
│   ├── Landing/
│   │   ├── Landing.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── TrustedBy.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── AIShowcase.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── FAQ.jsx
│   │   │   └── CTASection.jsx
│   │   └── Landing.module.css
│   │
│   ├── Auth/
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── Login.module.css
│   │   └── Signup/
│   │       ├── Signup.jsx
│   │       └── Signup.module.css
│   │
│   └── Dashboard/
│       ├── Dashboard.jsx
│       ├── sections/
│       │   ├── ResumeUpload.jsx
│       │   ├── AnalysisResults.jsx
│       │   ├── AnalysisHistory.jsx
│       │   ├── ATSScoreCard.jsx
│       │   ├── SkillGap.jsx
│       │   ├── Suggestions.jsx
│       │   └── AnalysisTimeline.jsx
│       └── Dashboard.module.css
│
├── layouts/
│   ├── PublicLayout.jsx          # Landing + Auth pages
│   └── DashboardLayout.jsx       # Sidebar + main content
│
├── routes/
│   ├── index.jsx                 # Root router config
│   ├── PublicRoutes.jsx          # Unauthenticated routes
│   └── ProtectedRoutes.jsx       # Auth-gated routes
│
├── redux/
│   ├── store.js
│   └── slices/
│       ├── authSlice.js
│       ├── resumeSlice.js
│       └── uiSlice.js
│
├── hooks/
│   ├── useAuth.js
│   ├── useGSAP.js
│   ├── useScrollProgress.js
│   ├── useFileUpload.js
│   └── useAnalysis.js
│
├── services/
│   ├── api.js                    # Axios instance + interceptors
│   ├── authService.js
│   └── resumeService.js
│
├── animations/
│   ├── gsap.config.js            # GSAP plugin registration
│   ├── scrollAnimations.js       # ScrollTrigger presets
│   └── framerVariants.js         # Framer Motion variant library
│
├── utils/
│   ├── formatScore.js
│   ├── fileValidation.js
│   └── tokenStorage.js
│
├── constants/
│   ├── routes.js
│   ├── api.js
│   └── copy.js                   # All UI string constants
│
├── styles/
│   ├── tokens.css                # Design tokens (above)
│   ├── globals.css               # Reset + base styles
│   └── animations.css            # Keyframe library
│
└── main.jsx
```

---

## 3. Route Structure

```jsx
// src/routes/index.jsx

const Landing  = lazy(() => import('../pages/Landing/Landing'));
const Login    = lazy(() => import('../pages/Auth/Login/Login'));
const Signup   = lazy(() => import('../pages/Auth/Signup/Signup'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));

<Router>
  <Suspense fallback={<LoadingScreen />}>
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/"        element={<Landing />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/signup"  element={<Signup />} />
      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard"          element={<Dashboard />} />
          <Route path="/dashboard/analysis" element={<ResumeAnalysis />} />
          <Route path="/dashboard/history"  element={<AnalysisHistory />} />
          <Route path="/dashboard/profile"  element={<Profile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
</Router>
```

---

## 4. Redux Store Architecture

```js
// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer   from './slices/authSlice';
import resumeReducer from './slices/resumeSlice';
import uiReducer     from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth:   authReducer,
    resume: resumeReducer,
    ui:     uiReducer,
  },
});
```

### 4.1 authSlice

```js
// State shape
{
  user: null | { id, name, email, avatar },
  token: null | string,
  isLoading: false,
  error: null,
  isAuthenticated: false,
}

// Async Thunks
loginUser(credentials)     → POST /api/auth/login
registerUser(userData)     → POST /api/auth/register
logoutUser()               → clears token + state
fetchCurrentUser()         → GET  /api/auth/me  (on app init)
```

### 4.2 resumeSlice

```js
// State shape
{
  uploadedFile: null,
  uploadProgress: 0,
  isAnalyzing: false,
  analysisResult: null | {
    atsScore: number,
    strengths: string[],
    weaknesses: string[],
    suggestions: string[],
    skillGap: { matched: string[], missing: string[] },
    keywords: string[],
    jobReadinessScore: number,
    interviewQuestions: { q: string, a: string }[],
  },
  history: [],
  isLoadingHistory: false,
  error: null,
}

// Async Thunks
uploadAndAnalyze(file)    → POST /api/resume/analyze (multipart)
fetchHistory()            → GET  /api/resume/history
deleteAnalysis(id)        → DELETE /api/resume/:id
```

### 4.3 uiSlice

```js
// State shape
{
  sidebarCollapsed: false,
  activeSection: 'dashboard',
  toasts: [],
  scrollProgress: 0,
  theme: 'dark',          // locked dark for now
}
```

---

## 5. Page-wise UI/UX Strategy

### 5.1 Landing Page

**Visual metaphor:** Your resume passes through an AI lens. The page scrolls like looking through that lens deeper and deeper.

```
┌─────────────────────────────────────────┐
│  NAVBAR  (transparent → frosted glass   │
│          on scroll, logo + nav + CTA)   │
├─────────────────────────────────────────┤
│  SCROLL PROGRESS BAR (top, 2px line)   │
├─────────────────────────────────────────┤
│                                         │
│  HERO                                   │
│  ┌──────────────┐  ┌─────────────────┐  │
│  │ Text Block   │  │ Animated        │  │
│  │              │  │ Dashboard       │  │
│  │ "Your resume │  │ Mockup          │  │
│  │ doesn't get  │  │ (floating card  │  │
│  │ a second     │  │  with ATS score │  │
│  │ chance.      │  │  animating up)  │  │
│  │ Neither does │  │                 │  │
│  │ the AI       │  │                 │  │
│  │ reading it." │  │                 │  │
│  │              │  │                 │  │
│  │ [CTA] [Demo] │  │                 │  │
│  └──────────────┘  └─────────────────┘  │
│       Orbital glow orb behind text      │
│                                         │
├─────────────────────────────────────────┤
│  TRUSTED BY                             │
│  Scrolling logo marquee (CSS animation) │
├─────────────────────────────────────────┤
│  FEATURES (6 cards, 2-col grid)         │
│  Each card: icon, title, one-liner      │
│  GSAP stagger reveal on scroll          │
├─────────────────────────────────────────┤
│  HOW IT WORKS (3-step, horizontal)      │
│  Upload → Analyze → Insights            │
│  Animated connecting line between steps │
├─────────────────────────────────────────┤
│  AI SHOWCASE                            │
│  Pinned section, scroll within it       │
│  Left: text narrative changes           │
│  Right: dashboard mockup updates        │
├─────────────────────────────────────────┤
│  TESTIMONIALS (auto-scrolling cards)    │
├─────────────────────────────────────────┤
│  FAQ (accordion, smooth open/close)     │
├─────────────────────────────────────────┤
│  CTA SECTION                            │
│  Full-width gradient, large headline    │
│  Single strong CTA button              │
├─────────────────────────────────────────┤
│  FOOTER                                 │
└─────────────────────────────────────────┘
```

**Hero headline:** "Your resume gets 7 seconds. Make them count."  
**Sub-headline:** "ResumeAI uses Gemini to analyze, score, and rewrite your resume the way a senior recruiter would — in 30 seconds."

---

### 5.2 Login Page

Inspired by the Scale.ai screenshot provided (minimal centered form, soft gradient background).

```
┌──────────────────────────────────────────┐
│  Background: radial gradient             │
│  #050816 → indigo glow at top-center     │
│                                          │
│              [Logo]                      │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  GLASS CARD (backdrop-blur)        │  │
│  │                                    │  │
│  │  "Welcome back"                    │  │
│  │  "Sign in to your AI workspace"   │  │
│  │                                    │  │
│  │  [Email Input]                     │  │
│  │  [Password Input] [👁 toggle]      │  │
│  │                                    │  │
│  │  [Remember me]  [Forgot password?] │  │
│  │                                    │  │
│  │  [Sign In ──────────────────────]  │  │
│  │                                    │  │
│  │  ─────── or continue with ───────  │  │
│  │                                    │  │
│  │  [Google]  [GitHub] (placeholder)  │  │
│  │                                    │  │
│  │  Don't have an account? Sign up →  │  │
│  └────────────────────────────────────┘  │
│                                          │
└──────────────────────────────────────────┘
```

**Framer Motion:** Card entrance: `y: 24 → 0, opacity: 0 → 1, duration: 0.5, ease: easeOut`  
**Input focus:** border color transitions from `--glass-border` to `--primary-500` with glow shadow.

---

### 5.3 Signup Page

Same glass card layout. Additional elements:

- Password strength bar (4 segments: Weak / Fair / Good / Strong) with color fill animation
- Real-time validation shown inline (not as alerts)
- Terms checkbox with subtle required animation on submit attempt

```
Password strength indicator:
[████░░░░] Fair — add a symbol to strengthen
```

---

### 5.4 Dashboard Layout

```
┌──────┬────────────────────────────────────┐
│      │  TOPBAR                            │
│ SIDE │  [Breadcrumb]        [User avatar] │
│  BAR ├────────────────────────────────────┤
│      │                                    │
│  D   │  PAGE CONTENT (Outlet)             │
│  a   │                                    │
│  s   │                                    │
│  h   │                                    │
│  b   │                                    │
│  o   │                                    │
│  a   │                                    │
│  r   │                                    │
│  d   │                                    │
│      │                                    │
│  A   │                                    │
│  n   │                                    │
│  a   │                                    │
│  l   │                                    │
│  y   │                                    │
│  s   │                                    │
│  i   │                                    │
│  s   │                                    │
│      │                                    │
│  H   │                                    │
│  i   │                                    │
│  s   │                                    │
│  t   │                                    │
│  o   │                                    │
│  r   │                                    │
│  y   │                                    │
│      │                                    │
│  ⚙   │                                    │
└──────┴────────────────────────────────────┘
```

**Sidebar:** 240px expanded, 64px collapsed (icon-only). Collapse toggle at bottom-left. Smooth width transition via CSS `transition: width 250ms ease`.

---

### 5.5 Resume Analysis Dashboard (core page)

```
┌───────────────────────────────────────────────────┐
│  UPLOAD ZONE (top, full width)                    │
│  Dashed border, drag-active glow animation        │
│  [cloud icon]  "Drop your PDF resume here"        │
│  Upload progress: animated gradient progress bar  │
├───────────────────────────────────────────────────┤
│  ANALYSIS TIMELINE (horizontal steps)             │
│  ○ Upload → ○ Parse → ○ AI Analysis → ● Done     │
│  Animated step connectors                         │
├──────────────┬────────────────────────────────────┤
│ ATS SCORE    │  RESUME STRENGTHS                  │
│              │                                    │
│   [87]       │  ✓ Strong action verbs             │
│  Circular    │  ✓ Quantified achievements         │
│  progress    │  ✓ ATS-friendly formatting         │
│  ring        │                                    │
│  JetBrains   │  WEAKNESSES                        │
│  Mono font   │  ✗ Missing keywords for role       │
│              │  ✗ Generic objective statement     │
├──────────────┴────────────────────────────────────┤
│  SKILL GAP ANALYSIS                               │
│  Role match: [████████░░] 78%                    │
│  Matched: React, Node.js, MongoDB                 │
│  Missing:  TypeScript, Docker, AWS                │
├───────────────────────────────────────────────────┤
│  AI IMPROVEMENT SUGGESTIONS (accordion list)      │
│  Each item expandable for detailed explanation    │
├───────────────────────────────────────────────────┤
│  KEYWORD OPTIMIZATION                             │
│  Tag cloud: matched keywords in indigo,           │
│             missing keywords in red-dim           │
├───────────────────────────────────────────────────┤
│  INTERVIEW QUESTIONS & MODEL ANSWERS              │
│  Expandable Q&A cards based on your resume        │
└───────────────────────────────────────────────────┘
```

---

## 6. Component Hierarchy

```
App
├── Router
│   ├── PublicLayout
│   │   ├── Navbar
│   │   ├── Outlet
│   │   │   ├── Landing
│   │   │   │   ├── Hero
│   │   │   │   │   ├── AnimatedText
│   │   │   │   │   ├── OrbGlow
│   │   │   │   │   ├── DashboardMockup
│   │   │   │   │   └── CTAButton
│   │   │   │   ├── TrustedBy (marquee)
│   │   │   │   ├── Features
│   │   │   │   │   └── FeatureCard × 6
│   │   │   │   ├── HowItWorks
│   │   │   │   │   └── StepCard × 3
│   │   │   │   ├── AIShowcase (pinned scroll)
│   │   │   │   ├── Testimonials
│   │   │   │   │   └── TestimonialCard × n
│   │   │   │   ├── FAQ
│   │   │   │   │   └── AccordionItem × n
│   │   │   │   └── CTASection
│   │   │   ├── Login
│   │   │   │   ├── GlassCard
│   │   │   │   ├── Input × 2
│   │   │   │   └── Button (primary)
│   │   │   └── Signup
│   │   │       ├── GlassCard
│   │   │       ├── Input × 4
│   │   │       ├── PasswordStrengthBar
│   │   │       └── Button (primary)
│   │   └── Footer
│   │
│   └── DashboardLayout
│       ├── Sidebar
│       │   └── NavItem × 5
│       ├── Topbar
│       └── Outlet
│           ├── Dashboard (overview)
│           ├── ResumeAnalysis
│           │   ├── UploadZone
│           │   ├── AnalysisTimeline
│           │   ├── ATSScoreCard
│           │   │   └── CircularProgress
│           │   ├── StrengthsPanel
│           │   ├── WeaknessesPanel
│           │   ├── SkillGapChart
│           │   ├── SuggestionsAccordion
│           │   ├── KeywordCloud
│           │   └── InterviewQA
│           ├── AnalysisHistory
│           │   ├── SearchInput
│           │   ├── FilterBar
│           │   └── HistoryCard × n
│           ├── Profile
│           └── Settings
```

---

## 7. Animation Plan

### 7.1 GSAP Animations (src/animations/scrollAnimations.js)

```js
// Register plugins once in main.jsx
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Presets:
export const fadeUpOnScroll = (selector, stagger = 0.1) => {
  gsap.from(selector, {
    scrollTrigger: { trigger: selector, start: 'top 85%' },
    y: 40, opacity: 0, duration: 0.7,
    ease: 'power3.out', stagger,
  });
};

export const heroTimeline = () => {
  const tl = gsap.timeline();
  tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.5 })
    .from('.hero-headline', { y: 30, opacity: 0, duration: 0.7 }, '-=0.3')
    .from('.hero-sub',      { y: 20, opacity: 0, duration: 0.5 }, '-=0.4')
    .from('.hero-cta',      { y: 15, opacity: 0, duration: 0.4, stagger: 0.1 }, '-=0.3')
    .from('.hero-mockup',   { y: 40, opacity: 0, duration: 0.9, ease: 'power2.out' }, '-=0.6');
  return tl;
};

export const pinnedShowcase = () => {
  ScrollTrigger.create({
    trigger: '.showcase-section',
    start: 'top top',
    end: '+=200%',
    pin: true,
    onUpdate: (self) => {
      // Drive content swap by self.progress (0 → 1)
    },
  });
};

export const orbParallax = () => {
  gsap.to('.orb-glow', {
    scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 },
    y: -150,
  });
};
```

### 7.2 Framer Motion Variants (src/animations/framerVariants.js)

```js
export const pageTransition = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

export const cardHover = {
  rest:  { scale: 1, boxShadow: '0 0 0px rgba(99,102,241,0)' },
  hover: { scale: 1.02, boxShadow: '0 0 32px rgba(99,102,241,0.25)',
           transition: { duration: 0.25 } },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export const staggerItem = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export const modalVariants = {
  hidden:  { opacity: 0, scale: 0.95, y: 10 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } },
  exit:    { opacity: 0, scale: 0.97, y: 5,  transition: { duration: 0.2 } },
};

export const sidebarVariants = {
  expanded:  { width: 240 },
  collapsed: { width: 64  },
};

// Upload zone states
export const uploadZoneVariants = {
  idle:    { borderColor: 'rgba(99,102,241,0.2)' },
  hover:   { borderColor: 'rgba(99,102,241,0.6)', backgroundColor: 'rgba(99,102,241,0.05)' },
  active:  { borderColor: '#6366F1', scale: 1.01 },
};
```

### 7.3 CSS Keyframes (src/styles/animations.css)

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.2); }
  50%       { box-shadow: 0 0 40px rgba(99,102,241,0.4); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes shimmer {
  from { background-position: -200% center; }
  to   { background-position:  200% center; }
}

/* ATS score counter animation */
@keyframes count-up {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Services Layer

```js
// src/services/api.js — Axios instance
import axios from 'axios';
import { store } from '../redux/store';
import { logoutUser } from '../redux/slices/authSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
});

// Request interceptor — attach token
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — handle 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) store.dispatch(logoutUser());
    return Promise.reject(err);
  }
);

export default api;
```

```js
// src/services/resumeService.js
import api from './api';

export const analyzeResume = (file) => {
  const form = new FormData();
  form.append('resume', file);
  return api.post('/resume/analyze', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      const pct = Math.round((e.loaded * 100) / e.total);
      // Dispatch upload progress to Redux
    },
  });
};

export const getHistory  = ()   => api.get('/resume/history');
export const deleteEntry = (id) => api.delete(`/resume/${id}`);
```

---

## 9. Responsive Design Strategy

| Breakpoint | Width    | Layout changes |
|------------|----------|----------------|
| `sm`       | 640px+   | Single column → 2-col cards |
| `md`       | 768px+   | Sidebar appears (icon mode default) |
| `lg`       | 1024px+  | Sidebar expanded, 3-col feature grid |
| `xl`       | 1280px+  | Hero split layout, full dashboard |

**Mobile-first approach:**
- Landing: stack all sections vertically, hero is full-width headline with CTA below
- Dashboard: sidebar becomes bottom tab bar on mobile
- Analysis results: single column, cards full width
- Upload zone: tap-to-upload on mobile (no drag-and-drop assumption)

```css
/* Tailwind config additions */
// tailwind.config.js
theme: {
  extend: {
    screens: {
      xs: '375px',
    },
    fontFamily: {
      display: ['Syne', 'sans-serif'],
      body:    ['Inter', 'sans-serif'],
      mono:    ['JetBrains Mono', 'monospace'],
    },
    colors: {
      // Map CSS vars into Tailwind
      primary: { 400: '#818CF8', 500: '#6366F1', 600: '#4F46E5' },
      secondary:{ 500: '#7C3AED' },
      accent:   { 500: '#06B6D4' },
      surface:  { DEFAULT: '#0F172A' },
      elevated: { DEFAULT: '#111827' },
    },
    backdropBlur: { glass: '16px' },
    animation: {
      'marquee':    'marquee 30s linear infinite',
      'float':      'float 4s ease-in-out infinite',
      'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
    },
  },
}
```

---

## 10. Reusable Component Specifications

### GlassCard
```jsx
// Usage: <GlassCard hover glow className="...">...</GlassCard>
// Styles: backdrop-blur-[16px] bg-[--glass-bg] border border-[--glass-border]
//         rounded-[--radius-lg] shadow-[--glass-shadow]
// hover prop: adds Framer Motion cardHover variant
// glow prop:  adds pulse-glow animation
```

### CircularProgress (ATS Score)
```jsx
// SVG-based circular ring
// Props: score (0-100), size, strokeWidth, color
// Animates from 0 → score on mount using GSAP
// Center: score number in JetBrains Mono, large
// Below:  label "ATS Score"
```

### UploadZone
```jsx
// Props: onFile(file), accept=".pdf", maxSize=5MB
// States: idle | hover | dragging | uploading | error | success
// Each state has distinct visual: border color, bg tint, icon
// Framer Motion: uploadZoneVariants
// File validation: type check + size check before dispatch
```

### Button
```jsx
// Variants: primary | secondary | ghost | danger
// Sizes: sm | md | lg
// States: default | loading (spinner) | disabled
// primary: bg-primary-500 hover:bg-primary-600, glow shadow on hover
// ghost: transparent, border, hover bg-surface
```

### AnimatedText
```jsx
// Wraps text, reveals word-by-word or char-by-char on mount
// Uses GSAP or Framer Motion based on `engine` prop
// Props: text, engine, delay, stagger
```

### OrbGlow
```jsx
// Absolutely positioned radial gradient div
// Props: color (#6366F1 default), size, opacity, top, left
// Parallax motion via GSAP on scroll
// Pointer-events: none always
// aria-hidden: true always
```

---

## 11. Performance Requirements Implementation

```jsx
// Route-level code splitting (already in routes/index.jsx above)
const Landing = lazy(() => import('../pages/Landing/Landing'));

// Component-level lazy loading for heavy dashboard sections
const AnalysisResults = lazy(() =>
  import('../pages/Dashboard/sections/AnalysisResults')
);

// Image optimization
// Use WebP with fallback, explicit width/height to prevent CLS
<img src="hero.webp" width={600} height={400} loading="lazy" alt="..." />

// GSAP: only import what's used
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// NOT: import gsap from 'gsap/all'

// Framer Motion: use LazyMotion for reduced bundle
import { LazyMotion, domAnimation, m } from 'framer-motion';
// Wrap app: <LazyMotion features={domAnimation}>

// Virtualize long history list
import { useVirtualizer } from '@tanstack/react-virtual';
```

---

## 12. Key Implementation Notes

### Auth Flow
1. On login success: store JWT in Redux + localStorage
2. On app init: `fetchCurrentUser()` thunk validates token → if invalid, clear + redirect to login
3. `ProtectedRoutes.jsx`: reads `isAuthenticated` from Redux, redirects to `/login` if false
4. After login/signup: `navigate('/dashboard')` directly

### File Upload Flow
1. User drops/selects PDF → validate client-side (type + size)
2. Dispatch `uploadAndAnalyze(file)` thunk
3. Track `onUploadProgress` → update `uploadProgress` in Redux
4. Show `AnalysisTimeline` progressing through steps
5. On success: update `analysisResult` in Redux → show all analysis cards with entrance animations
6. Each card animates in with stagger delay (Framer Motion `staggerContainer`)

### Backend API Assumptions (no changes needed)
- `POST /api/auth/login` → `{ token, user }`
- `POST /api/auth/register` → `{ token, user }`
- `POST /api/resume/analyze` → `{ atsScore, strengths, weaknesses, suggestions, skillGap, keywords, jobReadinessScore, interviewQuestions }`
- `GET /api/resume/history` → `[{ id, createdAt, atsScore, fileName }]`
- `DELETE /api/resume/:id` → `{ success: true }`

---

## 13. Environment Setup

```
# .env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=ResumeAI
VITE_APP_VERSION=1.0.0
```

```json
// package.json dependencies
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.x",
    "@reduxjs/toolkit": "^2.x",
    "react-redux": "^9.x",
    "framer-motion": "^11.x",
    "gsap": "^3.x",
    "axios": "^1.x",
    "clsx": "^2.x",
    "react-hot-toast": "^2.x",
    "react-dropzone": "^14.x"
  },
  "devDependencies": {
    "vite": "^5.x",
    "@vitejs/plugin-react": "^4.x",
    "tailwindcss": "^3.x",
    "daisyui": "^4.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x"
  }
}
```

---

*Architecture version 1.0 — Ready for implementation. Start with: Design tokens → Component library → Auth pages → Landing → Dashboard.*
