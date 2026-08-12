import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items:       [],
    unreadCount: 0,
    isLoading:   false,
  },
  reducers: {
    setNotifications: (state, action) => {
      state.items       = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.isRead).length;
    },
    addNotification: (state, action) => {
      state.items.unshift(action.payload);
      if (!action.payload.isRead) state.unreadCount += 1;
    },
    markAsRead: (state, action) => {
      const n = state.items.find((n) => n.id === action.payload);
      if (n && !n.isRead) {
        n.isRead       = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach((n) => { n.isRead = true; });
      state.unreadCount = 0;
    },
    clearNotifications: (state) => {
      state.items       = [];
      state.unreadCount = 0;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setNotifications,
  addNotification,
  markAsRead,
  markAllAsRead,
  clearNotifications,
  setLoading,
} = notificationSlice.actions;

export const selectNotifications  = (state) => state.notifications.items;
export const selectUnreadCount    = (state) => state.notifications.unreadCount;
export const selectNotifsLoading  = (state) => state.notifications.isLoading;

export default notificationSlice.reducer;
