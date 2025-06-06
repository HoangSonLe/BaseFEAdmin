import type {
    User,
    UserRole,
    Permission,
    LoginResponse,
    SessionInfo,
    NotificationData,
    ActivityLog,
    FileUploadResponse
} from '../types';

// Mock Permissions
export const mockPermissions: Permission[] = [
    // User permissions
    { id: '1', name: 'users:create', resource: 'users', action: 'create', description: 'Create new users', module: 'User Management' },
    { id: '2', name: 'users:read', resource: 'users', action: 'read', description: 'View users', module: 'User Management' },
    { id: '3', name: 'users:update', resource: 'users', action: 'update', description: 'Update users', module: 'User Management' },
    { id: '4', name: 'users:delete', resource: 'users', action: 'delete', description: 'Delete users', module: 'User Management' },
    { id: '5', name: 'users:manage', resource: 'users', action: 'manage', description: 'Full user management', module: 'User Management' },

    // Product permissions
    { id: '6', name: 'products:create', resource: 'products', action: 'create', description: 'Create new products', module: 'Product Management' },
    { id: '7', name: 'products:read', resource: 'products', action: 'read', description: 'View products', module: 'Product Management' },
    { id: '8', name: 'products:update', resource: 'products', action: 'update', description: 'Update products', module: 'Product Management' },
    { id: '9', name: 'products:delete', resource: 'products', action: 'delete', description: 'Delete products', module: 'Product Management' },
    { id: '10', name: 'products:manage', resource: 'products', action: 'manage', description: 'Full product management', module: 'Product Management' },

    // Order permissions
    { id: '11', name: 'orders:create', resource: 'orders', action: 'create', description: 'Create new orders', module: 'Order Management' },
    { id: '12', name: 'orders:read', resource: 'orders', action: 'read', description: 'View orders', module: 'Order Management' },
    { id: '13', name: 'orders:update', resource: 'orders', action: 'update', description: 'Update orders', module: 'Order Management' },
    { id: '14', name: 'orders:delete', resource: 'orders', action: 'delete', description: 'Delete orders', module: 'Order Management' },
    { id: '15', name: 'orders:manage', resource: 'orders', action: 'manage', description: 'Full order management', module: 'Order Management' },

    // Settings permissions
    { id: '16', name: 'settings:read', resource: 'settings', action: 'read', description: 'View settings', module: 'Settings' },
    { id: '17', name: 'settings:update', resource: 'settings', action: 'update', description: 'Update settings', module: 'Settings' },
    { id: '18', name: 'settings:manage', resource: 'settings', action: 'manage', description: 'Full settings management', module: 'Settings' },

    // Dashboard permissions
    { id: '19', name: 'dashboard:read', resource: 'dashboard', action: 'read', description: 'Access dashboard', module: 'Dashboard' },

    // Reports permissions
    { id: '20', name: 'reports:read', resource: 'reports', action: 'read', description: 'View reports', module: 'Reports' },
    { id: '21', name: 'reports:manage', resource: 'reports', action: 'manage', description: 'Manage reports', module: 'Reports' },
];

// Mock Roles
export const mockRoles: UserRole[] = [
    {
        id: '1',
        name: 'admin',
        displayName: 'Administrator',
        description: 'Full system access with all permissions',
        permissions: mockPermissions, // Admin has all permissions
        isSystem: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
    },
    {
        id: '2',
        name: 'manager',
        displayName: 'Manager',
        description: 'Management access with most permissions',
        permissions: mockPermissions.filter(p => 
            p.resource !== 'settings' || p.action === 'read'
        ),
        isSystem: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
    },
    {
        id: '3',
        name: 'editor',
        displayName: 'Editor',
        description: 'Can create and edit content',
        permissions: mockPermissions.filter(p => 
            ['create', 'read', 'update'].includes(p.action) && 
            ['products', 'orders', 'dashboard'].includes(p.resource)
        ),
        isSystem: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
    },
    {
        id: '4',
        name: 'viewer',
        displayName: 'Viewer',
        description: 'Read-only access to most content',
        permissions: mockPermissions.filter(p => 
            p.action === 'read' && 
            ['products', 'orders', 'dashboard'].includes(p.resource)
        ),
        isSystem: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
    }
];

