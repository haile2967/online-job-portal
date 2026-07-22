import React from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaUsers, FaEye, FaCheck, FaTimes, FaEdit, FaTrash, FaChartBar, FaBuilding } from 'react-icons/fa';

const JobCard = ({ 
  job, 
  onView, 
  onApply, 
  onApprove, 
  onReject,
  onEdit,
  onDelete,
  onViewApplications,
  variant = 'user' // 'user', 'admin', or 'company'
}) => {
  // Use _id from MongoDB or fallback to id
  const jobId = job._id || job.id;

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col md:flex-row gap-6 items-start">
      {/* Company Logo Placeholder */}
      <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-blue-600 text-2xl shadow-inner border border-blue-100/50 flex-shrink-0 group-hover:scale-105 transition-transform">
        <FaBuilding />
      </div>

      <div className="flex-1 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => onView(job)}>
              {job.title}
            </h3>
            <p className="text-gray-500 font-medium text-sm mt-1">{job.company}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">
              {job.type || 'Full-time'}
            </span>
            {job.status && (
              <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                job.status.toLowerCase() === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                job.status.toLowerCase() === 'closed' ? 'bg-red-50 text-red-700 border-red-100' :
                'bg-gray-100 text-gray-700 border-gray-200'
              }`}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md">
            <FaMapMarkerAlt className="text-gray-400" />
            <span>{job.location}</span>
          </div>
          {job.salary && (
            <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md">
              <FaMoneyBillWave className="text-gray-400" />
              <span>{job.salary}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md">
            <FaClock className="text-gray-400" />
            <span>{new Date(job.createdAt || job.postedDate || Date.now()).toLocaleDateString()}</span>
          </div>
        </div>

        {job.description && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-6">
            {job.description}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div className="flex gap-4 text-sm font-medium text-gray-500">
            {job.applications !== undefined && (
              <div className="flex items-center gap-2">
                <FaUsers className="text-blue-500" />
                <span>{job.applications} applicants</span>
              </div>
            )}
            {variant === 'company' && job.views !== undefined && (
              <div className="flex items-center gap-2">
                <FaChartBar className="text-indigo-500" />
                <span>{job.views} views</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => onView(job)}
              className="px-4 py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium rounded-xl transition-colors flex items-center gap-2 text-sm"
            >
              <FaEye /> View
            </button>
            
            {variant === 'user' && onApply && (
              <button 
                onClick={() => onApply(job)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm shadow-blue-500/30 flex items-center gap-2 text-sm"
              >
                Apply Now
              </button>
            )}

            {variant === 'admin' && job.status === 'pending' && (
              <>
                <button onClick={() => onApprove(job)} className="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium rounded-xl transition-colors flex items-center gap-2 text-sm">
                  <FaCheck /> Approve
                </button>
                <button onClick={() => onReject(job)} className="px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 font-medium rounded-xl transition-colors flex items-center gap-2 text-sm">
                  <FaTimes /> Reject
                </button>
              </>
            )}

            {variant === 'company' && (
              <>
                <button onClick={() => onEdit(jobId)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Job">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(jobId)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Job">
                  <FaTrash />
                </button>
                <button onClick={() => onViewApplications(jobId)} className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium rounded-xl transition-colors flex items-center gap-2 text-sm">
                  <FaUsers /> Applicants
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
