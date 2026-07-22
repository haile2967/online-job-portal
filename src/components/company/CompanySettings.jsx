import React, { useState } from 'react';
import { FaLock, FaShieldAlt } from 'react-icons/fa';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const CompanySettings = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (passwords.newPassword !== passwords.confirmPassword) {
      return setError('New passwords do not match.');
    }

    if (passwords.newPassword.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }

    setLoading(true);
    try {
      // Re-using the profile update endpoint to update password. 
      // In a real app, you might want a dedicated password update endpoint that verifies currentPassword.
      await api.put('/auth/profile', { password: passwords.newPassword });
      setSuccess('Password updated successfully!');
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 animate-fade-in-up max-w-3xl">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-500 mt-1">Manage your account security and preferences.</p>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>}
      {success && <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-lg">{success}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
          <FaShieldAlt className="text-blue-600 text-xl" />
          <h3 className="text-lg font-bold text-gray-900">Security</h3>
        </div>

        <form onSubmit={handlePasswordUpdate} className="p-6 space-y-6">
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaLock />
                </div>
                <input 
                  type="password" 
                  name="newPassword" 
                  value={passwords.newPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaLock />
                </div>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-red-50 rounded-xl border border-red-100 p-6">
        <h3 className="text-lg font-bold text-red-800 mb-2">Danger Zone</h3>
        <p className="text-red-600 mb-4 text-sm">Once you delete your account, there is no going back. Please be certain.</p>
        <button 
          type="button"
          className="px-4 py-2 bg-white border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-600 hover:text-white transition-colors"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default CompanySettings;
