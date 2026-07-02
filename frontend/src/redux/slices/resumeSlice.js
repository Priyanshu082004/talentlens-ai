import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import resumeService from '@services/resumeService.js';



export const uploadAndAnalyze = createAsyncThunk(
  'resume/analyze',
  async ({ file, selfDescription, jobDescription }, { dispatch, rejectWithValue }) => {
    try {
      return await resumeService.analyzeResume(
        file,
        selfDescription,
        jobDescription,
        (pct) => dispatch(setUploadProgress(pct))
      );
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Analysis failed. Please try again.');
    }
  }
);

export const fetchHistory = createAsyncThunk(
  'resume/history',
  async (_, { rejectWithValue }) => {
    try { return await resumeService.getHistory(); }
    catch (err) { return rejectWithValue(err.response?.data?.message); }
  }
);

export const fetchReportById = createAsyncThunk(
  'resume/fetchById',
  async (id, { rejectWithValue }) => {
    try { return await resumeService.getById(id); }
    catch (err) { return rejectWithValue(err.response?.data?.message); }
  }
);

const INITIAL_STATE = {
  uploadedFile:     null,
  uploadProgress:   0,
  isAnalyzing:      false,
  analysisResult:   null,
  history:          [],
  isLoadingHistory: false,
  error:            null,
  currentStep:      0,
  selfDescription:  '',
  jobDescription:   '',
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState: INITIAL_STATE,
  reducers: {
    setUploadProgress:   (state, { payload }) => {
      state.uploadProgress = payload;
      state.currentStep    = payload < 100 ? 1 : 2;
    },
    setCurrentStep:      (state, { payload }) => { state.currentStep = payload; },
    setSelfDescription:  (state, { payload }) => { state.selfDescription = payload; },
    setJobDescription:   (state, { payload }) => { state.jobDescription  = payload; },
    clearAnalysis:       (state) => {
      state.analysisResult   = null;
      state.uploadProgress   = 0;
      state.currentStep      = 0;
      state.error            = null;
      state.selfDescription  = '';
      state.jobDescription   = '';
    },
    clearError:          (state) => { state.error = null; },
    resetResume:        () => INITIAL_STATE,
  },
  extraReducers: (b) => {
    b
      // Upload & Analyze
      .addCase(uploadAndAnalyze.pending, (state) => {
        state.isAnalyzing    = true;
        state.error          = null;
        state.uploadProgress = 0;
        state.currentStep    = 1;
        state.analysisResult = null;
      })
      .addCase(uploadAndAnalyze.fulfilled, (state, { payload }) => {
        state.isAnalyzing    = false;
        state.uploadProgress = 100;
        state.currentStep    = 4;
        // payload = { message, interviewReport }
        state.analysisResult = payload.interviewReport;
        state.history = [payload.interviewReport, ...state.history.filter((item) => item?._id !== payload.interviewReport?._id)];
      })
      .addCase(uploadAndAnalyze.rejected, (state, { payload }) => {
        state.isAnalyzing = false;
        state.currentStep = 0;
        state.error       = payload;
      })

      // History
      .addCase(fetchHistory.pending,   (state) => { state.isLoadingHistory = true; })
      .addCase(fetchHistory.fulfilled, (state, { payload }) => {
        state.isLoadingHistory = false;
        // payload = { message, interviewReports }
        state.history = payload.interviewReports || [];
      })
      .addCase(fetchHistory.rejected,  (state) => { state.isLoadingHistory = false; })

      // Fetch by ID
      .addCase(fetchReportById.fulfilled, (state, { payload }) => {
        state.analysisResult = payload.interviewReport;
        state.currentStep    = 4;
      });
  },
});

export const {
  setUploadProgress,
  setCurrentStep,
  setSelfDescription,
  setJobDescription,
  clearAnalysis,
  clearError,
  resetResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;

// This code defines a Redux slice for managing the state related to resume analysis in a React application using Redux Toolkit.
//  It includes asynchronous actions for uploading and analyzing resumes, fetching history, and fetching specific reports by ID.
//  The slice maintains the state of the uploaded file, upload progress, analysis result, history, loading status, error messages,
//  current step in the analysis process, self-description, and job description. It also provides reducers to update the state based
//  on user actions and API responses.