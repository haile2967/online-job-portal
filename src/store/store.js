import { configureStore } from '@reduxjs/toolkit';
import jobReducer from '../slices/jobSlice';
import authReducer from '../slices/authSlice';
import companyReducer from '../slices/companySlice';
import applicationReducer from '../slices/applicationSlice';
import notificationReducer from '../slices/notificationSlice';

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    auth: authReducer,
    company: companyReducer,
    applications: applicationReducer,
    notifications: notificationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 