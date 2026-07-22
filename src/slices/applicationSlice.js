import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: [],
  currentApplication: null,
  loading: false,
  error: null,
  filters: {
    status: 'all',
    dateRange: 'all',
    searchTerm: ''
  }
};

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    setCurrentApplication: (state, action) => {
      state.currentApplication = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addApplication: (state, action) => {
      state.applications.push(action.payload);
    },
    updateApplication: (state, action) => {
      const index = state.applications.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state.applications[index] = action.payload;
      }
    },
    deleteApplication: (state, action) => {
      state.applications = state.applications.filter(app => app.id !== action.payload);
    }
  }
});

export const {
  setApplications,
  setCurrentApplication,
  setLoading,
  setError,
  setFilters,
  addApplication,
  updateApplication,
  deleteApplication
} = applicationSlice.actions;

// Selectors
export const selectApplications = (state) => state.applications.applications;
export const selectCurrentApplication = (state) => state.applications.currentApplication;
export const selectApplicationLoading = (state) => state.applications.loading;
export const selectApplicationError = (state) => state.applications.error;
export const selectApplicationFilters = (state) => state.applications.filters;

// Filtered applications selector
export const selectFilteredApplications = (state) => {
  const { applications, filters } = state.applications;
  return applications
    .filter(app => {
      const matchesStatus = filters.status === 'all' || app.status === filters.status;
      const matchesSearch = app.applicantName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                          app.jobTitle.toLowerCase().includes(filters.searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (filters.dateRange === 'newest') {
        return new Date(b.appliedDate) - new Date(a.appliedDate);
      }
      return new Date(a.appliedDate) - new Date(b.appliedDate);
    });
};

export default applicationSlice.reducer; 