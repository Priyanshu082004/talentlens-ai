import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import resumeService from '@services/resumeService';

export const uploadAndAnalyze = createAsyncThunk(
  'resume/analyze',
  async (file, { dispatch, rejectWithValue }) => {
    try {
      return await resumeService.analyzeResume(file, (pct) => {
        dispatch(setUploadProgress(pct));
      });
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

export const deleteAnalysis = createAsyncThunk(
  'resume/delete',
  async (id, { rejectWithValue }) => {
    try { await resumeService.deleteEntry(id); return id; }
    catch (err) { return rejectWithValue(err.response?.data?.message); }
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    // uploadedFile:     null,  // This is not needed as we are not storing the file in the state   
    uploadProgress:   0,
    isAnalyzing:      false,
    analysisResult:   null,
    history:          [],
    isLoadingHistory: false,
    error:            null,
    currentStep:      0, // 0=idle 1=uploading 2=parsing 3=analyzing 4=done
  },
  reducers: {
    setUploadProgress: (state, { payload }) => {
      state.uploadProgress = payload;
      state.currentStep    = payload < 100 ? 1 : 2;
    },
    setCurrentStep:    (state, { payload }) => { state.currentStep = payload; },
    clearAnalysis:     (state) => {
      state.analysisResult = null;
      state.uploadProgress = 0;
      state.currentStep    = 0;
      state.error          = null;
    },
    clearError:        (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadAndAnalyze.pending,   (state) => {
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
        state.analysisResult = payload;
      })
      .addCase(uploadAndAnalyze.rejected,  (state, { payload }) => {
        state.isAnalyzing    = false;
        state.currentStep    = 0;
        state.error          = payload;
      })
      .addCase(fetchHistory.pending,   (state) => { state.isLoadingHistory = true; })
      .addCase(fetchHistory.fulfilled, (state, { payload }) => {
        state.isLoadingHistory = false;
        state.history          = payload;
      })
      .addCase(fetchHistory.rejected,  (state) => { state.isLoadingHistory = false; })
      .addCase(deleteAnalysis.fulfilled, (state, { payload: id }) => {
        state.history = state.history.filter((h) => h._id !== id && h.id !== id);
      });
  },
});

export const { setUploadProgress, setCurrentStep, clearAnalysis, clearError } = resumeSlice.actions;
export default resumeSlice.reducer;






// this slice does the following work

// {
//   uploadedFile,
//   uploadProgress,
//   isAnalyzing,
//   analysisResult,
//   history,
//   isLoadingHistory,
//   error,
//   currentStep
// }