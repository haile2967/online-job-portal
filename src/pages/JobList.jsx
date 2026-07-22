import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs, setLoading, setError } from '../slices/jobSlice';
import JobCard from '../components/cards/JobCard';
import JobFilters from '../components/jobs/JobFilters';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const JobList = ({ variant = 'user' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const [filters, setFilters] = React.useState({
    searchTerm: '',
    category: 'all',
    type: 'all',
    location: 'all',
    sortBy: 'newest'
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        dispatch(setLoading(true));
        const { data } = await api.get('/jobs');
        dispatch(setJobs(data));
      } catch (error) {
        console.error('Error fetching jobs:', error);
        dispatch(setError('Failed to load jobs. Please try again later.'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchJobs();
  }, [dispatch]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleViewJob = (job) => {
    const jobId = job._id || job.id;
    if (variant === 'user') {
      navigate(`/jobs/${jobId}`);
    } else if (variant === 'company') {
      navigate(`/company/job/${jobId}`);
    } else if (variant === 'admin') {
      navigate(`/admin/job/${jobId}`);
    }
  };

  const handleApplyJob = (job) => {
    const jobId = job._id || job.id;
    navigate(`/jobs/${jobId}/apply`);
  };

  const handleEditJob = (jobId) => {
    navigate(`/company/edit-job/${jobId}`);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      // TODO: Implement delete job functionality
      console.log('Delete job:', jobId);
    }
  };

  const handleViewApplications = (jobId) => {
    navigate(`/company/job-applications/${jobId}`);
  };

  const handleApproveJob = (job) => {
    // TODO: Implement approve job functionality
    console.log('Approve job:', job);
  };

  const handleRejectJob = (job) => {
    // TODO: Implement reject job functionality
    console.log('Reject job:', job);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-blue-600">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xl font-bold">Loading jobs...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100 text-center max-w-md w-full shadow-sm">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="font-bold text-lg">{error}</p>
        </div>
      </div>
    );
  }

  const filteredJobs = jobs
    .filter(job => {
      const titleMatch = job.title?.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const companyMatch = job.company?.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const locationMatchSearch = job.location?.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesSearch = titleMatch || companyMatch || locationMatchSearch;
      
      // Note: Job schema currently doesn't have a specific category, but we can filter if added later. 
      // For now, if category is selected, we could match it against type or just ignore if 'all'
      const matchesCategory = filters.category === 'all' || job.category === filters.category;
      
      const matchesType = filters.type === 'all' || job.type === filters.type;
      
      const matchesLocation = filters.location === 'all' || 
                              job.location?.toLowerCase().includes(filters.location.toLowerCase());

      return matchesSearch && matchesCategory && matchesType && matchesLocation;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || a.postedDate || 0);
      const dateB = new Date(b.createdAt || b.postedDate || 0);
      switch (filters.sortBy) {
        case 'newest':
          return dateB - dateA;
        case 'oldest':
          return dateA - dateB;
        case 'applications':
          return (b.applications || 0) - (a.applications || 0);
        case 'views':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

  return (
    <div className="bg-gray-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {variant === 'user' && 'Find Your Dream Job'}
            {variant === 'company' && 'Manage Job Listings'}
            {variant === 'admin' && 'Manage Job Listings'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {variant === 'user' && 'Browse through our curated list of opportunities tailored just for you.'}
            {variant === 'company' && 'View and manage your job postings and applicants seamlessly.'}
            {variant === 'admin' && 'Review and manage job listings from companies across the platform.'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <JobFilters 
              filters={filters} 
              onFilterChange={handleFilterChange}
              variant={variant}
            />
          </div>

          <div className="w-full lg:w-3/4">
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                <div className="text-5xl mb-4 text-gray-300">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No jobs found</h3>
                <p className="text-gray-500">We couldn't find any jobs matching your current criteria. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onView={handleViewJob}
                    onApply={handleApplyJob}
                    onEdit={handleEditJob}
                    onDelete={handleDeleteJob}
                    onViewApplications={handleViewApplications}
                    onApprove={handleApproveJob}
                    onReject={handleRejectJob}
                    variant={variant}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList; 
