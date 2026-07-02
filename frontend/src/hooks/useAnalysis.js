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
// This code defines a custom React hook called `useAnalysis` that interacts with a Redux store to manage the state related to resume analysis.
//  It provides functionality to fetch history, load specific reports by ID, and clear analysis data. The hook uses `useEffect` to
//  optionally fetch history when the component mounts, and `useCallback` to memoize the dispatch functions for performance optimization. 
// The returned object includes the current state of the resume analysis along with the functions to refresh history, load reports, and 
// reset analysis.