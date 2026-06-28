import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { fetchHistory, deleteAnalysis, clearAnalysis } from '@redux/slices/resumeSlice.js';

/**
 * Central hook for reading/managing resume analysis state.
 * Wraps the resume slice so pages don't need to import
 * thunks/selectors directly.
 */
export const useAnalysis = ({ autoFetchHistory = false } = {}) => {
  const dispatch = useDispatch();
  const resume = useSelector((s) => s.resume);

  useEffect(() => {
    if (autoFetchHistory) dispatch(fetchHistory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetchHistory]);

  const refreshHistory = useCallback(() => dispatch(fetchHistory()), [dispatch]);
  const removeEntry     = useCallback((id) => dispatch(deleteAnalysis(id)), [dispatch]);
  const resetAnalysis   = useCallback(() => dispatch(clearAnalysis()), [dispatch]);

  return {
    ...resume,
    refreshHistory,
    removeEntry,
    resetAnalysis,
  };
};
