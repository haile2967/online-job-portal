import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import AdminDashboard from "./pages/AdminDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ManageJobs from './components/company/ManageJobs';
import PostJob from './components/company/PostJob';
import JobApplications from './components/company/JobApplications';
import JobList from './pages/JobList';
import JobDetails from './pages/JobDetails';
import JobApply from './pages/JobApply';

import "./App.css"; // Import any styles

const App = () => {
  return (
    <Provider store={store}>
    <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1 pt-16">
      <Routes>
        <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/company/*" element={<CompanyDashboard />} />
              <Route path="/jobseeker/*" element={<JobSeekerDashboard />} />
              <Route path="/jobs" element={<JobList />} />
              <Route path="/jobs/:jobId" element={<JobDetails />} />
              <Route path="/jobs/:jobId/apply" element={<JobApply />} />
              <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
          </main>
        </div>
    </Router>
    </Provider>
  );
};

export default App;
