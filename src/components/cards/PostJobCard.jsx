import React, { useState, useEffect } from 'react';
import { FaPlus, FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaAlignLeft, FaListUl, FaSave } from 'react-icons/fa';

const PostJobCard = ({ onSubmit, initialData, isEditing = false }) => {
  const [jobData, setJobData] = useState({
    title: '',
    type: 'Full-time',
    location: '',
    salary: '',
    description: '',
    requirements: '',
    status: 'Active'
  });

  useEffect(() => {
    if (initialData) {
      setJobData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(jobData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-8 py-6 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner ${isEditing ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
          <FaBriefcase />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{isEditing ? 'Edit Job Listing' : 'Job Details'}</h3>
          <p className="text-sm text-gray-500">Provide accurate information to attract the right candidates.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">Job Title</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <FaBriefcase />
            </div>
            <input
              type="text"
              id="title"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              placeholder="e.g., Senior Software Engineer"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              required
            />
          </div>
        </div>

        {/* Row: Type, Location, Salary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="type" className="block text-sm font-bold text-gray-700 mb-2">Job Type</label>
            <div className="relative">
              <select
                id="type"
                name="type"
                value={jobData.type}
                onChange={handleChange}
                className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none font-medium text-gray-700 cursor-pointer"
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2">Location</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <FaMapMarkerAlt />
              </div>
              <input
                type="text"
                id="location"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                placeholder="e.g., New York, NY or Remote"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="salary" className="block text-sm font-bold text-gray-700 mb-2">Salary Range</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                <FaMoneyBillWave />
              </div>
              <input
                type="text"
                id="salary"
                name="salary"
                value={jobData.salary}
                onChange={handleChange}
                placeholder="e.g., $80k - $100k"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <FaAlignLeft className="text-gray-400" /> Job Description
          </label>
          <textarea
            id="description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            placeholder="Describe the role, team, and day-to-day responsibilities..."
            rows="5"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-y"
            required
          />
        </div>

        {/* Requirements */}
        <div>
          <label htmlFor="requirements" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <FaListUl className="text-gray-400" /> Requirements & Qualifications
          </label>
          <textarea
            id="requirements"
            name="requirements"
            value={jobData.requirements}
            onChange={handleChange}
            placeholder="List the required skills, experience, and educational background..."
            rows="5"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-y"
            required
          />
        </div>

        {/* Status (Only on edit or explicitly selected) */}
        {isEditing && (
          <div>
            <label htmlFor="status" className="block text-sm font-bold text-gray-700 mb-2">Visibility Status</label>
            <div className="relative inline-block w-48">
              <select
                id="status"
                name="status"
                value={jobData.status}
                onChange={handleChange}
                className={`w-full pl-4 pr-10 py-3 border rounded-xl outline-none appearance-none font-bold transition-all cursor-pointer ${
                  jobData.status === 'Active' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 focus:ring-2 focus:ring-emerald-500' : 
                  jobData.status === 'Closed' ? 'bg-red-50 border-red-200 text-red-700 focus:ring-2 focus:ring-red-500' :
                  'bg-gray-50 border-gray-200 text-gray-700 focus:ring-2 focus:ring-gray-500'
                }`}
                required
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active (Published)</option>
                <option value="Closed">Closed</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none opacity-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-end">
          {!isEditing && (
            <button 
              type="button"
              onClick={() => {
                setJobData(prev => ({ ...prev, status: 'Draft' }));
                setTimeout(() => document.getElementById('post-job-submit-btn').click(), 0);
              }}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm flex items-center gap-2"
            >
              <FaSave /> Save as Draft
            </button>
          )}
          <button 
            id="post-job-submit-btn"
            type="submit" 
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            {isEditing ? <FaSave /> : <FaPlus />}
            {isEditing ? 'Update Job Listing' : 'Publish Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobCard;