// Mock Users
export const mockUsers: User[] = [
    {
        id: '1',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        displayName: 'Admin User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        role: mockRoles[0], // Admin role
        permissions: mockRoles[0].permissions,
        profile: {
            id: '1',
            email: 'admin@example.com',
            firstName: 'Admin',
            lastName: 'User',
            displayName: 'Admin User',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            phone: '+1 (555) 123-4567',
            dateOfBirth: '1990-01-15',
            bio: 'System administrator with full access to all features.',
            website: 'https://example.com',
            address: {
                street: '123 Admin Street',
                city: 'New York',
                state: 'NY',
                country: 'United States',
                zipCode: '10001'
            },
            socialLinks: {
                linkedin: 'https://linkedin.com/in/adminuser',
                twitter: 'https://twitter.com/adminuser',
                github: 'https://github.com/adminuser'
            },
            preferences: {
                theme: 'light',
                language: 'en',
                timezone: 'America/New_York',
                emailNotifications: true,
                pushNotifications: true,
                twoFactorEnabled: true
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-15T10:30:00Z',
            lastLoginAt: '2024-01-15T09:00:00Z'
        },
        isActive: true,
        isEmailVerified: true,
        lastLoginAt: '2024-01-15T09:00:00Z',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
    },
    {
        id: '2',
        email: 'manager@example.com',
        firstName: 'John',
        lastName: 'Manager',
        displayName: 'John Manager',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        role: mockRoles[1], // Manager role
        permissions: mockRoles[1].permissions,
        profile: {
            id: '2',
            email: 'manager@example.com',
            firstName: 'John',
            lastName: 'Manager',
            displayName: 'John Manager',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            phone: '+1 (555) 234-5678',
            dateOfBirth: '1985-05-20',
            bio: 'Team manager responsible for product and order management.',
            preferences: {
                theme: 'dark',
                language: 'en',
                timezone: 'America/Chicago',
                emailNotifications: true,
                pushNotifications: false,
                twoFactorEnabled: false
            },
            createdAt: '2024-01-02T00:00:00Z',
            updatedAt: '2024-01-14T15:20:00Z',
            lastLoginAt: '2024-01-14T14:30:00Z'
        },
        isActive: true,
        isEmailVerified: true,
        lastLoginAt: '2024-01-14T14:30:00Z',
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-14T15:20:00Z'
    },
    {
        id: '3',
        email: 'editor@example.com',
        firstName: 'Jane',
        lastName: 'Editor',
        displayName: 'Jane Editor',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        role: mockRoles[2], // Editor role
        permissions: mockRoles[2].permissions,
        profile: {
            id: '3',
            email: 'editor@example.com',
            firstName: 'Jane',
            lastName: 'Editor',
            displayName: 'Jane Editor',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            phone: '+1 (555) 345-6789',
            dateOfBirth: '1992-08-10',
            bio: 'Content editor with create and update permissions.',
            preferences: {
                theme: 'auto',
                language: 'en',
                timezone: 'America/Los_Angeles',
                emailNotifications: true,
                pushNotifications: true,
                twoFactorEnabled: false
            },
            createdAt: '2024-01-03T00:00:00Z',
            updatedAt: '2024-01-13T11:45:00Z',
            lastLoginAt: '2024-01-13T08:15:00Z'
        },
        isActive: true,
        isEmailVerified: true,
        lastLoginAt: '2024-01-13T08:15:00Z',
        createdAt: '2024-01-03T00:00:00Z',
        updatedAt: '2024-01-13T11:45:00Z'
    },
    {
        id: '4',
        email: 'viewer@example.com',
        firstName: 'Bob',
        lastName: 'Viewer',
        displayName: 'Bob Viewer',
        role: mockRoles[3], // Viewer role
        permissions: mockRoles[3].permissions,
        profile: {
            id: '4',
            email: 'viewer@example.com',
            firstName: 'Bob',
            lastName: 'Viewer',
            displayName: 'Bob Viewer',
            phone: '+1 (555) 456-7890',
            preferences: {
                theme: 'light',
                language: 'en',
                timezone: 'UTC',
                emailNotifications: false,
                pushNotifications: false,
                twoFactorEnabled: false
            },
            createdAt: '2024-01-04T00:00:00Z',
            updatedAt: '2024-01-12T16:20:00Z',
            lastLoginAt: '2024-01-12T13:45:00Z'
        },
        isActive: true,
        isEmailVerified: true,
        lastLoginAt: '2024-01-12T13:45:00Z',
        createdAt: '2024-01-04T00:00:00Z',
        updatedAt: '2024-01-12T16:20:00Z'
    }
];

// Mock Sessions
export const mockSessions: SessionInfo[] = [
    {
        id: '1',
        userId: '1',
        deviceInfo: 'Chrome 120.0 on Windows 11',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        isActive: true,
        lastActivity: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
        id: '2',
        userId: '1',
        deviceInfo: 'Safari 17.0 on iPhone 15',
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
        isActive: true,
        lastActivity: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
    }
];

// Mock Notifications
export const mockNotifications: NotificationData[] = [
    {
        id: '1',
        type: 'info',
        title: 'Welcome to the system',
        message: 'Your account has been successfully created.',
        read: false,
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        data: { userId: '1' }
    },
    {
        id: '2',
        type: 'success',
        title: 'Profile updated',
        message: 'Your profile information has been successfully updated.',
        read: true,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        data: { userId: '1' }
    },
    {
        id: '3',
        type: 'warning',
        title: 'Password expires soon',
        message: 'Your password will expire in 7 days. Please update it.',
        read: false,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        data: { userId: '1' }
    }
];

// Mock Activity Log
export const mockActivityLog: ActivityLog[] = [
    {
        id: '1',
        userId: '1',
        action: 'login',
        resource: 'auth',
        details: { method: 'email_password' },
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString()
    },
    {
        id: '2',
        userId: '1',
        action: 'update',
        resource: 'profile',
        resourceId: '1',
        details: { fields: ['firstName', 'lastName'] },
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '3',
        userId: '1',
        action: 'create',
        resource: 'product',
        resourceId: 'prod_123',
        details: { name: 'New Product' },
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    }
];

// Helper function to find user by email
export const findUserByEmail = (email: string): User | undefined => {
    return mockUsers.find(user => user.email === email);
};

// Helper function to find user by id
export const findUserById = (id: string): User | undefined => {
    return mockUsers.find(user => user.id === id);
};

// Helper function to create mock login response
export const createMockLoginResponse = (user: User): LoginResponse => {
    return {
        user,
        accessToken: `mock_access_token_${Date.now()}_${user.email}`,
        refreshToken: `mock_refresh_token_${user.id}_${Date.now()}`,
        expiresIn: 3600 // 1 hour
    };
};

// Helper function to create mock file upload response
export const createMockFileUploadResponse = (filename: string): FileUploadResponse => {
    return {
        id: `file_${Date.now()}`,
        filename: `${Date.now()}_${filename}`,
        originalName: filename,
        mimeType: 'image/jpeg',
        size: Math.floor(Math.random() * 1000000) + 100000, // Random size between 100KB and 1MB
        url: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=150&h=150&fit=crop&crop=face`,
        thumbnailUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=50&h=50&fit=crop&crop=face`,
        uploadedAt: new Date().toISOString()
    };
};
