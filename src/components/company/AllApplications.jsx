import React, { useState, useEffect } from 'react';
import { FaUserTie, FaCheckCircle, FaTimesCircle, FaClock, FaBriefcase } from 'react-icons/fa';
import api from '../../api/axios';

const AllApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/applications/company/me');
      setApplications(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch applications.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (appId, status) => {
    try {
      setUpdatingId(appId);
      await api.put(`/applications/${appId}/status`, { status });
      // Update local state
      setApplications(applications.map(app => 
        app._id === appId ? { ...app, status } : app
      ));
    } catch (err) {
      console.error(err);
      alert('Failed to update application status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"><FaCheckCircle /> Accepted</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"><FaTimesCircle /> Rejected</span>;
      case 'reviewed':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"><FaUserTie /> Reviewed</span>;
      default:
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"><FaClock /> Pending</span>;
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
    <div className="p-6 md:p-8 animate-fade-in-up">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">All Applications</h2>
        <p className="text-gray-500 mt-1">Review and manage candidates across all your job postings.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            <FaUserTie />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No applications yet</h3>
          <p className="text-gray-500">When candidates apply for your jobs, they will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Candidate</th>
                  <th className="px-6 py-4 font-medium">Applied Job</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-bold text-gray-900">{app.applicant?.name || 'Unknown User'}</div>
                        <div className="text-sm text-gray-500">{app.applicant?.email || 'No email'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FaBriefcase className="text-blue-500" />
                        <span className="font-medium text-gray-700">{app.job?.title || 'Unknown Job'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {app.resumeLink && (
                          <a 
                            href={app.resumeLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                          >
                            View Resume
                          </a>
                        )}
                        
                        <div className="relative group inline-block">
                          <select 
                            value={app.status}
                            onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                            disabled={updatingId === app._id}
                            className="appearance-none bg-white border border-gray-300 hover:border-gray-400 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllApplications;
