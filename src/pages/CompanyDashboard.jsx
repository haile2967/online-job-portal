import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { FaBriefcase, FaClipboardList, FaUserTie, FaBuilding, FaCog, FaBars, FaHome, FaEnvelope, FaTimes, FaEye } from "react-icons/fa";
import NotificationSidebar from "../components/common/NotificationSidebar";
import ManageJobs from "../components/company/ManageJobs";
import PostJob from "../components/company/PostJob";
import MessagesSidebar from "../components/common/MessagesSidebar";
import api from '../api/axios';

import AllApplications from '../components/company/AllApplications';
import CompanyProfile from '../components/company/CompanyProfile';
import CompanySettings from '../components/company/CompanySettings';
import JobDetails from './JobDetails';
import EditJob from '../components/company/EditJob';

const DashboardView = () => {
  const [metrics, setMetrics] = useState({
    activeJobs: 0,
    totalApplications: 0,
    profileViews: 124 // Mocked for now
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          api.get('/jobs/company/me'),
          api.get('/applications/company/me')
        ]);
        
        setMetrics(prev => ({
          ...prev,
          activeJobs: jobsRes.data.length,
          totalApplications: appsRes.data.length
        }));
      } catch (err) {
        console.error('Failed to load metrics:', err);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="p-6 md:p-8 animate-fade-in-up">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">Overview</h2>
          <p className="text-gray-500 mt-2 text-lg">Welcome back! Here's what's happening with your job postings.</p>
        </div>
        <Link 
          to="/company/post-job" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300"
        >
          <FaBriefcase /> Post New Job
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Active Jobs Card */}
        <div className="relative overflow-hidden bg-white rounded-3xl p-8 shadow-sm border border-gray-100 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-out"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 group-hover:text-blue-600 transition-colors">Active Jobs</p>
              <h3 className="text-5xl font-black text-gray-900 tracking-tight">{metrics.activeJobs}</h3>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform duration-300">
              <FaBriefcase />
            </div>
          </div>
        </div>
        
        {/* Applications Card */}
        <div className="relative overflow-hidden bg-white rounded-3xl p-8 shadow-sm border border-gray-100 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-out"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 group-hover:text-emerald-600 transition-colors">Total Applicants</p>
              <h3 className="text-5xl font-black text-gray-900 tracking-tight">{metrics.totalApplications}</h3>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30 group-hover:rotate-12 transition-transform duration-300">
              <FaClipboardList />
            </div>
          </div>
        </div>
        
        {/* Profile Views Card */}
        <div className="relative overflow-hidden bg-white rounded-3xl p-8 shadow-sm border border-gray-100 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-out"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 group-hover:text-purple-600 transition-colors">Profile Views</p>
              <h3 className="text-5xl font-black text-gray-900 tracking-tight">{metrics.profileViews}</h3>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30 group-hover:rotate-12 transition-transform duration-300">
              <FaEye />
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions / Getting Started */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent"></div>
        <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Hire the perfect candidate</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-2xl">
              Post detailed job descriptions, manage candidates through your pipeline, and make offers quickly using our streamlined dashboard.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/company/manage-jobs" className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-colors shadow-sm">
                Manage Existing Jobs
              </Link>
              <Link to="/company/applications" className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-emerald-300 hover:text-emerald-600 transition-colors shadow-sm">
                Review Applicants
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex w-48 h-48 bg-blue-100 rounded-full items-center justify-center relative">
            <div className="absolute inset-2 bg-blue-50 rounded-full animate-pulse"></div>
            <FaUserTie className="text-7xl text-blue-500 relative z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CompanyDashboard = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const isActive = (path) => location.pathname.includes(path);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const NavLink = ({ to, icon, label }) => (
    <Link 
      to={to} 
      onClick={closeMenu}
      title={isSidebarCollapsed ? label : ""}
      className={`flex items-center gap-4 py-3.5 rounded-2xl transition-all duration-300 font-medium ${isSidebarCollapsed ? 'justify-center px-0' : 'px-5'} ${
        isActive(to) 
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30" 
          : "text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
      }`}
    >
      <span className={`text-xl transition-transform duration-300 ${isActive(to) ? 'scale-110' : ''}`}>{icon}</span>
      {!isSidebarCollapsed && <span className="whitespace-nowrap">{label}</span>}
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">Company<span className="text-gray-800">Panel</span></h2>
        <button onClick={toggleMenu} className="text-gray-600 focus:outline-none p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      {/* Sidebar Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity" onClick={closeMenu}></div>
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 bg-white border-r border-gray-100 shadow-sm flex flex-col transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isSidebarCollapsed ? 'w-[88px]' : 'w-72'}
      `}>
        <div className={`h-20 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between px-4'} border-b border-gray-100`}>
          <div className="flex items-center gap-3">
            {/* Desktop Toggle */}
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden md:flex text-gray-500 hover:text-blue-600 hover:bg-blue-50 w-10 h-10 rounded-xl items-center justify-center transition-colors"
            >
              <FaBars className="text-xl" />
            </button>
            {!isSidebarCollapsed && (
              <h1 className="text-2xl font-black tracking-tight whitespace-nowrap">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Company</span><span className="text-gray-800">Panel</span>
              </h1>
            )}
          </div>
          
          <button 
            className="md:hidden text-gray-400 hover:text-gray-600 p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 scrollbar-hide">
          <div className="space-y-2.5">
            <NavLink to="/company/dashboard" icon={<FaHome />} label="Dashboard" />
            <NavLink to="/company/post-job" icon={<FaBriefcase />} label="Post a Job" />
            <NavLink to="/company/manage-jobs" icon={<FaClipboardList />} label="Manage Jobs" />
            <NavLink to="/company/applications" icon={<FaUserTie />} label="View Applications" />
          </div>
          
          {!isSidebarCollapsed ? (
            <div className="mt-10 mb-2 px-4 whitespace-nowrap">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company & Settings</h4>
            </div>
          ) : (
            <div className="mt-10 mb-2 w-full h-px bg-gray-200"></div>
          )}
          
          <div className="space-y-2.5">
            <NavLink to="/company/profile" icon={<FaBuilding />} label="Company Profile" />
            <NavLink to="/company/messages" icon={<FaEnvelope />} label="Messages" />
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-100/50 bg-gray-50/30 flex justify-center">
          <NavLink to="/company/settings" icon={<FaCog />} label="Settings" />
        </div>
      </div>

      <NotificationSidebar isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 w-full md:w-auto h-[calc(100vh-60px)] md:h-screen overflow-y-auto relative">
        {/* Mobile menu toggle */}
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center sticky top-0 z-30">
          <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-600 focus:outline-none p-2 bg-gray-100 rounded-lg">
            <FaBars />
          </button>
        </div>
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/edit-job/:jobId" element={<EditJob />} />
          <Route path="/manage-jobs" element={<ManageJobs />} />
          <Route path="/applications" element={<AllApplications />} />
          <Route path="/profile" element={<CompanyProfile />} />
          <Route path="/messages" element={<MessagesSidebar/>} />
          <Route path="/settings" element={<CompanySettings />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default CompanyDashboard;
