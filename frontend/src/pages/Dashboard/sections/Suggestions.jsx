import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import GlassCard from '@components/ui/GlassCard/GlassCard';
import { accordionContent } from '@animations/framerVariants';

export default function Suggestions({ suggestions = [] }) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <GlassCard>
      <h3 className="font-display font-semibold text-white text-sm mb-4">AI Improvement Suggestions</h3>
      <div className="space-y-2">
        {suggestions.map((s, i) => {
          const isObj = typeof s === 'object' && s !== null;
          return (
            <div key={i} className="border border-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/3 transition-colors"
              >
                <span className="text-sm text-gray-300 pr-4 leading-snug">{isObj ? s.title : s}</span>
                <motion.div animate={{ rotate: openIdx === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
                  <ChevronDown size={15} className="text-gray-600" />
                </motion.div>
              </button>
              {openIdx === i && isObj && s.detail && (
                <motion.div variants={accordionContent} initial="hidden" animate="visible" exit="exit" className="overflow-hidden">
                  <p className="px-4 pb-3 text-xs text-gray-400 leading-relaxed border-t border-white/5 pt-3">{s.detail}</p>
                </motion.div>
              )}
            </div>
          );
        })}
        {!suggestions.length && <p className="text-xs text-gray-600">No suggestions — your resume looks great!</p>}
      </div>
    </GlassCard>
  );
}
