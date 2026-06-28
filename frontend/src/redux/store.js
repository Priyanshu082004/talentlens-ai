import { configureStore } from '@reduxjs/toolkit';
import authReducer   from './slices/authSlice.js';
import resumeReducer from './slices/resumeSlice.js';
import uiReducer     from './slices/uiSlice.js';

export const store = configureStore({
  reducer: {
    auth:   authReducer,
    resume: resumeReducer,
    ui:     uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: { ignoredActions: ['resume/analyze/pending'] } }),
});