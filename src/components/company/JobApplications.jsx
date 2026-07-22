import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaFileAlt, FaUserTie, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import api from '../../api/axios';

const JobApplications = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/applications/job/${jobId}`);
        setApplications(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load applications.');
      } finally {
        setLoading(false);
      }
    };
    
    if (jobId) {
      fetchApplications();
    }
  }, [jobId]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await api.put(`/applications/${applicationId}/status`, { status: newStatus });
      setApplications(applications.map(app => 
        app._id === applicationId ? { ...app, status: newStatus } : app
      ));
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'reviewed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Job Applications</h2>
          <p className="text-gray-500 mt-1">Review and manage applicants for this position.</p>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          onClick={() => navigate('/company/manage-jobs')}
        >
          <FaArrowLeft /> Back to Jobs
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {applications.length > 0 ? (
          applications.map(application => (
            <div key={application._id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-lg">
                    <FaUserTie />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{application.applicant?.name || 'Unknown Applicant'}</h3>
                    <p className="text-sm text-gray-500">Applied: {new Date(application.appliedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><FaEnvelope className="text-gray-400" /> {application.applicant?.email || 'No email provided'}</span>
                  {application.resumeLink && (
                    <a href={application.resumeLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                      <FaFileAlt /> View Resume Link
                    </a>
                  )}
                </div>
                {application.coverLetter && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-700">
                    <p className="font-semibold mb-1 text-gray-900">Cover Letter:</p>
                    <p className="whitespace-pre-wrap">{application.coverLetter}</p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-3 min-w-[200px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                  <select
                    value={application.status}
                    onChange={(e) => handleStatusChange(application._id, e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(application.status)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleStatusChange(application._id, 'accepted')}
                    className="flex-1 flex justify-center items-center gap-1 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm"
                  >
                    <FaCheckCircle /> Accept
                  </button>
                  <button 
                    onClick={() => handleStatusChange(application._id, 'rejected')}
                    className="flex-1 flex justify-center items-center gap-1 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                  >
                    <FaTimesCircle /> Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <FaUserTie />
            </div>
            <p className="text-gray-500">No applications found for this job posting yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplications; 
