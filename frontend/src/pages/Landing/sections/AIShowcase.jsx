import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import CircularProgress from '@components/ui/CircularProgress/CircularProgress.jsx';
import ProgressBar from '@components/ui/ProgressBar/ProgressBar.jsx';
import GlassCard from '@components/ui/GlassCard/GlassCard.jsx';

const PANELS = [
  { id: 'ats', label: 'ATS Score', headline: 'Know your score before you apply', sub: 'Our AI scores your resume against the role\'s ATS criteria — giving you a number you can actually improve.' },
  { id: 'skills', label: 'Skill Gap', headline: 'See exactly what\'s missing', sub: 'Compare your skills to what the role requires. No guessing — matched and missing skills, side by side.' },
  { id: 'suggestions', label: 'AI Suggestions', headline: 'Specific fixes, not generic tips', sub: 'Gemini rewrites your weak bullet points and highlights exactly where to add impact.' },
];

function ATSPanel() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="flex flex-col items-center gap-6">
      <CircularProgress score={87} size={160} label="ATS Score" animate />
      <div className="w-full space-y-3">
        {[{ label: 'Keyword Density', value: 92 }, { label: 'Format Score', value: 95 }, { label: 'Role Relevance', value: 81 }].map((b) => (
          <ProgressBar key={b.label} label={b.label} value={b.value} color="primary" height={6} />
        ))}
      </div>
    </motion.div>
  );
}

function SkillPanel() {
  const matched = ['React', 'Node.js', 'MongoDB', 'REST APIs', 'Git'];
  const missing = ['TypeScript', 'Docker', 'AWS', 'GraphQL'];
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="space-y-4">
      <div>
        <p className="text-xs font-medium text-emerald-400 mb-2 flex items-center gap-1.5"><CheckCircle size={12} /> Matched skills</p>
        <div className="flex flex-wrap gap-2">
          {matched.map((s) => <span key={s} className="px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{s}</span>)}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-red-400 mb-2 flex items-center gap-1.5"><XCircle size={12} /> Missing skills</p>
        <div className="flex flex-wrap gap-2">
          {missing.map((s) => <span key={s} className="px-2.5 py-1 rounded-full text-xs bg-red-500/10 text-red-400 border border-red-500/20">{s}</span>)}
        </div>
      </div>
      <ProgressBar label="Overall Match" value={72} color="primary" />
    </motion.div>
  );
}

function SuggestionsPanel() {
  const suggestions = [
    { text: 'Change "Worked on React app" → "Built React SPA serving 10k+ MAU, reducing load time by 40%"' },
    { text: 'Add TypeScript to skills — required in 78% of matched job postings' },
    { text: 'Remove "References available upon request" — wastes space, implied' },
  ];
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="space-y-3">
      {suggestions.map((s, i) => (
        <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
          <Lightbulb size={14} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 leading-relaxed">{s.text}</p>
        </div>
      ))}
    </motion.div>
  );
}

export default function AIShowcase() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
  <section className="section-py relative overflow-hidden">
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)",
      }}
    />

    <div className="max-w-7xl mx-auto px-6 relative z-10">

      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-4 block">
          AI Insights
        </span>

        <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          What you get after analysis
        </h2>

        <p className="max-w-2xl mx-auto text-slate-600">
          Compare your resume against the job description and receive
          AI-powered insights to improve your interview chances.
        </p>
      </motion.div>

      {/* Content */}
      <div
        ref={ref}
        className="grid lg:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-3">
          {PANELS.map(({ id, label, headline, sub }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onClick={() => setActive(i)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                active === i
                  ? "bg-primary-500/10 border-primary-500/30"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    active === i
                      ? "bg-primary-500"
                      : "bg-slate-400"
                  }`}
                />

                <span className="text-xs font-semibold text-primary-400">
                  {label}
                </span>
              </div>

              <h3 className="font-display font-bold text-slate-900 text-lg mb-1">
                {headline}
              </h3>

              <p className="text-sm text-slate-600">
                {sub}
              </p>
            </motion.div>
          ))}
        </div>

        <GlassCard className="min-h-[280px]">
          <AnimatePresence mode="wait">
            {active === 0 && <ATSPanel key="ats" />}
            {active === 1 && <SkillPanel key="skill" />}
            {active === 2 && <SuggestionsPanel key="sug" />}
          </AnimatePresence>
        </GlassCard>
      </div>

    </div>
  </section>
);
}