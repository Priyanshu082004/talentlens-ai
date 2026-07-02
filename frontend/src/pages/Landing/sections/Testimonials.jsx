import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  { name: 'Arjun Mehta',  role: 'SDE-2 @ Amazon',              avatar: 'AM', color: '#6366F1', bg: '#EEF2FF', text: 'Got my ATS score from 54 to 89 in one iteration. The keyword suggestions were spot-on. Landed my Amazon offer 3 weeks later.', stars: 5 },
  { name: 'Priya Sharma', role: 'Frontend Engineer @ Flipkart', avatar: 'PS', color: '#7C3AED', bg: '#F5F3FF', text: 'The skill gap feature showed me I was missing Docker and system design terms. Added them, rewrote two bullets. Got 4x more callbacks.', stars: 5 },
  { name: 'Rahul Gupta',  role: 'Backend Dev @ Razorpay',       avatar: 'RG', color: '#0891B2', bg: '#ECFEFF', text: 'Best tool for freshers. It told me exactly what recruiters look for and why my resume was getting filtered. The rewrite suggestions are gold.', stars: 5 },
  { name: 'Sneha Patel',  role: 'Data Engineer @ Zomato',       avatar: 'SP', color: '#059669', bg: '#ECFDF5', text: 'Used this before every application. The AI catches things you would never notice — formatting issues, weak verbs, missing context.', stars: 5 },
  { name: 'Vikram Singh', role: 'Full Stack @ Swiggy',          avatar: 'VS', color: '#D97706', bg: '#FFFBEB', text: 'The interview questions section is underrated. It generated role-specific questions from my resume — prepped me perfectly for my final round.', stars: 5 },
];

function TestimonialCard({ t }) {
  return (
    <div className="w-80 shrink-0 snap-start bg-white rounded-2xl p-6 border border-slate-200 shadow-card hover:shadow-card-md transition-all duration-200">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-sm text-slate-600 leading-relaxed mb-5">"{t.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: t.bg, color: t.color, border: `1.5px solid ${t.color}30` }}>
          {t.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">{t.name}</p>
          <p className="text-xs text-slate-400">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section-py overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center">
          <span className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-3 block">Social proof</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Developers who got hired</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">From first job to FAANG — real results from real candidates.</p>
        </motion.div>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #F8F9FB, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #F8F9FB, transparent)' }} />
        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x px-8 pb-4">
          {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </div>
    </section>
  );
}