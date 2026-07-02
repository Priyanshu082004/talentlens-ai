import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '@components/ui/Button/Button.jsx';
import { ROUTES } from '@constants/routes.js';

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="section-py px-6">
      <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl"
        style={{ background: 'linear-gradient(135deg, #6366F1 0%, #7C3AED 60%, #06B6D4 100%)' }}>
        <div className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.4) 0%, transparent 70%)' }} />
        <div className="relative z-10 text-center py-20 px-8">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            Your next job starts with<br />a better resume.
          </h2>
          <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto">
            Upload your resume and get a full AI analysis in 30 seconds. Match score, skill gaps, keywords, prep plan — everything.
          </p>
          <Button
            onClick={() => navigate(ROUTES.SIGNUP)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            Analyze my resume free <ArrowRight size={16} />
          </Button>
          <p className="text-indigo-200 text-xs mt-5">No credit card · PDF upload · Results in 30s</p>
        </div>
      </motion.div>
    </section>
  );
}