// Export all types
export * from './user';
export * from './api';

// Common utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Theme types
export type ThemeMode = 'light' | 'dark' | 'auto';

// Status types
export type Status = 'active' | 'inactive' | 'pending' | 'suspended';

// Common component props
export interface BaseComponentProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

// Form types
export interface FormFieldError {
    field: string;
    message: string;
}

export interface FormState<T> {
    values: T;
    errors: FormFieldError[];
    isSubmitting: boolean;
    isValid: boolean;
    touched: Record<keyof T, boolean>;
}

// Table types
export interface TableColumn<T = any> {
    key: string;
    title: string;
    dataIndex?: keyof T;
    render?: (value: any, record: T, index: number) => React.ReactNode;
    sorter?: boolean | ((a: T, b: T) => number);
    width?: number | string;
    align?: 'left' | 'center' | 'right';
    fixed?: 'left' | 'right';
    ellipsis?: boolean;
}

export interface TableProps<T = any> {
    columns: TableColumn<T>[];
    dataSource: T[];
    loading?: boolean;
    pagination?: any;
    rowKey?: string | ((record: T) => string);
    onRow?: (record: T, index?: number) => any;
    scroll?: { x?: number | string; y?: number | string };
}

// Modal types
export interface ModalProps {
    open: boolean;
    title?: string;
    onOk?: () => void;
    onCancel?: () => void;
    confirmLoading?: boolean;
    width?: number | string;
    centered?: boolean;
    maskClosable?: boolean;
    children?: React.ReactNode;
}

// Breadcrumb types
export interface BreadcrumbItem {
    title: string;
    path?: string;
    icon?: React.ReactNode;
}

// Menu types
export interface MenuItem {
    key: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    path?: string;
    children?: MenuItem[];
    disabled?: boolean;
    className?: string;
}

// Filter types
export interface FilterOption {
    label: string;
    value: any;
    disabled?: boolean;
}

export interface DateRange {
    start: string;
    end: string;
}

// Chart types
export interface ChartData {
    name: string;
    value: number;
    color?: string;
}

export interface ChartConfig {
    type: 'line' | 'bar' | 'pie' | 'area';
    data: ChartData[];
    xAxis?: string;
    yAxis?: string;
    colors?: string[];
}

// Dashboard types
export interface DashboardStat {
    title: string;
    value: number | string;
    change?: number;
    changeType?: 'increase' | 'decrease';
    icon?: React.ReactNode;
    color?: string;
}

export interface DashboardCard {
    id: string;
    title: string;
    type: 'stat' | 'chart' | 'table' | 'custom';
    data: any;
    span?: number;
    height?: number;
}
