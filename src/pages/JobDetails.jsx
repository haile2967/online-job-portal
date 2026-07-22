import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaBriefcase, FaListUl, FaAlignLeft, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import api from '../api/axios';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/jobs/${jobId}`);
        setJob(data);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details. It may have been removed.');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-blue-600">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xl font-bold">Loading job details...</span>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100 text-center max-w-md w-full shadow-sm mb-6">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="font-bold text-lg">{error || 'Job not found'}</p>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  const isCompanyOwner = user?.role === 'company' && job.postedBy?._id === (user._id || user.id);
  const isCompany = user?.role === 'company';

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await api.delete(`/jobs/${job._id}`);
        navigate('/company/manage-jobs');
      } catch (err) {
        console.error(err);
        alert('Failed to delete job.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 px-4 py-2 text-gray-500 hover:text-blue-600 font-medium flex items-center gap-2 transition-colors"
        >
          <FaArrowLeft /> Back to Jobs
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl flex items-center justify-center text-blue-600 text-4xl shadow-inner border border-blue-100/50 flex-shrink-0">
              <FaBuilding />
            </div>

            <div className="flex-1 w-full">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{job.title}</h1>
                  <h2 className="text-xl text-gray-500 font-medium flex items-center gap-2">
                    {job.company}
                    <FaCheckCircle className="text-blue-500 text-sm" title="Verified Company" />
                  </h2>
                </div>
                
                <div className="flex gap-3 flex-wrap">
                  {isCompanyOwner ? (
                    <button 
                      onClick={() => navigate(`/company/edit-job/${job._id}`)}
                      className="px-6 py-3 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold rounded-xl transition-colors shadow-sm"
                    >
                      Edit Job
                    </button>
                  ) : !isCompany ? (
                    <button 
                      onClick={() => navigate(`/jobs/${job._id}/apply`)}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
                    >
                      Apply Now
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium">
                <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 flex items-center gap-2">
                  <FaBriefcase className="text-blue-500" /> {job.type || 'Full-time'}
                </span>
                <span className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400" /> {job.location}
                </span>
                {job.salary && (
                  <span className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-2">
                    <FaMoneyBillWave className="text-emerald-500" /> {job.salary}
                  </span>
                )}
                <span className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-2">
                  <FaClock className="text-gray-400" /> Posted {new Date(job.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Description */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
                <FaAlignLeft className="text-blue-500" /> Job Description
              </h3>
              <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                {job.description}
              </div>
            </div>

            {/* Requirements */}
            {(job.requirements || job.description) && (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
                  <FaListUl className="text-blue-500" /> Requirements
                </h3>
                <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {job.requirements || "Refer to the job description for specific requirements."}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl shadow-lg p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
              
              <h3 className="text-xl font-bold mb-4 relative z-10">{isCompanyOwner ? "Manage Job" : "Interested in this role?"}</h3>
              <p className="text-blue-100 mb-6 relative z-10">{isCompanyOwner ? "Use the actions below to manage your posting." : `Apply now and join ${job.company} to take your career to the next level.`}</p>
              
              {!isCompany && (
                <button 
                  onClick={() => navigate(`/jobs/${job._id}/apply`)}
                  className="w-full py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-md relative z-10"
                >
                  Apply for this position
                </button>
              )}
              {isCompanyOwner && (
                <div className="flex flex-col gap-3 relative z-10">
                  <button 
                    onClick={() => navigate(`/company/edit-job/${job._id}`)}
                    className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-md"
                  >
                    Edit Job
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="w-full py-3 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 text-white font-bold rounded-xl transition-colors"
                  >
                    Delete Job
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Company Information</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-xl border border-blue-100/50">
                  <FaBuilding />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{job.company}</h4>
                  <p className="text-sm text-blue-600 cursor-pointer hover:underline">View Profile</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                {job.company} is hiring for the position of {job.title} in {job.location}.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobDetails;
