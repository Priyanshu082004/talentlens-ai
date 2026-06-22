import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { uploadAndAnalyze } from '@redux/slices/resumeSlice';
import { validateResumeFile } from '@utils/fileValidation';

export const useFileUpload = () => {
  const dispatch = useDispatch();
  const [dragActive, setDragActive] = useState(false);
  const [fileError,  setFileError]  = useState(null);
  const [fileName,   setFileName]   = useState(null);

  const handleFile = useCallback((file) => {
    const { valid, error } = validateResumeFile(file);
    if (!valid) { setFileError(error); setFileName(null); return; }
    setFileError(null);
    setFileName(file.name);
    dispatch(uploadAndAnalyze(file));
  }, [dispatch]);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onDragOver  = (e) => { e.preventDefault(); setDragActive(true); };
  const onDragLeave = ()  => setDragActive(false);
  const onInputChange = (e) => { const f = e.target.files?.[0]; if (f) handleFile(f); };

  return { dragActive, fileError, fileName, onDrop, onDragOver, onDragLeave, onInputChange };
};
