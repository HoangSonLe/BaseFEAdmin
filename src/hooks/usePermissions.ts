import { useAuth } from '../contexts/AuthContext';
import type { PermissionCheck, PermissionAction, PermissionResource } from '../types';

export const usePermissions = () => {
    const { user, hasPermission, hasRole, hasAnyPermission, hasAllPermissions } = useAuth();

    // Helper function to create permission checks
    const createPermissionCheck = (resource: PermissionResource, action: PermissionAction): PermissionCheck => ({
        resource,
        action
    });

    // Common permission checks
    const can = {
        // User management
        manageUsers: () => hasPermission(createPermissionCheck('users', 'manage')),
        createUsers: () => hasPermission(createPermissionCheck('users', 'create')),
        readUsers: () => hasPermission(createPermissionCheck('users', 'read')),
        updateUsers: () => hasPermission(createPermissionCheck('users', 'update')),
        deleteUsers: () => hasPermission(createPermissionCheck('users', 'delete')),

        // Product management
        manageProducts: () => hasPermission(createPermissionCheck('products', 'manage')),
        createProducts: () => hasPermission(createPermissionCheck('products', 'create')),
        readProducts: () => hasPermission(createPermissionCheck('products', 'read')),
        updateProducts: () => hasPermission(createPermissionCheck('products', 'update')),
        deleteProducts: () => hasPermission(createPermissionCheck('products', 'delete')),

        // Order management
        manageOrders: () => hasPermission(createPermissionCheck('orders', 'manage')),
        createOrders: () => hasPermission(createPermissionCheck('orders', 'create')),
        readOrders: () => hasPermission(createPermissionCheck('orders', 'read')),
        updateOrders: () => hasPermission(createPermissionCheck('orders', 'update')),
        deleteOrders: () => hasPermission(createPermissionCheck('orders', 'delete')),

        // Settings management
        manageSettings: () => hasPermission(createPermissionCheck('settings', 'manage')),
        readSettings: () => hasPermission(createPermissionCheck('settings', 'read')),
        updateSettings: () => hasPermission(createPermissionCheck('settings', 'update')),

        // Dashboard access
        accessDashboard: () => hasPermission(createPermissionCheck('dashboard', 'read')),

        // Reports access
        accessReports: () => hasPermission(createPermissionCheck('reports', 'read')),
        manageReports: () => hasPermission(createPermissionCheck('reports', 'manage')),
    };

    // Role checks
    const is = {
        admin: () => hasRole('admin'),
        editor: () => hasRole('editor'),
        viewer: () => hasRole('viewer'),
        manager: () => hasRole('manager'),
        moderator: () => hasRole('moderator'),
    };

    // Combined checks
    const canAny = (permissions: PermissionCheck[]) => hasAnyPermission(permissions);
    const canAll = (permissions: PermissionCheck[]) => hasAllPermissions(permissions);

    // Check if user has any admin-level permissions
    const isAdminLevel = () => {
        return is.admin() || can.manageUsers() || can.manageSettings();
    };

    // Check if user can access admin features
    const canAccessAdmin = () => {
        return isAdminLevel() || is.manager();
    };

    // Check if user can modify content
    const canModifyContent = () => {
        return can.createProducts() || can.updateProducts() || can.createOrders() || can.updateOrders();
    };

    // Check if user is read-only
    const isReadOnly = () => {
        return is.viewer() && !canModifyContent();
    };

    return {
        user,
        can,
        is,
        canAny,
        canAll,
        isAdminLevel,
        canAccessAdmin,
        canModifyContent,
        isReadOnly,
        hasPermission,
        hasRole,
        hasAnyPermission,
        hasAllPermissions,
        createPermissionCheck,
    };
};

export default usePermissions;
