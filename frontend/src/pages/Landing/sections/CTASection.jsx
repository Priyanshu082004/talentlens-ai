import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import Button from '@components/ui/Button/Button.jsx';
import { ROUTES } from '@constants/routes.js';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="section-py px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl"
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(124,58,237,0.2) 50%, rgba(6,182,212,0.1) 100%)' }} />
        <div className="absolute inset-0 backdrop-blur-sm border border-white/10 rounded-3xl" />

        <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.3), transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.25), transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative z-10 text-center py-20 px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <Zap size={12} className="text-primary-400" />
            <span className="text-xs font-medium text-gray-300">Free to start · No credit card</span>
          </div>

          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            Your next job starts with<br />
            <span className="text-gradient">a better resume.</span>
          </h2>

          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Upload your resume and get a full AI analysis in 30 seconds. ATS score, skill gap, keywords, suggestions — everything.
          </p>

          <Button size="lg" onClick={() => navigate(ROUTES.SIGNUP)} className="mx-auto">
            Analyze my resume free <ArrowRight size={16} />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
