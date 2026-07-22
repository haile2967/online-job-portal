import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { FaBriefcase, FaList, FaCheckCircle, FaTimesCircle, FaEdit, FaSearch } from 'react-icons/fa';
import JobList from '../../pages/JobList';


// Mock data for demonstration
const mockJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    location: 'New York',
    type: 'Full-time',
    status: 'pending',
    postedDate: '2024-03-15',
    salary: '$120,000 - $150,000'
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Innovate Inc',
    location: 'Remote',
    type: 'Full-time',
    status: 'active',
    postedDate: '2024-03-14',
    salary: '$100,000 - $130,000'
  }
];

const JobView = ({ title, description, jobs = mockJobs }) => {
  const handleApprove = (job) => {
    console.log('Approving job:', job);
    // Add approval logic here
  };

  const handleReject = (job) => {
    console.log('Rejecting job:', job);
    // Add rejection logic here
  };

  const handleView = (job) => {
    console.log('Viewing job:', job);
    // Add view logic here
  };

  return (
    <div className="admin-content">
      <div className="management-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <JobList 
        jobs={jobs}
        onApprove={handleApprove}
        onReject={handleReject}
        onView={handleView}
      />
    </div>
  );
};

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Technology', count: 45 },
    { id: 2, name: 'Healthcare', count: 32 },
    { id: 3, name: 'Finance', count: 28 }
  ]);

  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { id: categories.length + 1, name: newCategory, count: 0 }]);
      setNewCategory('');
    }
  };

  const handleEditCategory = (category) => {
    console.log('Editing category:', category);
    // Add edit logic here
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="admin-content">
      <div className="management-header">
        <h2>Job Categories</h2>
        <p>Manage job categories and types</p>
      </div>
      
      <div className="category-management">
        <div className="add-category">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category"
          />
          <button onClick={handleAddCategory}>Add Category</button>
        </div>

        <div className="categories-list">
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ManageJobs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRootPath = location.pathname === '/admin/jobs';

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      status: 'pending',
      postedDate: '2024-03-15',
      applications: 25
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Tech Corp',
      location: 'Remote',
      type: 'Full-time',
      status: 'approved',
      postedDate: '2024-03-10',
      applications: 15
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'Tech Corp',
      location: 'New York, NY',
      type: 'Part-time',
      status: 'rejected',
      postedDate: '2024-03-05',
      applications: 0
    }
  ]);

  const [filters, setFilters] = useState({
    searchTerm: '',
    status: 'all',
    type: 'all',
    sortBy: 'newest'
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleView = (job) => {
    navigate(`/admin/job/${job.id}`);
  };

  const handleApprove = (job) => {
    setJobs(jobs.map(j => 
      j.id === job.id ? { ...j, status: 'approved' } : j
    ));
  };

  const handleReject = (job) => {
    setJobs(jobs.map(j => 
      j.id === job.id ? { ...j, status: 'rejected' } : j
    ));
  };

  const filteredJobs = jobs
    .filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                          job.location.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesStatus = filters.status === 'all' || job.status === filters.status;
      const matchesType = filters.type === 'all' || job.type === filters.type;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.postedDate) - new Date(a.postedDate);
        case 'oldest':
          return new Date(a.postedDate) - new Date(b.postedDate);
        case 'applications':
          return b.applications - a.applications;
        default:
          return 0;
      }
    });

  const jobCards = [
    {
      id: 1,
      title: 'Pending Approvals',
      description: 'Review and manage new job listings awaiting approval',
      icon: <FaList />,
      path: '/admin/jobs/pending',
      color: '#f1c40f'
    },
    {
      id: 2,
      title: 'Active Jobs',
      description: 'View and monitor currently active job listings',
      icon: <FaBriefcase />,
      path: '/admin/jobs/active',
      color: '#2ecc71'
    },
    {
      id: 3,
      title: 'Approved Jobs',
      description: 'View all approved job listings',
      icon: <FaCheckCircle />,
      path: '/admin/jobs/approved',
      color: '#27ae60'
    },
    {
      id: 4,
      title: 'Rejected Jobs',
      description: 'View and manage rejected job listings',
      icon: <FaTimesCircle />,
      path: '/admin/jobs/rejected',
      color: '#e74c3c'
    },
    {
      id: 5,
      title: 'Job Categories',
      description: 'Manage job categories and types',
      icon: <FaEdit />,
      path: '/admin/jobs/categories',
      color: '#9b59b6'
    }
  ];

  return (
    <div className="manage-jobs-container">
      <div className="manage-jobs-header">
        <h2>Manage Job Listings</h2>
        <div className="job-stats-grid">
          <div className="stat-card">
            <span className="stat-label">Pending Jobs</span>
            <span className="stat-value">{jobs.filter(job => job.status === 'pending').length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Approved Jobs</span>
            <span className="stat-value">{jobs.filter(job => job.status === 'approved').length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Rejected Jobs</span>
            <span className="stat-value">{jobs.filter(job => job.status === 'rejected').length}</span>
          </div>
        </div>
      </div>

      <JobList
        jobs={filteredJobs}
        onView={handleView}
        onApprove={handleApprove}
        onReject={handleReject}
        variant="admin"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default ManageJobs; 
