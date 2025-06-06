import React from 'react';
import { Result, Button } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import type { PermissionCheck } from '../../types';

interface PermissionGuardProps {
    children: React.ReactNode;
    permission?: PermissionCheck;
    permissions?: PermissionCheck[];
    role?: string;
    roles?: string[];
    requireAll?: boolean; // For multiple permissions, require all or any
    fallback?: React.ReactNode;
    showFallback?: boolean;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
    children,
    permission,
    permissions,
    role,
    roles,
    requireAll = false,
    fallback,
    showFallback = true
}) => {
    const { hasPermission, hasRole, hasAnyPermission, hasAllPermissions } = useAuth();

    // Check single permission
    if (permission && !hasPermission(permission)) {
        return showFallback ? (fallback || <DefaultFallback />) : null;
    }

    // Check multiple permissions
    if (permissions && permissions.length > 0) {
        const hasRequiredPermissions = requireAll 
            ? hasAllPermissions(permissions)
            : hasAnyPermission(permissions);
        
        if (!hasRequiredPermissions) {
            return showFallback ? (fallback || <DefaultFallback />) : null;
        }
    }

    // Check single role
    if (role && !hasRole(role)) {
        return showFallback ? (fallback || <DefaultFallback />) : null;
    }

    // Check multiple roles
    if (roles && roles.length > 0) {
        const hasRequiredRole = roles.some(r => hasRole(r));
        if (!hasRequiredRole) {
            return showFallback ? (fallback || <DefaultFallback />) : null;
        }
    }

    return <>{children}</>;
};

const DefaultFallback: React.FC = () => (
    <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this resource."
        extra={
            <Button type="primary" onClick={() => window.history.back()}>
                Go Back
            </Button>
        }
    />
);

export default PermissionGuard;
