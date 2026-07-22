import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostJobCard from '../cards/PostJobCard';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

const PostJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (jobData) => {
    try {
      setError('');
      // Merge user company if not present
      const payload = {
        ...jobData,
        company: user?.companyName || 'My Company'
      };
      
      await api.post('/jobs', payload);
      navigate('/company/manage-jobs');
    } catch (err) {
      console.error('Error posting job:', err);
      setError(err.response?.data?.message || 'Failed to post job. Please try again.');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Post New Job</h2>
          <p className="text-gray-500 mt-1">Create a new job listing to find great candidates.</p>
        </div>
        <button 
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          onClick={() => navigate('/company/manage-jobs')}
        >
          Back to Jobs
        </button>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <PostJobCard onSubmit={handleSubmit} />
    </div>
  );
};

export default PostJob; 
