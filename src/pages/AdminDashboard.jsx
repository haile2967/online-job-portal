import React, { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { FaBars, FaHome, FaUserCog, FaBriefcase, FaClipboardList, FaCog, FaEnvelope, FaBell, FaTimes, FaUsers } from "react-icons/fa";
import NotificationSidebar from "../components/common/NotificationSidebar";
import AccountManagement from "../components/admin/AccountManagement";
import ManageJobs from "../components/admin/ManageJobs";

const DashboardView = () => {
  return (
    <div className="p-6 md:p-8 animate-fade-in-up">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <FaUsers />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-blue-600 transition-colors">Total Users</p>
            <h3 className="text-3xl font-bold text-gray-900">0</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
          <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
            <FaBriefcase />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-green-600 transition-colors">Active Jobs</p>
            <h3 className="text-3xl font-bold text-gray-900">0</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
          <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
            <FaClipboardList />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-purple-600 transition-colors">Total Applications</p>
            <h3 className="text-3xl font-bold text-gray-900">0</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const isActive = (path) => location.pathname.includes(path);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const NavLink = ({ to, icon, label }) => (
    <Link 
      to={to} 
      onClick={closeMenu}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive(to) 
          ? "bg-blue-600 text-white shadow-md" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center sticky top-0 z-30">
        <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
        <button onClick={toggleMenu} className="text-gray-600 focus:outline-none p-2 bg-gray-100 rounded-lg">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      {/* Sidebar Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900/50 z-40 md:hidden" onClick={closeMenu}></div>
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-50 w-72 bg-white border-r border-gray-200 flex flex-col`}>
        <div className="hidden md:flex items-center justify-center h-20 border-b border-gray-100">
          <h2 className="text-2xl font-black text-blue-600 tracking-tight">Admin<span className="text-gray-800">Panel</span></h2>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <NavLink to="/admin/dashboard" icon={<FaHome />} label="Dashboard" />
          <NavLink to="/admin/account-management" icon={<FaUserCog />} label="Account Management" />
          <NavLink to="/admin/jobs" icon={<FaBriefcase />} label="Manage Jobs" />
          <NavLink to="/admin/applications" icon={<FaClipboardList />} label="Applications" />
          <NavLink to="/admin/messages" icon={<FaEnvelope />} label="Messages" />
        </nav>
        
        <div className="p-4 border-t border-gray-100">
          <NavLink to="/admin/settings" icon={<FaCog />} label="Settings" />
        </div>
      </div>

      <NotificationSidebar isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 w-full md:w-auto h-[calc(100vh-60px)] md:h-screen overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/account-management/*" element={<AccountManagement />} />
          <Route path="/jobs/*" element={<ManageJobs />} />
          <Route path="/applications" element={<div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">View Applications</h2>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"><p className="text-gray-500">Applications module coming soon...</p></div>
          </div>} />
          <Route path="/messages" element={<div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"><p className="text-gray-500">Messages module coming soon...</p></div>
          </div>} />
          <Route path="/settings" element={<div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"><p className="text-gray-500">Settings module coming soon...</p></div>
          </div>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
