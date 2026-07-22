import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  unreadCount: 0,
  isPanelOpen: false
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    toggleNotificationPanel: (state) => {
      state.isPanelOpen = !state.isPanelOpen;
    }
  }
});

// Selectors
export const selectNotifications = (state) => state.notifications.notifications;
export const selectUnreadCount = (state) => state.notifications.unreadCount;
export const selectIsNotificationPanelOpen = (state) => state.notifications.isPanelOpen;

export const { 
  addNotification, 
  markAsRead, 
  markAllAsRead, 
  clearNotifications,
  toggleNotificationPanel
} = notificationSlice.actions;

const notificationReducer = notificationSlice.reducer;
export default notificationReducer; 