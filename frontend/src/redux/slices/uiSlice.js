import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarCollapsed: false,
    activeSection:    'dashboard',
    scrollProgress:   0,
  },
  reducers: {
    toggleSidebar:     (state)           => { state.sidebarCollapsed = !state.sidebarCollapsed; },
    setSidebarCollapsed:(state, { payload }) => { state.sidebarCollapsed = payload; },
    setActiveSection:  (state, { payload }) => { state.activeSection = payload; },
    setScrollProgress: (state, { payload }) => { state.scrollProgress = payload; },
  },
});

export const { toggleSidebar, setSidebarCollapsed, setActiveSection, setScrollProgress } = uiSlice.actions;
export default uiSlice.reducer;





//  check for scroll progress once if it can be used somehwhere other than redux 
