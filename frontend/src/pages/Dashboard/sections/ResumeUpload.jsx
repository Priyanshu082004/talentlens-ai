import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, AlertCircle, CheckCircle } from 'lucide-react';
import { useFileUpload } from '@hooks/useFileUpload';
import { useSelector } from 'react-redux';
import { uploadZoneVariants } from '@animations/framerVariants';
import { COPY } from '@constants/copy';
import Button from '@components/ui/Button/Button';

export default function ResumeUpload() {
  const inputRef = useRef(null);
  const { dragActive, fileError, fileName, onDrop, onDragOver, onDragLeave, onInputChange } = useFileUpload();
  const { isAnalyzing, uploadProgress } = useSelector((s) => s.resume);

  const zoneState = fileError ? 'error' : fileName ? 'success' : dragActive ? 'dragging' : 'idle';

  return (
    <div className="w-full">
      <motion.div
        variants={uploadZoneVariants}
        animate={zoneState}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => !isAnalyzing && inputRef.current?.click()}
        className="relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[200px]"
      >
        <AnimatePresence>
          {dragActive && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 rounded-2xl bg-primary-500/5 pointer-events-none" />
          )}
        </AnimatePresence>

        <motion.div animate={{ scale: dragActive ? 1.1 : 1 }} transition={{ type: 'spring', stiffness: 300 }} className="w-14 h-14 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-4">
          {fileError   ? <AlertCircle size={24} className="text-red-400" /> :
           fileName    ? <CheckCircle size={24} className="text-emerald-400" /> :
           isAnalyzing ? <File size={24} className="text-primary-400" /> :
                         <Upload size={24} className="text-primary-400" />}
        </motion.div>

        {isAnalyzing ? (
          <div className="w-full max-w-xs">
            <p className="text-sm font-medium text-white mb-3">{COPY.UPLOAD.ANALYZING}</p>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" animate={{ width: `${uploadProgress}%` }} transition={{ duration: 0.3 }} />
            </div>
            <p className="text-xs text-gray-500 mt-2 font-mono">{uploadProgress}%</p>
          </div>
        ) : fileName ? (
          <>
            <p className="text-sm font-medium text-emerald-400 mb-1">{fileName}</p>
            <p className="text-xs text-gray-500 mb-4">Ready · Click to replace</p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-white mb-1">{dragActive ? COPY.UPLOAD.DRAGGING : COPY.UPLOAD.IDLE}</p>
            <p className="text-xs text-gray-500 mb-4">{COPY.UPLOAD.IDLE_SUB}</p>
            <Button variant="secondary" size="sm" type="button" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>
              Browse files
            </Button>
          </>
        )}

        {fileError && (
          <p className="mt-3 text-xs text-red-400 flex items-center gap-1.5">
            <AlertCircle size={12} /> {fileError}
          </p>
        )}
      </motion.div>

      <input ref={inputRef} type="file" accept="application/pdf" onChange={onInputChange} className="hidden" />
    </div>
  );
}
