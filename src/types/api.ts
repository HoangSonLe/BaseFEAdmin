// API Response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string[];
    timestamp?: string;
    requestId?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface ApiError {
    code: string;
    message: string;
    field?: string;
    details?: any;
}

export interface ValidationError {
    field: string;
    message: string;
    code: string;
}

// Request types
export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface SearchParams extends PaginationParams {
    search?: string;
    filters?: Record<string, any>;
}

// File upload types
export interface FileUploadResponse {
    id: string;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string;
    thumbnailUrl?: string;
    uploadedAt: string;
}

export interface UploadProgress {
    loaded: number;
    total: number;
    percentage: number;
}

// Notification types
export interface NotificationData {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    data?: any;
}

// Activity log types
export interface ActivityLog {
    id: string;
    userId: string;
    action: string;
    resource: string;
    resourceId?: string;
    details?: any;
    ipAddress: string;
    userAgent: string;
    createdAt: string;
}
