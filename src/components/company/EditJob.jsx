import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostJobCard from '../cards/PostJobCard';
import api from '../../api/axios';

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
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
        setError('Failed to load job details.');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleSubmit = async (jobData) => {
    try {
      setError('');
      await api.put(`/jobs/${jobId}`, jobData);
      navigate('/company/manage-jobs');
    } catch (err) {
      console.error('Error updating job:', err);
      setError(err.response?.data?.message || 'Failed to update job. Please try again.');
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
    <div className="p-8 max-w-4xl mx-auto animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Edit Job Listing</h2>
          <p className="text-gray-500 mt-1">Update the details of your job posting.</p>
        </div>
        <button 
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          onClick={() => navigate('/company/manage-jobs')}
        >
          Cancel Editing
        </button>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {job && (
        <PostJobCard 
          initialData={job} 
          isEditing={true} 
          onSubmit={handleSubmit} 
        />
      )}
    </div>
  );
};

export default EditJob;
