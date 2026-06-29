import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { fetchHistory, fetchReportById, clearAnalysis } from '@redux/slices/resumeSlice.js';


export const useAnalysis = ({ autoFetchHistory = false } = {}) => {
  const dispatch = useDispatch();
  const resume = useSelector((s) => s.resume);

  useEffect(() => {
    if (autoFetchHistory) dispatch(fetchHistory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetchHistory]);

  const refreshHistory  = useCallback(() => dispatch(fetchHistory()), [dispatch]);
  const loadReport      = useCallback((id) => dispatch(fetchReportById(id)), [dispatch]);
  const resetAnalysis   = useCallback(() => dispatch(clearAnalysis()), [dispatch]);

  return { ...resume, refreshHistory, loadReport, resetAnalysis };
};
