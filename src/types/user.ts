// User-related types
export interface UserProfile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    avatar?: string;
    phone?: string;
    dateOfBirth?: string;
    address?: UserAddress;
    bio?: string;
    website?: string;
    socialLinks?: UserSocialLinks;
    preferences: UserPreferences;
    createdAt: string;
    updatedAt: string;
    lastLoginAt?: string;
}

export interface UserAddress {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
}

export interface UserSocialLinks {
    linkedin?: string;
    twitter?: string;
    github?: string;
    facebook?: string;
}

export interface UserPreferences {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    timezone: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    twoFactorEnabled: boolean;
}

export interface UserRole {
    id: string;
    name: string;
    displayName: string;
    description: string;
    permissions: Permission[];
    isSystem: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Permission {
    id: string;
    name: string;
    resource: string;
    action: string;
    description: string;
    module: string;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    avatar?: string;
    role: UserRole;
    permissions: Permission[];
    profile: UserProfile;
    isActive: boolean;
    isEmailVerified: boolean;
    lastLoginAt?: string;
    createdAt: string;
    updatedAt: string;
}

// Authentication types
export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    acceptTerms: boolean;
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResetPasswordData {
    token: string;
    password: string;
    confirmPassword: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface UpdateProfileData {
    firstName?: string;
    lastName?: string;
    phone?: string;
    dateOfBirth?: string;
    bio?: string;
    website?: string;
    address?: Partial<UserAddress>;
    socialLinks?: Partial<UserSocialLinks>;
}

export interface UpdatePreferencesData {
    theme?: 'light' | 'dark' | 'auto';
    language?: string;
    timezone?: string;
    emailNotifications?: boolean;
    pushNotifications?: boolean;
}

// Session and Token types
export interface SessionInfo {
    id: string;
    userId: string;
    deviceInfo: string;
    ipAddress: string;
    userAgent: string;
    isActive: boolean;
    lastActivity: string;
    createdAt: string;
}

export interface TokenPayload {
    sub: string; // user id
    email: string;
    role: string;
    permissions: string[];
    iat: number;
    exp: number;
}

// Permission checking types
export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'manage';
export type PermissionResource = 'users' | 'products' | 'orders' | 'settings' | 'dashboard' | 'reports';

export interface PermissionCheck {
    resource: PermissionResource;
    action: PermissionAction;
}
