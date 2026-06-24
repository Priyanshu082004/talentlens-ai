import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Upload, Cpu, TrendingUp } from 'lucide-react';

const STEPS = [
  { step: '01', icon: Upload, title: 'Upload your resume', desc: 'Drop your PDF resume. Our parser extracts every section — skills, experience, education — with full structure intact.', color: '#6366F1' },
  { step: '02', icon: Cpu, title: 'Gemini analyzes it', desc: 'Google Gemini Flash 2.5 reads your resume in context — scoring ATS compatibility, detecting gaps, and forming recommendations.', color: '#7C3AED' },
  { step: '03', icon: TrendingUp, title: 'Get actionable insights', desc: 'Receive a full breakdown: ATS score, skill gap analysis, keyword optimization, and specific rewrites. Ready to apply.', color: '#06B6D4' },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" className="section-py relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-20">
          <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-4 block">How it works</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">From upload to insights in 30 seconds</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Three steps. No setup. No signup friction. Just answers.</p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px"
            style={{ background: 'linear-gradient(to right, #6366F1, #7C3AED, #06B6D4)' }}>
            <motion.div className="h-full origin-left" initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ background: 'inherit' }} />
          </div>

          {STEPS.map(({ step, icon: Icon, title, desc, color }, i) => (
            <motion.div key={step} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-0 relative z-10" style={{ background: `${color}15`, border: `1px solid ${color}30`, boxShadow: `0 0 30px ${color}20` }}>
                  <Icon size={28} style={{ color }} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono" style={{ background: color, color: '#fff' }}>
                  {i + 1}
                </div>
              </div>

              <h3 className="font-display font-bold text-white text-lg mb-3">{title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
