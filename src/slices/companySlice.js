import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companies: [],
  currentCompany: null,
  loading: false,
  error: null,
  stats: {
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    newApplications: 0
  }
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setCurrentCompany: (state, action) => {
      state.currentCompany = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    addCompany: (state, action) => {
      state.companies.push(action.payload);
    },
    updateCompany: (state, action) => {
      const index = state.companies.findIndex(company => company.id === action.payload.id);
      if (index !== -1) {
        state.companies[index] = action.payload;
      }
    },
    deleteCompany: (state, action) => {
      state.companies = state.companies.filter(company => company.id !== action.payload);
    }
  }
});

export const {
  setCompanies,
  setCurrentCompany,
  setLoading,
  setError,
  setStats,
  addCompany,
  updateCompany,
  deleteCompany
} = companySlice.actions;

// Selectors
export const selectCompanies = (state) => state.company.companies;
export const selectCurrentCompany = (state) => state.company.currentCompany;
export const selectCompanyLoading = (state) => state.company.loading;
export const selectCompanyError = (state) => state.company.error;
export const selectCompanyStats = (state) => state.company.stats;

export default companySlice.reducer; 