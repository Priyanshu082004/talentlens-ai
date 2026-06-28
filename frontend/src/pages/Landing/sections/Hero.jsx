import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useGSAP } from '@hooks/useGSAP.js';
import { heroTimeline } from '@animations/gsap.config.js';
import OrbGlow from '@components/shared/OrbGlow/OrbGlow.jsx';
import Button from '@components/ui/Button/Button.jsx';
import { ROUTES } from '@constants/routes.js';
import { COPY } from '@constants/copy.js';




function MockCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="hero-mockup relative"
    >
      <div className="glass rounded-2xl p-6 w-full max-w-sm mx-auto animate-float">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs text-gray-500 mb-1">ATS Score</p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-4xl font-bold font-mono text-emerald-400">
              87
            </motion.p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Sparkles size={16} className="text-emerald-400" />
            </div>
          </div>
        </div>

        {[
          { label: 'Keyword Match', value: 92, color: 'bg-primary-500' },
          { label: 'Skills Match',  value: 78, color: 'bg-secondary-500' },
          { label: 'Formatting',    value: 95, color: 'bg-accent-500' },
        ].map(({ label, value, color }, i) => (
          <div key={label} className="mb-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{label}</span>
              <span className="font-mono">{value}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${color}`}
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, delay: 1.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ))}

        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-xs text-gray-500 mb-2">Top suggestions</p>
          {['Add TypeScript to skills', 'Quantify impact metrics', 'Include GitHub link'].map((s) => (
            <div key={s} className="flex items-center gap-2 text-xs text-gray-300 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
              {s}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const ref = useGSAP((container) => { heroTimeline(container); });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <OrbGlow color="#6366F1" size={800} opacity={0.14} top="20%" left="30%" />
      <OrbGlow color="#7C3AED" size={500} opacity={0.10} top="70%" left="70%" />
      <OrbGlow color="#06B6D4" size={400} opacity={0.07} top="10%" left="80%" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="hero-eyebrow inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
              <Sparkles size={12} className="text-primary-400" />
              <span className="text-xs font-medium text-primary-400">{COPY.HERO.EYEBROW}</span>
            </div>

            <h1 className="hero-headline font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {COPY.HERO.HEADLINE_1}{' '}
              <span className="text-gradient">{COPY.HERO.HEADLINE_GRAD}</span>
              <br />
              {COPY.HERO.HEADLINE_2}
            </h1>

            <p className="hero-sub text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">
              {COPY.HERO.SUB}
            </p>

            <div className="hero-cta flex flex-wrap gap-4">
              <Button size="lg" onClick={() => navigate(ROUTES.SIGNUP)}>
                {COPY.HERO.CTA_PRIMARY} <ArrowRight size={16} />
              </Button>
              <Button variant="ghost" size="lg" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                {COPY.HERO.CTA_SECONDARY}
              </Button>
            </div>

            <p className="hero-cta mt-5 text-xs text-gray-600">{COPY.HERO.TRUST_NOTE}</p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <MockCard />
          </div>
        </div>
      </div>
    </section>
  );
}
