import axiosInstance from '../apis/axios';
import type {
    User,
    LoginCredentials,
    LoginResponse,
    RegisterData,
    ForgotPasswordData,
    ResetPasswordData,
    ChangePasswordData,
    UpdateProfileData,
    UpdatePreferencesData,
    SessionInfo,
    ApiResponse,
    PaginatedResponse,
    SearchParams,
    FileUploadResponse,
    NotificationData,
    ActivityLog
} from '../types';

// Authentication API
export const authApi = {
    // Login user
    login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data;
    },

    // Register new user
    register: async (data: RegisterData): Promise<ApiResponse<User>> => {
        const response = await axiosInstance.post('/auth/register', data);
        return response.data;
    },

    // Logout user
    logout: async (): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.post('/auth/logout');
        return response.data;
    },

    // Refresh access token
    refreshToken: async (refreshToken: string): Promise<ApiResponse<LoginResponse>> => {
        const response = await axiosInstance.post('/auth/refresh', { refreshToken });
        return response.data;
    },

    // Verify email
    verifyEmail: async (token: string): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.post('/auth/verify-email', { token });
        return response.data;
    },

    // Resend verification email
    resendVerification: async (email: string): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.post('/auth/resend-verification', { email });
        return response.data;
    },

    // Forgot password
    forgotPassword: async (data: ForgotPasswordData): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.post('/auth/forgot-password', data);
        return response.data;
    },

    // Reset password
    resetPassword: async (data: ResetPasswordData): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.post('/auth/reset-password', data);
        return response.data;
    },

    // Change password
    changePassword: async (data: ChangePasswordData): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.post('/auth/change-password', data);
        return response.data;
    },

    // Get current user
    getCurrentUser: async (): Promise<ApiResponse<User>> => {
        const response = await axiosInstance.get('/auth/me');
        return response.data;
    },

    // Validate token
    validateToken: async (token: string): Promise<ApiResponse<User>> => {
        const response = await axiosInstance.post('/auth/validate-token', { token });
        return response.data;
    }
};

// User Profile API
export const userApi = {
    // Get user profile
    getProfile: async (userId?: string): Promise<ApiResponse<User>> => {
        const url = userId ? `/users/${userId}` : '/users/profile';
        const response = await axiosInstance.get(url);
        return response.data;
    },

    // Update user profile
    updateProfile: async (data: UpdateProfileData): Promise<ApiResponse<User>> => {
        const response = await axiosInstance.put('/users/profile', data);
        return response.data;
    },

    // Update user preferences
    updatePreferences: async (data: UpdatePreferencesData): Promise<ApiResponse<User>> => {
        const response = await axiosInstance.put('/users/preferences', data);
        return response.data;
    },

    // Upload avatar
    uploadAvatar: async (file: File): Promise<ApiResponse<FileUploadResponse>> => {
        const formData = new FormData();
        formData.append('avatar', file);
        const response = await axiosInstance.post('/users/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Delete avatar
    deleteAvatar: async (): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.delete('/users/avatar');
        return response.data;
    },

    // Get user sessions
    getSessions: async (): Promise<ApiResponse<SessionInfo[]>> => {
        const response = await axiosInstance.get('/users/sessions');
        return response.data;
    },

    // Revoke session
    revokeSession: async (sessionId: string): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.delete(`/users/sessions/${sessionId}`);
        return response.data;
    },

    // Revoke all sessions except current
    revokeAllSessions: async (): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.delete('/users/sessions');
        return response.data;
    },

    // Get user notifications
    getNotifications: async (params?: SearchParams): Promise<ApiResponse<PaginatedResponse<NotificationData>>> => {
        const response = await axiosInstance.get('/users/notifications', { params });
        return response.data;
    },

    // Mark notification as read
    markNotificationRead: async (notificationId: string): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.put(`/users/notifications/${notificationId}/read`);
        return response.data;
    },

    // Mark all notifications as read
    markAllNotificationsRead: async (): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.put('/users/notifications/read-all');
        return response.data;
    },

    // Delete notification
    deleteNotification: async (notificationId: string): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.delete(`/users/notifications/${notificationId}`);
        return response.data;
    },

    // Get user activity log
    getActivityLog: async (params?: SearchParams): Promise<ApiResponse<PaginatedResponse<ActivityLog>>> => {
        const response = await axiosInstance.get('/users/activity', { params });
        return response.data;
    },

    // Enable two-factor authentication
    enableTwoFactor: async (): Promise<ApiResponse<{ qrCode: string; secret: string }>> => {
        const response = await axiosInstance.post('/users/2fa/enable');
        return response.data;
    },

    // Verify two-factor authentication
    verifyTwoFactor: async (code: string): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.post('/users/2fa/verify', { code });
        return response.data;
    },

    // Disable two-factor authentication
    disableTwoFactor: async (code: string): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.post('/users/2fa/disable', { code });
        return response.data;
    },

    // Get backup codes for 2FA
    getBackupCodes: async (): Promise<ApiResponse<string[]>> => {
        const response = await axiosInstance.get('/users/2fa/backup-codes');
        return response.data;
    },

    // Regenerate backup codes
    regenerateBackupCodes: async (): Promise<ApiResponse<string[]>> => {
        const response = await axiosInstance.post('/users/2fa/backup-codes/regenerate');
        return response.data;
    }
};

// Admin User Management API (for admin users)
export const adminUserApi = {
    // Get all users
    getUsers: async (params?: SearchParams): Promise<ApiResponse<PaginatedResponse<User>>> => {
        const response = await axiosInstance.get('/admin/users', { params });
        return response.data;
    },

    // Get user by ID
    getUserById: async (userId: string): Promise<ApiResponse<User>> => {
        const response = await axiosInstance.get(`/admin/users/${userId}`);
        return response.data;
    },

    // Create user
    createUser: async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<User>> => {
        const response = await axiosInstance.post('/admin/users', userData);
        return response.data;
    },

    // Update user
    updateUser: async (userId: string, userData: Partial<User>): Promise<ApiResponse<User>> => {
        const response = await axiosInstance.put(`/admin/users/${userId}`, userData);
        return response.data;
    },

    // Delete user
    deleteUser: async (userId: string): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.delete(`/admin/users/${userId}`);
        return response.data;
    },

    // Activate/Deactivate user
    toggleUserStatus: async (userId: string, isActive: boolean): Promise<ApiResponse<User>> => {
        const response = await axiosInstance.put(`/admin/users/${userId}/status`, { isActive });
        return response.data;
    },

    // Reset user password
    resetUserPassword: async (userId: string): Promise<ApiResponse<{ temporaryPassword: string }>> => {
        const response = await axiosInstance.post(`/admin/users/${userId}/reset-password`);
        return response.data;
    },

    // Get user sessions (admin)
    getUserSessions: async (userId: string): Promise<ApiResponse<SessionInfo[]>> => {
        const response = await axiosInstance.get(`/admin/users/${userId}/sessions`);
        return response.data;
    },

    // Revoke user session (admin)
    revokeUserSession: async (userId: string, sessionId: string): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.delete(`/admin/users/${userId}/sessions/${sessionId}`);
        return response.data;
    }
};

export default {
    auth: authApi,
    user: userApi,
    admin: adminUserApi
};
