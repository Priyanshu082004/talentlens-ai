import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CalendarDays, CheckSquare } from 'lucide-react';
import GlassCard from '@components/ui/GlassCard/GlassCard.jsx';
import { accordionContent } from '@animations/framerVariants.js';

/**
 * Suggestions (Preparation Plan)
 *
 * Backend field: preparationPlan: [{ day: number, focus: string, tasks: string[] }]
 *
 * Renders each day as an expandable accordion item showing the focus area
 * and the list of tasks for that day.
 */
export default function Suggestions({ preparationPlan = [] }) {
  const [openIdx, setOpenIdx] = useState(0); // first day open by default

  return (
    <GlassCard>
      <h3 className="font-display font-semibold text-white text-sm mb-1 flex items-center gap-2">
        <CalendarDays size={14} className="text-primary-400" /> Preparation Plan
      </h3>
      <p className="text-xs text-gray-500 mb-4">
        AI-generated day-by-day study plan based on your skill gaps and target role.
      </p>

      {!preparationPlan.length ? (
        <p className="text-xs text-gray-600">No preparation plan generated.</p>
      ) : (
        <div className="space-y-2">
          {preparationPlan.map((entry, i) => (
            <div key={entry.day ?? i} className="border border-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* Day badge */}
                  <span className="w-8 h-8 rounded-lg bg-primary-500/15 border border-primary-500/25 flex items-center justify-center text-xs font-bold font-mono text-primary-400 shrink-0">
                    {entry.day}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white leading-snug">{entry.focus}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{entry.tasks?.length ?? 0} tasks</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: openIdx === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown size={15} className="text-gray-600" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIdx === i && (
                  <motion.div
                    variants={accordionContent}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="overflow-hidden"
                  >
                    <ul className="px-4 pb-4 pt-2 border-t border-white/5 space-y-2">
                      {(entry.tasks || []).map((task, ti) => (
                        <li key={ti} className="flex items-start gap-2.5 text-sm text-gray-300">
                          <CheckSquare size={13} className="text-primary-400 shrink-0 mt-0.5" />
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
