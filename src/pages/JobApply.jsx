import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaArrowLeft, FaPaperPlane, FaBriefcase, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import api from '../api/axios';

const JobApply = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    resumeLink: '',
    coverLetter: ''
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await api.get(`/jobs/${jobId}`);
        setJob(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load job details. It may have been removed.');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to apply for jobs.');
      return;
    }
    
    try {
      setSubmitting(true);
      setError('');
      await api.post('/applications', {
        jobId,
        resumeLink: formData.resumeLink,
        coverLetter: formData.coverLetter
      });
      alert('Application submitted successfully!');
      navigate('/jobs');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="p-8 max-w-2xl mx-auto mt-10">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center border border-red-100">
          {error}
          <button onClick={() => navigate('/jobs')} className="block mx-auto mt-4 text-blue-600 hover:underline">Back to Jobs</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto animate-fade-in-up">
      <button 
        onClick={() => navigate('/jobs')}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6"
      >
        <FaArrowLeft /> Back to Jobs
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl">
            <FaBriefcase />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 font-medium">
              <span className="flex items-center gap-1"><FaBuilding className="text-gray-400" /> {job.company}</span>
              <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-gray-400" /> {job.location}</span>
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">{job.type}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Submit Your Application</h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700 mb-1">
              Resume Link <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="resumeLink"
              name="resumeLink"
              value={formData.resumeLink}
              onChange={handleChange}
              placeholder="https://link-to-your-resume.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Please provide a link to your resume (Google Drive, Dropbox, Portfolio, etc.)</p>
          </div>

          <div>
            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Why are you a good fit for this role?"
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <FaPaperPlane /> Submit Application
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApply;
