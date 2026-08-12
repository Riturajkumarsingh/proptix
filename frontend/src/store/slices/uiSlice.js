import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen:       true,
    sidebarCollapsed:  false,
    theme:             'light',
    globalLoading:     false,
    breadcrumbs:       [],
    pageTitle:         'Dashboard',
    searchQuery:       '',
    activeModal:       null,
    modalsData:        {},
  },
  reducers: {
    toggleSidebar:      (state)            => { state.sidebarOpen     = !state.sidebarOpen; },
    setSidebarOpen:     (state, action)    => { state.sidebarOpen     = action.payload; },
    toggleSidebarCollapsed: (state)        => { state.sidebarCollapsed = !state.sidebarCollapsed; },
    setGlobalLoading:   (state, action)    => { state.globalLoading   = action.payload; },
    setBreadcrumbs:     (state, action)    => { state.breadcrumbs     = action.payload; },
    setPageTitle:       (state, action)    => { state.pageTitle       = action.payload; },
    setSearchQuery:     (state, action)    => { state.searchQuery     = action.payload; },
    openModal: (state, action) => {
      const { modal, data } = action.payload;
      state.activeModal        = modal;
      state.modalsData[modal]  = data || {};
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleSidebarCollapsed,
  setGlobalLoading,
  setBreadcrumbs,
  setPageTitle,
  setSearchQuery,
  openModal,
  closeModal,
} = uiSlice.actions;

export const selectSidebarOpen      = (state) => state.ui.sidebarOpen;
export const selectSidebarCollapsed = (state) => state.ui.sidebarCollapsed;
export const selectGlobalLoading    = (state) => state.ui.globalLoading;
export const selectBreadcrumbs      = (state) => state.ui.breadcrumbs;
export const selectPageTitle        = (state) => state.ui.pageTitle;
export const selectActiveModal      = (state) => state.ui.activeModal;
export const selectModalData        = (modal) => (state) => state.ui.modalsData[modal];

export default uiSlice.reducer;
