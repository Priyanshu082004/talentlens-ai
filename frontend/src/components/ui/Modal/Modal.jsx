import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { modalBackdrop, modalPanel } from '@animations/framerVariants.js';
import { useEffect } from 'react';



export default function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' };

  


    useEffect(() => {
        
                if (open) {
    document.body.style.overflow = 'hidden';
                   } else {
    document.body.style.overflow = '';
     }

    return () => {
    document.body.style.overflow = '';
     };
    }, [open]);

    

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-slate-900/10 backdrop-blur-sm"
        >
          <motion.div
            variants={modalPanel}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className={`glass rounded-2xl w-full ${sizes[size]} max-h-[85vh] overflow-y-auto`}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <h3 className="font-display font-semibold text-slate-900 text-lg">{title}</h3>
                <button
                  onClick={onClose}
                  className="text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Body */}
            <div className="p-6">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
