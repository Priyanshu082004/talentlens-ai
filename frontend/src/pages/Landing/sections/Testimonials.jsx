import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import GlassCard from '@components/ui/GlassCard/GlassCard.jsx';

const TESTIMONIALS = [
  { name: 'Arjun Mehta', role: 'SDE-2 @ Amazon', avatar: 'AM', color: '#6366F1', text: 'Got my ATS score from 54 to 89 in one iteration. The keyword suggestions were spot-on for the JD. Landed my Amazon offer 3 weeks later.', stars: 5 },
  { name: 'Priya Sharma', role: 'Frontend Engineer @ Flipkart', avatar: 'PS', color: '#7C3AED', text: 'The skill gap feature showed me I was missing Docker and system design terms. Added them, rewrote two bullets. Got 4x more callbacks.', stars: 5 },
  { name: 'Rahul Gupta', role: 'Backend Dev @ Razorpay', avatar: 'RG', color: '#06B6D4', text: 'Best tool for freshers. It told me exactly what recruiters look for and why my resume was getting filtered. The rewrite suggestions are gold.', stars: 5 },
  { name: 'Sneha Patel', role: 'Data Engineer @ Zomato', avatar: 'SP', color: '#10B981', text: 'Used this before every application. The AI catches things you would never notice — formatting issues, weak verbs, missing context.', stars: 5 },
  { name: 'Vikram Singh', role: 'Full Stack @ Swiggy', avatar: 'VS', color: '#F59E0B', text: 'The interview questions section is underrated. It generated role-specific questions from my resume — prepped me perfectly for my final round.', stars: 5 },
];

function TestimonialCard({ t }) {
  return (
    <GlassCard hover className="w-80 shrink-0 snap-start">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.stars }).map((_, i) => <Star key={i} size={13} className="text-amber-400 fill-amber-400" />)}
      </div>
      <p className="text-sm text-gray-300 leading-relaxed mb-5">"{t.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: `${t.color}30`, border: `1px solid ${t.color}40`, color: t.color }}>
          {t.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{t.name}</p>
          <p className="text-xs text-gray-500">{t.role}</p>
        </div>
      </div>
    </GlassCard>
  );
}

export default function Testimonials() {
  return (
    <section className="section-py overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
          <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-4 block">Social proof</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">Developers who got hired</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">From first job to FAANG offers — real results from real candidates.</p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #050816, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #050816, transparent)' }} />

        <div className="flex gap-5 overflow-x-auto no-scrollbar snap-x px-8 pb-4">
          {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </div>
    </section>
  );
}
