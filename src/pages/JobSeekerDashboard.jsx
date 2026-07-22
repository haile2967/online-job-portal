import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { FaHome, FaSearch, FaClipboardList, FaUser, FaEnvelope, FaCog, FaBars, FaBookmark, FaTimes, FaEye } from "react-icons/fa";
import NotificationSidebar from "../components/common/NotificationSidebar";
import MyApplications from "../components/jobseeker/MyApplications";
import MessagesSidebar from "../components/common/MessagesSidebar";
import api from '../api/axios';

const DashboardView = () => {
  const [metrics, setMetrics] = useState({
    appliedJobs: 0,
    savedJobs: 3, // Mocked for now
    profileViews: 42 // Mocked for now
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data } = await api.get('/applications/me');
        setMetrics(prev => ({
          ...prev,
          appliedJobs: data.length
        }));
      } catch (err) {
        console.error('Failed to load metrics:', err);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Job Seeker Overview</h2>
          <p className="text-gray-500 mt-1 text-sm font-medium">Here's your job search progress so far.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/jobs" className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/20 transition-all flex items-center gap-2">
            <FaSearch /> Browse Jobs
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden cursor-pointer">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <FaClipboardList className="text-xl" />
              </div>
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm mb-1 group-hover:text-blue-600 transition-colors">Applied Jobs</p>
              <h3 className="text-4xl font-black text-gray-900">{metrics.appliedJobs}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden cursor-pointer">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                <FaBookmark className="text-xl" />
              </div>
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm mb-1 group-hover:text-orange-600 transition-colors">Saved Jobs</p>
              <h3 className="text-4xl font-black text-gray-900">{metrics.savedJobs}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden cursor-pointer">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <FaEye className="text-xl" />
              </div>
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm mb-1 group-hover:text-purple-600 transition-colors">Profile Views</p>
              <h3 className="text-4xl font-black text-gray-900">{metrics.profileViews}</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 overflow-hidden relative">
         <div className="flex justify-between items-center mb-6">
           <h3 className="text-lg font-bold text-gray-900">Recent Applications</h3>
           <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">View All</button>
         </div>
         <div className="space-y-4">
            <p className="text-gray-500 py-8 text-center bg-gray-50/50 rounded-2xl font-medium border border-gray-100 border-dashed">No recent activity to display.</p>
         </div>
      </div>
    </div>
  );
};

const JobSeekerDashboard = () => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const NavLink = ({ to, icon, label }) => {
    // If it's the external "/jobs" link, use a standard <a> tag or Link without active state matching internal routes
    if (to === "/jobs") {
       return (
        <Link
          to={to}
          title={isSidebarCollapsed ? label : ""}
          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium hover:translate-x-1`}
        >
          <div className="text-xl flex-shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors">
            {icon}
          </div>
          {!isSidebarCollapsed && <span className="truncate">{label}</span>}
          {isSidebarCollapsed && (
            <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
              {label}
            </div>
          )}
        </Link>
       );
    }

    const isActive = location.pathname.includes(to);
    
    return (
      <Link
        to={to}
        title={isSidebarCollapsed ? label : ""}
        className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative
          ${isActive 
            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold translate-x-1" 
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium hover:translate-x-1"
          }`}
      >
        <div className={`text-xl flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-500 transition-colors'}`}>
          {icon}
        </div>
        
        {!isSidebarCollapsed && (
          <span className="truncate">{label}</span>
        )}

        {isSidebarCollapsed && (
          <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
            {label}
          </div>
        )}
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 bg-white border-r border-gray-100 shadow-sm flex flex-col transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
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
              <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
                MyPortal
              </h1>
            )}
          </div>
          
          <button 
            className="md:hidden text-gray-400 hover:text-gray-600 p-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 scrollbar-hide">
          <div className="space-y-2.5">
            <NavLink to="/jobseeker/dashboard" icon={<FaHome />} label="Dashboard" />
            <NavLink to="/jobs" icon={<FaSearch />} label="Find Jobs" />
            <NavLink to="/jobseeker/applications" icon={<FaClipboardList />} label="My Applications" />
            <NavLink to="/jobseeker/saved-jobs" icon={<FaBookmark />} label="Saved Jobs" />
          </div>
          
          {!isSidebarCollapsed ? (
            <div className="mt-10 mb-2 px-4 whitespace-nowrap">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account</h4>
            </div>
          ) : (
            <div className="mt-10 mb-2 w-full h-px bg-gray-200"></div>
          )}
          
          <div className="space-y-2.5">
            <NavLink to="/jobseeker/profile" icon={<FaUser />} label="My Profile" />
            <NavLink to="/jobseeker/messages" icon={<FaEnvelope />} label="Messages" />
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-100/50 bg-gray-50/30 flex justify-center">
          <NavLink to="/jobseeker/settings" icon={<FaCog />} label="Settings" />
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
          <Route path="/applications" element={<MyApplications />} />
          <Route path="/messages" element={<MessagesSidebar />} />
          <Route path="/saved-jobs" element={<Placeholder title="Saved Jobs" icon={<FaBookmark />} />} />
          <Route path="/profile" element={<Placeholder title="My Profile" icon={<FaUser />} />} />
          <Route path="/settings" element={<Placeholder title="Settings" icon={<FaCog />} />} />
        </Routes>
      </div>
    </div>
  );
};

// Reusable Placeholder for unbuilt modules
const Placeholder = ({ title, icon }) => (
  <div className="p-8 max-w-5xl mx-auto h-full flex flex-col items-center justify-center animate-fade-in-up">
    <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center max-w-md w-full">
      <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500">This module is currently under development. Check back soon for updates!</p>
    </div>
  </div>
);

export default JobSeekerDashboard; 