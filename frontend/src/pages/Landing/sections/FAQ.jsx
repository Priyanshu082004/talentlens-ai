import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  { q: 'What file formats do you support?', a: 'Currently PDF only. This ensures the AI gets clean, structured text without formatting loss. We recommend exporting your resume from Word or Notion as a PDF before uploading.' },
  { q: 'How does the ATS score work?', a: 'Our AI evaluates keyword density, formatting structure, section completeness, and role relevance — the same signals real ATS systems use. The score is a composite from 0–100, with 80+ considered ATS-friendly.' },
  { q: 'Is my resume data stored?', a: 'Your resume text is processed by Google Gemini for analysis. We store the analysis results in your history so you can compare across iterations. You can delete any analysis from your history at any time.' },
  { q: 'Which AI model powers the analysis?', a: 'Google Gemini Flash 2.5 — one of the fastest and most capable multimodal models available. It reads your entire resume in context, not just keywords, which is why the suggestions are specific rather than generic.' },
  { q: 'How long does an analysis take?', a: 'Typically 15–30 seconds from upload to full results. This includes PDF parsing, Gemini processing, and structuring the output into the dashboard sections.' },
  { q: 'Can I analyze the same resume multiple times?', a: 'Yes. In fact, that is how most people use it — upload, read suggestions, improve your resume, upload again, and watch the score increase. Your history section tracks all your previous analysis.' },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className={`text-sm font-medium transition-colors ${isOpen ? 'text-white' : 'text-gray-300'}`}>{item.q}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
          <ChevronDown size={16} className={isOpen ? 'text-primary-400' : 'text-gray-600'} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <p className="text-sm text-gray-400 leading-relaxed pb-5">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section-py">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest mb-4 block">FAQ</span>
          <h2 className="font-display text-4xl font-bold text-white mb-4">Questions, answered</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="glass rounded-2xl px-6">
          {FAQS.map((item, i) => <FAQItem key={i} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />)}
        </motion.div>
      </div>
    </section>
  );
}
