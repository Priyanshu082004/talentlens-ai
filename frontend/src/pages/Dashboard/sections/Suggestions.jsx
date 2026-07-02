
/**
 * Suggestions (Preparation Plan)
 *
 * Backend field: preparationPlan: [{ day: number, focus: string, tasks: string[] }]
 *
  * Renders each day as an expandable accordion item showing the focus area
 * and the list of tasks for that day.
*/

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CalendarDays, CheckSquare } from 'lucide-react';
import GlassCard from '@components/ui/GlassCard/GlassCard.jsx';
import { accordionContent } from '@animations/framerVariants.js';

export default function Suggestions({ preparationPlan = [] }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <GlassCard>
      <h3 className="font-display font-semibold text-slate-900 text-sm mb-1 flex items-center gap-2">
        <CalendarDays size={14} className="text-primary-500" /> Preparation Plan
      </h3>
      <p className="text-xs text-slate-400 mb-4">AI-generated day-by-day study plan based on your skill gaps.</p>

      {!preparationPlan.length ? (
        <p className="text-xs text-slate-400">No preparation plan generated.</p>
      ) : (
        <div className="space-y-2">
          {preparationPlan.map((entry, i) => (
            <div key={entry.day ?? i} className="border border-slate-200 rounded-xl overflow-hidden">
              <button onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-bold font-mono text-primary-600 shrink-0">
                    {entry.day}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 leading-snug">{entry.focus}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{entry.tasks?.length ?? 0} tasks</p>
                  </div>
                </div>
                <motion.div animate={{ rotate: openIdx === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
                  <ChevronDown size={15} className="text-slate-400" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIdx === i && (
                  <motion.div variants={accordionContent} initial="hidden" animate="visible" exit="exit" className="overflow-hidden">
                    <ul className="px-4 pb-4 pt-2 border-t border-slate-100 space-y-2">
                      {(entry.tasks || []).map((task, ti) => (
                        <li key={ti} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <CheckSquare size={13} className="text-primary-500 shrink-0 mt-0.5" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}