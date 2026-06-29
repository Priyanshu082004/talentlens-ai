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

// No delete endpoint exists in the backend — noted in integration checklist.

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    uploadedFile:      null,
    uploadProgress:    0,
    isAnalyzing:       false,
    analysisResult:    null,  // full interviewReport object
    history:           [],    // trimmed interviewReport list
    isLoadingHistory:  false,
    error:             null,
    currentStep:       0,     // 0=idle 1=uploading 2=parsing 3=analyzing 4=done
    // Store the form values so UI components can read them
    selfDescription:   '',
    jobDescription:    '',
  },
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
} = resumeSlice.actions;

export default resumeSlice.reducer;
