import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
// Import mock API for development
import { authApi, userApi } from "../services/mockUserApi";
// For production, use: import { authApi, userApi } from "../services/userApi";
import type {
    User,
    LoginCredentials,
    RegisterData,
    ChangePasswordData,
    UpdateProfileData,
    UpdatePreferencesData,
    PermissionCheck
} from "../types";

// Error type for API responses
interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
    message?: string;
}

// Utility function to extract error message
const getErrorMessage = (error: unknown, defaultMessage: string): string => {
    const apiError = error as ApiError;
    return apiError.response?.data?.message || apiError.message || defaultMessage;
};

// Define the enhanced context type
interface AuthContextType {
    // User state
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Authentication methods
    login: (credentials: LoginCredentials) => Promise<boolean>;
    logout: () => void;
    register: (data: RegisterData) => Promise<boolean>;
    forgotPassword: (email: string) => Promise<boolean>;
    resetPassword: (token: string, newPassword: string) => Promise<boolean>;
    changePassword: (data: ChangePasswordData) => Promise<boolean>;

    // User profile methods
    updateProfile: (data: UpdateProfileData) => Promise<boolean>;
    updatePreferences: (data: UpdatePreferencesData) => Promise<boolean>;
    uploadAvatar: (file: File) => Promise<boolean>;
    deleteAvatar: () => Promise<boolean>;
    refreshUser: () => Promise<void>;

    // Permission methods
    hasPermission: (permission: PermissionCheck) => boolean;
    hasRole: (role: string) => boolean;
    hasAnyPermission: (permissions: PermissionCheck[]) => boolean;
    hasAllPermissions: (permissions: PermissionCheck[]) => boolean;

    // Token management
    getToken: () => string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: async () => false,
    logout: () => {},
    register: async () => false,
    forgotPassword: async () => false,
    resetPassword: async () => false,
    changePassword: async () => false,
    updateProfile: async () => false,
    updatePreferences: async () => false,
    uploadAvatar: async () => false,
    deleteAvatar: async () => false,
    refreshUser: async () => {},
    hasPermission: () => false,
    hasRole: () => false,
    hasAnyPermission: () => false,
    hasAllPermissions: () => false,
    getToken: () => null,
    setToken: () => {},
    clearToken: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Token management
    const getToken = useCallback(() => {
        return localStorage.getItem("authToken");
    }, []);

    const setToken = useCallback((token: string) => {
        localStorage.setItem("authToken", token);
    }, []);

