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

// This code sets up a Redux store for a React application using Redux Toolkit.
//  It imports three reducers: `authReducer`, `resumeReducer`, and `uiReducer`, which manage the state for authentication, resume analysis, and
//  user interface respectively. The store is configured with these reducers and includes middleware that ignores serializable checka
//   for the 'resume/analyze/pending' action, allowing for non-serializable data to be handled in that specific case.