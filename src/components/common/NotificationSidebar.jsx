import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaBell, FaTimes, FaCheck, FaTrash, FaInfoCircle } from 'react-icons/fa';
import {
  selectNotifications,
  selectIsNotificationPanelOpen,
  selectUnreadCount,
  toggleNotificationPanel,
  markAsRead,
  markAllAsRead,
  clearNotifications
} from '../../slices/notificationSlice';

const NotificationSidebar = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const isOpen = useSelector(selectIsNotificationPanelOpen);
  const unreadCount = useSelector(selectUnreadCount);

  const handleToggle = () => {
    dispatch(toggleNotificationPanel());
  };

  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleClearAll = () => {
    dispatch(clearNotifications());
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300" 
          onClick={handleToggle}
        ></div>
      )}

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white/90 backdrop-blur-xl shadow-2xl z-[70] transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col border-l border-gray-100 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
              <FaBell />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm shadow-red-500/30 animate-pulse">
                {unreadCount} new
              </span>
            )}
          </div>
          <button 
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors" 
            onClick={handleToggle}
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Actions */}
        <div className="px-6 py-3 border-b border-gray-100 flex justify-between bg-gray-50/50">
          <button 
            onClick={handleMarkAllAsRead} 
            disabled={unreadCount === 0}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            <FaCheck /> Mark all read
          </button>
          <button 
            onClick={handleClearAll} 
            disabled={notifications.length === 0}
            className="text-sm font-semibold text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            <FaTrash /> Clear all
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 text-4xl mb-4">
                <FaBell />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">You're all caught up!</h4>
              <p className="text-gray-500">Check back later for updates on your applications and jobs.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  !notification.read 
                    ? 'bg-blue-50/50 border-blue-100 hover:bg-blue-50' 
                    : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-200'
                }`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                {!notification.read && (
                  <div className="absolute top-5 right-5 w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                )}
                <div className="flex gap-4">
                  <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${!notification.read ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                    <FaInfoCircle />
                  </div>
                  <div className="flex-1 pr-6">
                    <h4 className={`text-base font-bold mb-1 ${!notification.read ? 'text-blue-900' : 'text-gray-900'}`}>
                      {notification.title}
                    </h4>
                    <p className={`text-sm mb-2 leading-relaxed ${!notification.read ? 'text-blue-800/80' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>
                    <span className="text-xs font-semibold text-gray-400">
                      {new Date(notification.timestamp).toLocaleString(undefined, {
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationSidebar;