    const clearToken = useCallback(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
    }, []);

    // Permission checking functions
    const hasPermission = useCallback((permission: PermissionCheck): boolean => {
        if (!user || !user.permissions) return false;

        return user.permissions.some(p =>
            p.resource === permission.resource &&
            (p.action === permission.action || p.action === 'manage')
        );
    }, [user]);

    const hasRole = useCallback((role: string): boolean => {
        if (!user || !user.role) return false;
        return user.role.name === role;
    }, [user]);

    const hasAnyPermission = useCallback((permissions: PermissionCheck[]): boolean => {
        return permissions.some(permission => hasPermission(permission));
    }, [hasPermission]);

    const hasAllPermissions = useCallback((permissions: PermissionCheck[]): boolean => {
        return permissions.every(permission => hasPermission(permission));
    }, [hasPermission]);

    // Refresh user data
    const refreshUser = useCallback(async () => {
        try {
            const token = getToken();
            if (!token) {
                setUser(null);
                return;
            }

            const response = await authApi.getCurrentUser();
            if (response.success && response.data) {
                setUser(response.data);
            } else {
                // If user data fetch fails, clear tokens and set user to null
                // This is normal when token is invalid or expired
                clearToken();
                setUser(null);
            }
        } catch (error) {
            // Only log error if it's not a normal authentication failure
            console.warn("Authentication check failed - user may not be logged in:", error);
            clearToken();
            setUser(null);
        }
    }, [getToken, clearToken]);

    // Check if user is already logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = getToken();
                if (token) {
                    await refreshUser();
                } else {
                    // No token found, user is not logged in
                    setUser(null);
                }
            } catch (error) {
                // Only log unexpected errors
                console.warn("Authentication check encountered an issue:", error);
                clearToken();
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [getToken, refreshUser, clearToken]);

    // Login function
    const login = async (credentials: LoginCredentials): Promise<boolean> => {
        setIsLoading(true);
        try {
            const response = await authApi.login(credentials);

            if (response.success && response.data) {
                const { user: userData, accessToken, refreshToken } = response.data;

                // Store tokens
                setToken(accessToken);
                localStorage.setItem("refreshToken", refreshToken);

                // Update user state
                setUser(userData);

                message.success("Login successful");
                return true;
            } else {
                message.error(response.message || "Invalid credentials");
                return false;
            }
        } catch (error: unknown) {
            console.error("Login failed:", error);
            const errorMessage = getErrorMessage(error, "Login failed. Please try again.");
            message.error(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Register function
    const register = async (data: RegisterData): Promise<boolean> => {
        setIsLoading(true);
        try {
            const response = await authApi.register(data);

            if (response.success) {
                message.success("Registration successful. Please check your email to verify your account.");
                return true;
            } else {
                message.error(response.message || "Registration failed");
                return false;
            }
        } catch (error: unknown) {
            console.error("Registration failed:", error);
            const errorMessage = getErrorMessage(error, "Registration failed. Please try again.");
            message.error(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Logout function
    const logout = useCallback(async () => {
        try {
            // Call logout API to invalidate token on server
            await authApi.logout();
        } catch (error) {
            console.error("Logout API call failed:", error);
        } finally {
            // Clear local state regardless of API call result
            clearToken();
            setUser(null);
            message.success("Logged out successfully");
            navigate("/login");
        }
    }, [clearToken, navigate]);

    // Forgot password function
    const forgotPassword = async (email: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            const response = await authApi.forgotPassword({ email });

            if (response.success) {
                message.success("Password reset instructions sent to your email");
                return true;
            } else {
                message.error(response.message || "Please enter a valid email");
                return false;
            }
        } catch (error: unknown) {
            console.error("Forgot password request failed:", error);
            const errorMessage = getErrorMessage(error, "Request failed. Please try again.");
            message.error(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Reset password function
    const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            const response = await authApi.resetPassword({
                token,
                password: newPassword,
                confirmPassword: newPassword
            });

            if (response.success) {
                message.success("Password has been reset successfully");
                return true;
            } else {
                message.error(response.message || "Invalid request");
                return false;
            }
        } catch (error: unknown) {
            console.error("Reset password failed:", error);
            const errorMessage = getErrorMessage(error, "Password reset failed. Please try again.");
            message.error(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Change password function
    const changePassword = async (data: ChangePasswordData): Promise<boolean> => {
        setIsLoading(true);
        try {
            const response = await authApi.changePassword(data);

            if (response.success) {
                message.success("Password changed successfully");
                return true;
            } else {
                message.error(response.message || "Failed to change password");
                return false;
            }
        } catch (error: unknown) {
            console.error("Change password failed:", error);
            const errorMessage = getErrorMessage(error, "Failed to change password. Please try again.");
            message.error(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Update profile function
    const updateProfile = async (data: UpdateProfileData): Promise<boolean> => {
        setIsLoading(true);
        try {
            const response = await userApi.updateProfile(data);

            if (response.success && response.data) {
                setUser(response.data);
                message.success("Profile updated successfully");
                return true;
            } else {
                message.error(response.message || "Failed to update profile");
                return false;
            }
        } catch (error: unknown) {
            console.error("Update profile failed:", error);
            const errorMessage = getErrorMessage(error, "Failed to update profile. Please try again.");
            message.error(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Update preferences function
    const updatePreferences = async (data: UpdatePreferencesData): Promise<boolean> => {
        setIsLoading(true);
        try {
            const response = await userApi.updatePreferences(data);

            if (response.success && response.data) {
                setUser(response.data);
                message.success("Preferences updated successfully");
                return true;
            } else {
                message.error(response.message || "Failed to update preferences");
                return false;
            }
        } catch (error: unknown) {
            console.error("Update preferences failed:", error);
            const errorMessage = getErrorMessage(error, "Failed to update preferences. Please try again.");
            message.error(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Upload avatar function
    const uploadAvatar = async (file: File): Promise<boolean> => {
        setIsLoading(true);
        try {
            const response = await userApi.uploadAvatar(file);

            if (response.success && response.data) {
                // Refresh user data to get updated avatar URL
                await refreshUser();
                message.success("Avatar uploaded successfully");
                return true;
            } else {
                message.error(response.message || "Failed to upload avatar");
                return false;
            }
        } catch (error: unknown) {
            console.error("Upload avatar failed:", error);
            const errorMessage = getErrorMessage(error, "Failed to upload avatar. Please try again.");
            message.error(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Delete avatar function
    const deleteAvatar = async (): Promise<boolean> => {
        setIsLoading(true);
        try {
            const response = await userApi.deleteAvatar();

            if (response.success) {
                // Refresh user data to remove avatar URL
                await refreshUser();
                message.success("Avatar deleted successfully");
                return true;
            } else {
                message.error(response.message || "Failed to delete avatar");
                return false;
            }
        } catch (error: unknown) {
            console.error("Delete avatar failed:", error);
            const errorMessage = getErrorMessage(error, "Failed to delete avatar. Please try again.");
            message.error(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
                register,
                forgotPassword,
                resetPassword,
                changePassword,
                updateProfile,
                updatePreferences,
                uploadAvatar,
                deleteAvatar,
                refreshUser,
                hasPermission,
                hasRole,
                hasAnyPermission,
                hasAllPermissions,
                getToken,
                setToken,
                clearToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
