import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaTimes, FaRegClock, FaEye } from 'react-icons/fa';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await api.get('/applications/me');
        setApplications(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch your applications.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusDisplay = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted': 
        return { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <FaCheck />, text: 'Accepted' };
      case 'rejected': 
        return { color: 'bg-red-50 text-red-700 border-red-200', icon: <FaTimes />, text: 'Rejected' };
      case 'reviewed': 
        return { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: <FaEye />, text: 'Reviewed' };
      default: 
        return { color: 'bg-orange-50 text-orange-700 border-orange-200', icon: <FaRegClock />, text: 'Pending' };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto animate-fade-in-up">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">My Applications</h2>
        <p className="text-gray-500 mt-1 font-medium">Track the status of the jobs you've applied for.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {applications.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm max-w-md mx-auto mt-12">
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner text-4xl">
            <FaBriefcase />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No applications yet</h3>
          <p className="text-gray-500 mb-8 font-medium">Start browsing jobs and submit your first application to jumpstart your career.</p>
          <button 
            onClick={() => navigate('/jobs')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
          >
            Browse Jobs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {applications.map((app) => {
            const statusInfo = getStatusDisplay(app.status || 'pending');
            
            return (
              <div key={app._id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 group">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl shrink-0 mt-1 shadow-inner border border-blue-100/50 group-hover:scale-105 transition-transform">
                    <FaBriefcase />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {app.job?.title || 'Job Unavailable'}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                      <span className="flex items-center gap-1.5"><FaBuilding className="text-gray-400" /> {app.job?.company || 'Unknown Company'}</span>
                      <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-gray-400" /> {app.job?.location || 'Unknown Location'}</span>
                      <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-gray-400" /> Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between lg:justify-end gap-4 border-t lg:border-t-0 border-gray-100 pt-4 lg:pt-0">
                  <span className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 border ${statusInfo.color}`}>
                    {statusInfo.icon} {statusInfo.text}
                  </span>
                  {app.job && (
                    <button 
                      onClick={() => navigate(`/jobs/${app.job._id}`)}
                      className="px-5 py-2 bg-gray-50 text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-white hover:border-blue-200 hover:text-blue-600 transition-all flex items-center gap-2 text-sm"
                    >
                      <FaEye /> View Job
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
