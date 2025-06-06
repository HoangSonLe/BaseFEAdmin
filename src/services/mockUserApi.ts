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

import {
    mockUsers,
    mockSessions,
    mockNotifications,
    mockActivityLog,
    findUserByEmail,
    findUserById,
    createMockLoginResponse,
    createMockFileUploadResponse
} from '../data/mockData';

// Simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock current user (will be set after login)
let currentUser: User | null = null;

// Function to restore user session from token
const restoreUserFromToken = (token: string): User | null => {
    // In a real app, you would decode the JWT token to get user info
    // For mock purposes, we'll try to find a user based on token pattern
    if (!token || !token.startsWith('mock_access_token_')) {
        return null;
    }

    // Extract user email from token (mock implementation)
    const tokenParts = token.split('_');
    if (tokenParts.length >= 4) {
        const userEmail = tokenParts[3]; // Assuming token format: mock_access_token_timestamp_email
        const user = findUserByEmail(userEmail);
        if (user) {
            currentUser = user;
            return user;
        }
    }

    // If we can't restore from token, return null
    return null;
};

// Authentication API Mock
export const authApi = {
    // Login user
    login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
        await delay();
        
        const user = findUserByEmail(credentials.email);
        
        if (!user) {
            return {
                success: false,
                message: 'User not found',
                errors: ['Invalid email or password']
            };
        }

        // For demo purposes, accept any password for existing users
        // In real app, you would verify the password hash
        if (!credentials.password || credentials.password.length < 3) {
            return {
                success: false,
                message: 'Invalid password',
                errors: ['Password must be at least 3 characters']
            };
        }

        currentUser = user;
        const loginResponse = createMockLoginResponse(user);

        return {
            success: true,
            data: loginResponse,
            message: 'Login successful'
        };
    },

    // Register new user
    register: async (data: RegisterData): Promise<ApiResponse<User>> => {
        await delay();

        // Check if user already exists
        const existingUser = findUserByEmail(data.email);
        if (existingUser) {
            return {
                success: false,
                message: 'User already exists',
                errors: ['An account with this email already exists']
            };
        }

        // Create new user (in real app, this would be saved to database)
        const newUser: User = {
            id: `user_${Date.now()}`,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            displayName: `${data.firstName} ${data.lastName}`,
            role: mockUsers[3].role, // Default to viewer role
            permissions: mockUsers[3].permissions,
            profile: {
                id: `profile_${Date.now()}`,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                displayName: `${data.firstName} ${data.lastName}`,
                preferences: {
                    theme: 'light',
                    language: 'en',
                    timezone: 'UTC',
                    emailNotifications: true,
                    pushNotifications: false,
                    twoFactorEnabled: false
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            isActive: true,
            isEmailVerified: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        return {
            success: true,
            data: newUser,
            message: 'Registration successful. Please check your email to verify your account.'
        };
    },

    // Logout user
    logout: async (): Promise<ApiResponse<void>> => {
        await delay(200);
        currentUser = null;
        return {
            success: true,
            message: 'Logged out successfully'
        };
    },

    // Refresh access token
    refreshToken: async (_refreshToken: string): Promise<ApiResponse<LoginResponse>> => {
        await delay();
        
        if (!currentUser) {
            return {
                success: false,
                message: 'Invalid refresh token',
                errors: ['Please login again']
            };
        }

        const loginResponse = createMockLoginResponse(currentUser);
        return {
            success: true,
            data: loginResponse,
            message: 'Token refreshed successfully'
        };
    },

    // Verify email
    verifyEmail: async (_token: string): Promise<ApiResponse<void>> => {
        await delay();
        return {
            success: true,
            message: 'Email verified successfully'
        };
    },

    // Resend verification email
    resendVerification: async (_email: string): Promise<ApiResponse<void>> => {
        await delay();
        return {
            success: true,
            message: 'Verification email sent'
        };
    },

    // Forgot password
    forgotPassword: async (data: ForgotPasswordData): Promise<ApiResponse<void>> => {
        await delay();
        
        const user = findUserByEmail(data.email);
        if (!user) {
            // Don't reveal if email exists for security
            return {
                success: true,
                message: 'If an account with this email exists, you will receive password reset instructions.'
            };
        }

        return {
            success: true,
            message: 'Password reset instructions sent to your email'
        };
    },

    // Reset password
    resetPassword: async (data: ResetPasswordData): Promise<ApiResponse<void>> => {
        await delay();
        
        // In real app, you would verify the token
        if (!data.token || data.token.length < 10) {
            return {
                success: false,
                message: 'Invalid or expired reset token',
                errors: ['Please request a new password reset']
            };
        }

        if (data.password !== data.confirmPassword) {
            return {
                success: false,
                message: 'Passwords do not match',
                errors: ['Password and confirm password must match']
            };
        }

        return {
            success: true,
            message: 'Password has been reset successfully'
        };
    },

    // Change password
    changePassword: async (data: ChangePasswordData): Promise<ApiResponse<void>> => {
        await delay();
        
        if (!currentUser) {
            return {
                success: false,
                message: 'Not authenticated',
                errors: ['Please login first']
            };
        }

        // In real app, you would verify current password
        if (!data.currentPassword || data.currentPassword.length < 3) {
            return {
                success: false,
                message: 'Invalid current password',
                errors: ['Current password is incorrect']
            };
        }

        if (data.newPassword !== data.confirmPassword) {
            return {
                success: false,
                message: 'Passwords do not match',
                errors: ['New password and confirm password must match']
            };
        }

        return {
            success: true,
            message: 'Password changed successfully'
        };
    },

    // Get current user
    getCurrentUser: async (): Promise<ApiResponse<User>> => {
        await delay();

        // Try to restore user session if not already set
        if (!currentUser) {
            // Try to get token from localStorage
            const token = localStorage.getItem('authToken');
            if (token) {
                const restoredUser = restoreUserFromToken(token);
                if (restoredUser) {
                    currentUser = restoredUser;
                } else {
                    // Token is invalid, clear it
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('refreshToken');
                    return {
                        success: false,
                        message: 'Invalid or expired token',
                        errors: ['Please login again']
                    };
                }
            } else {
                return {
                    success: false,
                    message: 'No active session',
                    errors: ['User is not logged in']
                };
            }
        }

        return {
            success: true,
            data: currentUser,
            message: 'User data retrieved successfully'
        };
    },

    // Validate token
    validateToken: async (token: string): Promise<ApiResponse<User>> => {
        await delay();
        
        // Simple token validation for demo
        if (!token || !token.startsWith('mock_access_token_')) {
            return {
                success: false,
                message: 'Invalid token',
                errors: ['Token is invalid or expired']
            };
        }

        if (!currentUser) {
            return {
                success: false,
                message: 'User not found',
                errors: ['Please login again']
            };
        }

        return {
            success: true,
            data: currentUser,
            message: 'Token is valid'
        };
    }
};

// User Profile API Mock
export const userApi = {
    // Get user profile
    getProfile: async (userId?: string): Promise<ApiResponse<User>> => {
        await delay();
        
        const user = userId ? findUserById(userId) : currentUser;
        
        if (!user) {
            return {
                success: false,
                message: 'User not found',
                errors: ['User does not exist']
            };
        }

        return {
            success: true,
            data: user,
            message: 'Profile retrieved successfully'
        };
    },

    // Update user profile
    updateProfile: async (data: UpdateProfileData): Promise<ApiResponse<User>> => {
        await delay();
        
        if (!currentUser) {
            return {
                success: false,
                message: 'Not authenticated',
                errors: ['Please login first']
            };
        }

        // Update current user data (in real app, this would update database)
        const updatedUser: User = {
            ...currentUser,
            firstName: data.firstName || currentUser.firstName,
            lastName: data.lastName || currentUser.lastName,
            displayName: data.firstName && data.lastName 
                ? `${data.firstName} ${data.lastName}` 
                : currentUser.displayName,
            profile: {
                ...currentUser.profile,
                firstName: data.firstName || currentUser.profile.firstName,
                lastName: data.lastName || currentUser.profile.lastName,
                displayName: data.firstName && data.lastName 
                    ? `${data.firstName} ${data.lastName}` 
                    : currentUser.profile.displayName,
                phone: data.phone || currentUser.profile.phone,
                dateOfBirth: data.dateOfBirth || currentUser.profile.dateOfBirth,
                bio: data.bio || currentUser.profile.bio,
                website: data.website || currentUser.profile.website,
                address: data.address ? { ...currentUser.profile.address, ...data.address } : currentUser.profile.address,
                socialLinks: data.socialLinks ? { ...currentUser.profile.socialLinks, ...data.socialLinks } : currentUser.profile.socialLinks,
                updatedAt: new Date().toISOString()
            },
            updatedAt: new Date().toISOString()
        };

        currentUser = updatedUser;

        return {
            success: true,
            data: updatedUser,
            message: 'Profile updated successfully'
        };
    },

    // Update user preferences
    updatePreferences: async (data: UpdatePreferencesData): Promise<ApiResponse<User>> => {
        await delay();
        
        if (!currentUser) {
            return {
                success: false,
                message: 'Not authenticated',
                errors: ['Please login first']
            };
        }

        // Update preferences
        const updatedUser: User = {
            ...currentUser,
            profile: {
                ...currentUser.profile,
                preferences: {
                    ...currentUser.profile.preferences,
                    ...data
                },
                updatedAt: new Date().toISOString()
            },
            updatedAt: new Date().toISOString()
        };

        currentUser = updatedUser;

        return {
            success: true,
            data: updatedUser,
            message: 'Preferences updated successfully'
        };
    },

    // Upload avatar
    uploadAvatar: async (file: File): Promise<ApiResponse<FileUploadResponse>> => {
        await delay(1000); // Simulate upload time
        
        if (!currentUser) {
            return {
                success: false,
                message: 'Not authenticated',
                errors: ['Please login first']
            };
        }

        const uploadResponse = createMockFileUploadResponse(file.name);

        // Update user avatar
        const updatedUser: User = {
            ...currentUser,
            avatar: uploadResponse.url,
            profile: {
                ...currentUser.profile,
                avatar: uploadResponse.url,
                updatedAt: new Date().toISOString()
            },
            updatedAt: new Date().toISOString()
        };

        currentUser = updatedUser;

        return {
            success: true,
            data: uploadResponse,
            message: 'Avatar uploaded successfully'
        };
    },

    // Delete avatar
    deleteAvatar: async (): Promise<ApiResponse<void>> => {
        await delay();
        
        if (!currentUser) {
            return {
                success: false,
                message: 'Not authenticated',
                errors: ['Please login first']
            };
        }

        // Remove avatar
        const updatedUser: User = {
            ...currentUser,
            avatar: undefined,
            profile: {
                ...currentUser.profile,
                avatar: undefined,
                updatedAt: new Date().toISOString()
            },
            updatedAt: new Date().toISOString()
        };

        currentUser = updatedUser;

        return {
            success: true,
            message: 'Avatar deleted successfully'
        };
    },

    // Get user sessions
    getSessions: async (): Promise<ApiResponse<SessionInfo[]>> => {
        await delay();
        
        if (!currentUser) {
            return {
                success: false,
                message: 'Not authenticated',
                errors: ['Please login first']
            };
        }

        const userSessions = mockSessions.filter(session => session.userId === currentUser!.id);

        return {
            success: true,
            data: userSessions,
            message: 'Sessions retrieved successfully'
        };
    },

    // Revoke session
    revokeSession: async (_sessionId: string): Promise<ApiResponse<void>> => {
        await delay();
        
        return {
            success: true,
            message: 'Session revoked successfully'
        };
    },

    // Revoke all sessions except current
    revokeAllSessions: async (): Promise<ApiResponse<void>> => {
        await delay();
        
        return {
            success: true,
            message: 'All sessions revoked successfully'
        };
    },

    // Get user notifications
    getNotifications: async (params?: SearchParams): Promise<ApiResponse<PaginatedResponse<NotificationData>>> => {
        await delay();
        
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        const paginatedNotifications = mockNotifications.slice(startIndex, endIndex);

        return {
            success: true,
            data: {
                data: paginatedNotifications,
                total: mockNotifications.length,
                page,
                limit,
                totalPages: Math.ceil(mockNotifications.length / limit),
                hasNext: endIndex < mockNotifications.length,
                hasPrev: page > 1
            },
            message: 'Notifications retrieved successfully'
        };
    },

    // Mark notification as read
    markNotificationRead: async (_notificationId: string): Promise<ApiResponse<void>> => {
        await delay();
        
        return {
            success: true,
            message: 'Notification marked as read'
        };
    },

    // Mark all notifications as read
    markAllNotificationsRead: async (): Promise<ApiResponse<void>> => {
        await delay();
        
        return {
            success: true,
            message: 'All notifications marked as read'
        };
    },

    // Delete notification
    deleteNotification: async (_notificationId: string): Promise<ApiResponse<void>> => {
        await delay();
        
        return {
            success: true,
            message: 'Notification deleted successfully'
        };
    },

    // Get user activity log
    getActivityLog: async (params?: SearchParams): Promise<ApiResponse<PaginatedResponse<ActivityLog>>> => {
        await delay();
        
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        const paginatedActivity = mockActivityLog.slice(startIndex, endIndex);

        return {
            success: true,
            data: {
                data: paginatedActivity,
                total: mockActivityLog.length,
                page,
                limit,
                totalPages: Math.ceil(mockActivityLog.length / limit),
                hasNext: endIndex < mockActivityLog.length,
                hasPrev: page > 1
            },
            message: 'Activity log retrieved successfully'
        };
    },

    // Enable two-factor authentication
    enableTwoFactor: async (): Promise<ApiResponse<{ qrCode: string; secret: string }>> => {
        await delay();
        
        return {
            success: true,
            data: {
                qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
                secret: 'JBSWY3DPEHPK3PXP'
            },
            message: 'Two-factor authentication setup initiated'
        };
    },

    // Verify two-factor authentication
    verifyTwoFactor: async (code: string): Promise<ApiResponse<void>> => {
        await delay();
        
        if (code !== '123456') {
            return {
                success: false,
                message: 'Invalid verification code',
                errors: ['Please enter the correct code from your authenticator app']
            };
        }

        return {
            success: true,
            message: 'Two-factor authentication enabled successfully'
        };
    },

    // Disable two-factor authentication
    disableTwoFactor: async (_code: string): Promise<ApiResponse<void>> => {
        await delay();
        
        return {
            success: true,
            message: 'Two-factor authentication disabled successfully'
        };
    },

    // Get backup codes for 2FA
    getBackupCodes: async (): Promise<ApiResponse<string[]>> => {
        await delay();
        
        const backupCodes = Array.from({ length: 10 }, () =>
            `${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}`.toUpperCase()
        );

        return {
            success: true,
            data: backupCodes,
            message: 'Backup codes retrieved successfully'
        };
    },

    // Regenerate backup codes
    regenerateBackupCodes: async (): Promise<ApiResponse<string[]>> => {
        await delay();
        
        const backupCodes = Array.from({ length: 10 }, () =>
            `${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}`.toUpperCase()
        );

        return {
            success: true,
            data: backupCodes,
            message: 'Backup codes regenerated successfully'
        };
    }
};

// Admin User Management API Mock (for admin users)
export const adminUserApi = {
    // Get all users
    getUsers: async (params?: SearchParams): Promise<ApiResponse<PaginatedResponse<User>>> => {
        await delay();
        
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        let filteredUsers = [...mockUsers];
        
        // Apply search filter if provided
        if (params?.search) {
            const searchTerm = params.search.toLowerCase();
            filteredUsers = filteredUsers.filter(user => 
                user.firstName.toLowerCase().includes(searchTerm) ||
                user.lastName.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
            );
        }
        
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

        return {
            success: true,
            data: {
                data: paginatedUsers,
                total: filteredUsers.length,
                page,
                limit,
                totalPages: Math.ceil(filteredUsers.length / limit),
                hasNext: endIndex < filteredUsers.length,
                hasPrev: page > 1
            },
            message: 'Users retrieved successfully'
        };
    },

    // Get user by ID
    getUserById: async (userId: string): Promise<ApiResponse<User>> => {
        await delay();
        
        const user = findUserById(userId);
        
        if (!user) {
            return {
                success: false,
                message: 'User not found',
                errors: ['User does not exist']
            };
        }

        return {
            success: true,
            data: user,
            message: 'User retrieved successfully'
        };
    },

    // Create user
    createUser: async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<User>> => {
        await delay();
        
        // Check if user already exists
        const existingUser = findUserByEmail(userData.email);
        if (existingUser) {
            return {
                success: false,
                message: 'User already exists',
                errors: ['An account with this email already exists']
            };
        }

        const newUser: User = {
            ...userData,
            id: `user_${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        return {
            success: true,
            data: newUser,
            message: 'User created successfully'
        };
    },

    // Update user
    updateUser: async (userId: string, userData: Partial<User>): Promise<ApiResponse<User>> => {
        await delay();
        
        const user = findUserById(userId);
        
        if (!user) {
            return {
                success: false,
                message: 'User not found',
                errors: ['User does not exist']
            };
        }

        const updatedUser: User = {
            ...user,
            ...userData,
            id: user.id, // Ensure ID doesn't change
            updatedAt: new Date().toISOString()
        };

        return {
            success: true,
            data: updatedUser,
            message: 'User updated successfully'
        };
    },

    // Delete user
    deleteUser: async (userId: string): Promise<ApiResponse<void>> => {
        await delay();
        
        const user = findUserById(userId);
        
        if (!user) {
            return {
                success: false,
                message: 'User not found',
                errors: ['User does not exist']
            };
        }

        return {
            success: true,
            message: 'User deleted successfully'
        };
    },

    // Activate/Deactivate user
    toggleUserStatus: async (userId: string, isActive: boolean): Promise<ApiResponse<User>> => {
        await delay();
        
        const user = findUserById(userId);
        
        if (!user) {
            return {
                success: false,
                message: 'User not found',
                errors: ['User does not exist']
            };
        }

        const updatedUser: User = {
            ...user,
            isActive,
            updatedAt: new Date().toISOString()
        };

        return {
            success: true,
            data: updatedUser,
            message: `User ${isActive ? 'activated' : 'deactivated'} successfully`
        };
    },

    // Reset user password
    resetUserPassword: async (userId: string): Promise<ApiResponse<{ temporaryPassword: string }>> => {
        await delay();
        
        const user = findUserById(userId);
        
        if (!user) {
            return {
                success: false,
                message: 'User not found',
                errors: ['User does not exist']
            };
        }

        const temporaryPassword = Math.random().toString(36).slice(-8);

        return {
            success: true,
            data: { temporaryPassword },
            message: 'Password reset successfully. Temporary password generated.'
        };
    },

    // Get user sessions (admin)
    getUserSessions: async (userId: string): Promise<ApiResponse<SessionInfo[]>> => {
        await delay();
        
        const userSessions = mockSessions.filter(session => session.userId === userId);

        return {
            success: true,
            data: userSessions,
            message: 'User sessions retrieved successfully'
        };
    },

    // Revoke user session (admin)
    revokeUserSession: async (_userId: string, _sessionId: string): Promise<ApiResponse<void>> => {
        await delay();
        
        return {
            success: true,
            message: 'User session revoked successfully'
        };
    }
};

export default {
    auth: authApi,
    user: userApi,
    admin: adminUserApi
};
