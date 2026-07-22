import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { FaUsers, FaUserShield, FaSitemap, FaUserLock, FaHistory, FaChartBar } from 'react-icons/fa';

const ManagementView = ({ title, description }) => (
  <div className="admin-content">
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

const AccountManagement = () => {
  const location = useLocation();
  const isRootPath = location.pathname === '/admin/account-management';

  const managementCards = [
    {
      id: 1,
      title: 'Manage Users',
      description: 'View, add, edit, and delete user accounts',
      icon: <FaUsers />,
      path: '/admin/account-management/users',
      color: '#3498db'
    },
    {
      id: 2,
      title: 'Role Management',
      description: 'Configure user roles and permissions',
      icon: <FaUserShield />,
      path: '/admin/account-management/roles',
      color: '#2ecc71'
    },
    {
      id: 3,
      title: 'Page Management',
      description: 'Manage page access and visibility',
      icon: <FaSitemap />,
      path: '/admin/account-management/pages',
      color: '#e74c3c'
    },
    {
      id: 4,
      title: 'Access Control',
      description: 'Set up and manage access policies',
      icon: <FaUserLock />,
      path: '/admin/account-management/access',
      color: '#f1c40f'
    },
    {
      id: 5,
      title: 'Activity Logs',
      description: 'View user activity and system logs',
      icon: <FaHistory />,
      path: '/admin/account-management/logs',
      color: '#9b59b6'
    },
    {
      id: 6,
      title: 'Analytics',
      description: 'View user and system analytics',
      icon: <FaChartBar />,
      path: '/admin/account-management/analytics',
      color: '#1abc9c'
    }
  ];

  return (
    <div className="admin-content">
      <div className="management-header">
        <h2>Account Management</h2>
        <p>Manage user accounts, roles, and system access</p>
      </div>

      {isRootPath ? (
        <div className="management-grid">
          {managementCards.map(card => (
            <Link to={card.path} key={card.id} className="management-card">
              <div className="card-icon" style={{ backgroundColor: card.color }}>
                {card.icon}
              </div>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Routes>
          <Route path="/users" element={<ManagementView title="Manage Users" description="View, add, edit, and delete user accounts" />} />
          <Route path="/roles" element={<ManagementView title="Role Management" description="Configure user roles and permissions" />} />
          <Route path="/pages" element={<ManagementView title="Page Management" description="Manage page access and visibility" />} />
          <Route path="/access" element={<ManagementView title="Access Control" description="Set up and manage access policies" />} />
          <Route path="/logs" element={<ManagementView title="Activity Logs" description="View user activity and system logs" />} />
          <Route path="/analytics" element={<ManagementView title="Analytics" description="View user and system analytics" />} />
        </Routes>
      )}
    </div>
  );
};

export default AccountManagement; 
