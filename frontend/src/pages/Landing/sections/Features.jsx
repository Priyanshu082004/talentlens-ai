import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileSearch, BarChart3, Layers, Lightbulb, Target, Bot } from 'lucide-react';
import GlassCard from '@components/ui/GlassCard/GlassCard.jsx';
import { staggerContainer, staggerItem } from '@animations/framerVariants.js';

const FEATURES = [
  { icon: BarChart3, title: 'ATS Score Generation', desc: 'Get a precise ATS compatibility score. Know exactly how automated filters see your resume before a human ever does.', color: '#6366F1', badge: 'Core' },
  { icon: FileSearch, title: 'Resume Analysis', desc: 'Deep structural analysis of your resume. Gemini reads it the way a senior recruiter would — section by section.', color: '#7C3AED', badge: 'AI' },
  { icon: Layers, title: 'Skill Gap Detection', desc: 'Compare your current skills against the role requirements. See exactly what is missing and what to add.', color: '#06B6D4', badge: 'Smart' },
  { icon: Lightbulb, title: 'Improvement Suggestions', desc: 'Actionable, specific suggestions — not generic tips. Gemini rewrites weak bullet points with real examples.', color: '#8B5CF6', badge: 'AI' },
  { icon: Target, title: 'Keyword Optimization', desc: 'Find the exact keywords ATS systems are scanning for. See matched and missing terms highlighted clearly.', color: '#10B981', badge: 'ATS' },
  { icon: Bot, title: 'AI Career Recommendations', desc: 'Personalized next steps based on your profile — roles to target, skills to build, courses to take.', color: '#F59E0B', badge: 'Gemini' },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = feature.icon;

  return (
    <motion.div ref={ref} variants={staggerItem} initial="hidden" animate={inView ? 'visible' : 'hidden'} transition={{ delay: index * 0.07 }}>
      <GlassCard hover className="h-full group">
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top left, ${feature.color}15, transparent 60%)` }} />

        <div className="relative z-10">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
            style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}30` }}>
            <Icon size={20} style={{ color: feature.color }} />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-display font-semibold text-white text-base">{feature.title}</h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: `${feature.color}15`, color: feature.color, border: `1px solid ${feature.color}25` }}>
              {feature.badge}
            </span>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="section-py max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-4 block">Everything you need</span>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">AI that actually reads your resume</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Not a keyword counter. A full intelligence layer — the same analysis a top recruiter would do, available in seconds.
        </p>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
      </motion.div>
    </section>
  );
}
