import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, AlertCircle, CheckCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useFileUpload } from '@hooks/useFileUpload.js';
import { setSelfDescription, setJobDescription } from '@redux/slices/resumeSlice.js';
import { uploadZoneVariants } from '@animations/framerVariants.js';
import { COPY } from '@constants/copy.js';
import Button from '@components/ui/Button/Button.jsx';

/**
 * ResumeUpload
 *
 * Renders:
 *  1. Self-description textarea  (required by backend)
 *  2. Job description textarea   (required by backend)
 *  3. PDF drag-and-drop upload zone
 *
 * All three values are sent together on POST /api/interview (multipart).
 */
export default function ResumeUpload() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { dragActive, fileError, fileName, onDrop, onDragOver, onDragLeave, onInputChange } = useFileUpload();
  const { isAnalyzing, uploadProgress, selfDescription, jobDescription } = useSelector((s) => s.resume);

  const zoneState = fileError ? 'error' : fileName ? 'success' : dragActive ? 'dragging' : 'idle';

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Self description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          About yourself <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={3}
          placeholder="Briefly describe yourself — your experience level, key skills, and what role you're targeting..."
          value={selfDescription}
          onChange={(e) => dispatch(setSelfDescription(e.target.value))}
         className="w-full bg-white rounded-xl px-4 py-3 text-sm text-slate-900 border
          border-slate-200 hover:border-slate-300 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 
          outline-none transition-all duration-200 placeholder:text-slate-400 resize-none"
        />
      </div>

      {/* Job description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          Job description <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="Paste the job description for the role you're applying to — the AI will tailor the analysis and interview questions to this role..."
          value={jobDescription}
          onChange={(e) => dispatch(setJobDescription(e.target.value))}
           className="w-full bg-white rounded-xl px-4 py-3 text-sm text-slate-900 border
            border-slate-200 hover:border-slate-300 focus:border-primary-400 focus:ring-2 
            focus:ring-primary-100 outline-none transition-all duration-200 placeholder:text-slate-400 resize-none"
        />
      </div>

      {/* PDF upload zone */}
      <motion.div
        variants={uploadZoneVariants}
        animate={zoneState}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => !isAnalyzing && inputRef.current?.click()}
        className="relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center 
        justify-center text-center cursor-pointer transition-all min-h-[180px]"

      >
        <AnimatePresence>
          {dragActive && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-2xl bg-indigo-50 pointer-events-none" />
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
            <p className="text-sm font-medium text-slate-700 mb-3">{COPY.UPLOAD.ANALYZING}</p>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                animate={{ width: `${uploadProgress}%` }} transition={{ duration: 0.3 }} />
            </div>
            <p className="text-xs text-slate-400 mt-2 font-mono">{uploadProgress}%</p>
          </div>
        ) : fileName ? (
          <>
             <p className="text-sm font-semibold text-emerald-600 mb-1">{fileName}</p>
            <p className="text-xs text-slate-400 mb-4">Ready · Click to replace</p>
          </>
        ) : (
         <>
            <p className="text-sm font-medium text-slate-700 mb-1">{dragActive ? COPY.UPLOAD.DRAGGING : COPY.UPLOAD.IDLE}</p>
            <p className="text-xs text-slate-400 mb-4">{COPY.UPLOAD.IDLE_SUB}</p>
            <Button variant="secondary" size="sm" type="button"
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>
              Browse files
            </Button>
          </>
        )}

        {fileError && (
          <p className="mt-3 text-xs text-red-500 flex items-center gap-1.5">
            <AlertCircle size={12} /> {fileError}
          </p>
        )}
      </motion.div>

      <input ref={inputRef} type="file" accept="application/pdf" onChange={onInputChange} className="hidden" />
    </div>
  );
}
