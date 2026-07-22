import React from 'react';
import { FaChartBar, FaUsers, FaBriefcase } from 'react-icons/fa';

const ManagementCard = ({ title, stats, children }) => {
  return (
    <div className="card management-card">
      <div className="management-header">
        <h2>{title}</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-icon">
                {stat.icon === 'chart' && <FaChartBar />}
                {stat.icon === 'users' && <FaUsers />}
                {stat.icon === 'briefcase' && <FaBriefcase />}
              </div>
              <div className="stat-info">
                <h3>{stat.label}</h3>
                <p>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="management-content">
        {children}
      </div>
    </div>
  );
};

export default ManagementCard; 
