import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaBriefcase, FaMapMarkerAlt, FaUsers, FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import api from '../../api/axios';

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/jobs/company/me');
      // Adding mock applications/views count for MVP display if not present
      const formattedJobs = data.map(job => ({
        ...job,
        applications: Math.floor(Math.random() * 20), // Mock data for now until we link apps
        views: Math.floor(Math.random() * 100)
      }));
      setJobs(formattedJobs);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleEdit = (jobId) => {
    navigate(`/company/edit-job/${jobId}`);
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await api.delete(`/jobs/${jobId}`);
        setJobs(jobs.filter(job => job._id !== jobId));
      } catch (err) {
        console.error(err);
        alert('Failed to delete job.');
      }
    }
  };

  const handleViewApplications = (jobId) => {
    navigate(`/company/job-applications/${jobId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Manage Jobs</h2>
          <p className="text-gray-500 mt-1">View, edit, or remove your company's active job postings.</p>
        </div>
        <button 
          onClick={() => navigate('/company/post-job')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <FaPlus /> Post New Job
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {jobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            <FaBriefcase />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs posted yet</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first job listing.</p>
          <button 
            onClick={() => navigate('/company/post-job')}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Post a Job
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md mb-2">Active</span>
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{job.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-50 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{job.applications}</p>
                  <p className="text-xs text-gray-500 uppercase font-medium">Applications</p>
                </div>
                <div className="text-center border-l border-gray-50">
                  <p className="text-2xl font-bold text-gray-900">{job.views}</p>
                  <p className="text-xs text-gray-500 uppercase font-medium">Views</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigate(`/company/job/${job._id}`)}
                  className="flex-1 flex justify-center items-center gap-2 py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors font-medium text-sm rounded-lg"
                  title="View Details"
                >
                  <FaEye /> View
                </button>
                <button 
                  onClick={() => handleViewApplications(job._id)}
                  className="flex-1 flex justify-center items-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
                >
                  <FaUsers /> Applicants
                </button>
                <button 
                  onClick={() => handleEdit(job._id)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Job"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => handleDelete(job._id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Job"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageJobs; 
