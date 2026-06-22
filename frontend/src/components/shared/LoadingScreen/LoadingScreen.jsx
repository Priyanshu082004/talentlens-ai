import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-bg-base flex flex-col items-center justify-center gap-4 z-50"
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-primary-500/20 animate-spin border-t-primary-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
        </div>
      </div>
      <p className="text-sm text-gray-500 font-mono">Loading…</p>
    </motion.div>
  );
}
