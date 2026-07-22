import { createSlice, createSelector } from '@reduxjs/toolkit';
import { mockJobs, mockJobCategories, mockJobTypes, mockLocations } from '../mock/jobData';

const initialState = {
  jobs: mockJobs,
  categories: mockJobCategories,
  jobTypes: mockJobTypes,
  locations: mockLocations,
  loading: false,
  error: null,
  filters: {
    searchTerm: '',
    category: 'all',
    jobType: 'all',
    location: 'all',
    sortBy: 'newest'
  }
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
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
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    updateJob: (state, action) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
    }
  }
});

// Selectors
export const selectAllJobs = (state) => state.jobs.jobs;
export const selectJobCategories = (state) => state.jobs.categories;
export const selectJobTypes = (state) => state.jobs.jobTypes;
export const selectLocations = (state) => state.jobs.locations;
export const selectFilters = (state) => state.jobs.filters;
export const selectLoading = (state) => state.jobs.loading;
export const selectError = (state) => state.jobs.error;

// Memoized filtered jobs selector
export const selectFilteredJobs = createSelector(
  [selectAllJobs, selectFilters],
  (jobs, filters) => {
    return jobs
      .filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                            job.location.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                            job.company.toLowerCase().includes(filters.searchTerm.toLowerCase());
        const matchesCategory = filters.category === 'all' || job.category === filters.category;
        const matchesJobType = filters.jobType === 'all' || job.type === filters.jobType;
        const matchesLocation = filters.location === 'all' || job.location === filters.location;
        return matchesSearch && matchesCategory && matchesJobType && matchesLocation;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'newest':
            return new Date(b.postedDate) - new Date(a.postedDate);
          case 'oldest':
            return new Date(a.postedDate) - new Date(b.postedDate);
          case 'applications':
            return b.applications - a.applications;
          default:
            return 0;
        }
      });
  }
);

export const { 
  setJobs, 
  setLoading, 
  setError, 
  setFilters, 
  resetFilters,
  addJob,
  updateJob,
  deleteJob
} = jobSlice.actions;

export default jobSlice.reducer; 