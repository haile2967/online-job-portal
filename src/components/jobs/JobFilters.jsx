import React from 'react';
import { useSelector } from 'react-redux';
import { selectJobCategories, selectJobTypes, selectLocations } from '../../slices/jobSlice';
import { FaSearch, FaFilter, FaSort, FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';

const JobFilters = ({ filters, onFilterChange }) => {
  const categories = useSelector(selectJobCategories) || [];
  const jobTypes = useSelector(selectJobTypes) || [];
  const locations = useSelector(selectLocations) || [];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaFilter className="text-blue-500" /> Filter Jobs
      </h3>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Search</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Job title or keywords..."
              value={filters.searchTerm}
              onChange={(e) => onFilterChange('searchTerm', e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <FaBriefcase />
            </div>
            <select
              value={filters.category || 'all'}
              onChange={(e) => onFilterChange('category', e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none font-medium text-gray-700 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Job Type</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <FaBriefcase />
            </div>
            <select
              value={filters.type || 'all'}
              onChange={(e) => onFilterChange('type', e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none font-medium text-gray-700 cursor-pointer"
            >
              <option value="all">All Types</option>
              {jobTypes.map((type) => (
                <option key={type.id || type.name} value={type.name || type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <FaMapMarkerAlt />
            </div>
            <select
              value={filters.location || 'all'}
              onChange={(e) => onFilterChange('location', e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none font-medium text-gray-700 cursor-pointer"
            >
              <option value="all">All Locations</option>
              {locations.map((location) => (
                <option key={location.id || location.name} value={location.name || location.id}>
                  {location.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div className="pt-4 border-t border-gray-100">
          <label className="block text-sm font-bold text-gray-700 mb-2">Sort By</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <FaSort />
            </div>
            <select
              value={filters.sortBy || 'newest'}
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none font-medium text-gray-700 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="applications">Most Applications</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobFilters;
