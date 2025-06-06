import React from 'react';
import { Modal, Button, Typography, Space } from 'antd';
import { ExclamationCircleOutlined, DeleteOutlined, WarningOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    content?: React.ReactNode;
    type?: 'delete' | 'warning' | 'info';
    okText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
    danger?: boolean;
    icon?: React.ReactNode;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    title,
    content,
    type = 'warning',
    okText,
    cancelText = 'Hủy',
    onConfirm,
    onCancel,
    loading = false,
    danger = false,
    icon
}) => {
    const getDefaultProps = () => {
        switch (type) {
            case 'delete':
                return {
                    title: title || 'Xác nhận xóa',
                    okText: okText || 'Xóa',
                    danger: true,
                    icon: icon || <DeleteOutlined style={{ color: '#ff4d4f' }} />
                };
            case 'warning':
                return {
                    title: title || 'Xác nhận',
                    okText: okText || 'Đồng ý',
                    danger: danger,
                    icon: icon || <WarningOutlined style={{ color: '#faad14' }} />
                };
            case 'info':
                return {
                    title: title || 'Thông báo',
                    okText: okText || 'Đồng ý',
                    danger: false,
                    icon: icon || <ExclamationCircleOutlined style={{ color: '#1677ff' }} />
                };
            default:
                return {
                    title: title || 'Xác nhận',
                    okText: okText || 'Đồng ý',
                    danger: danger,
                    icon: icon || <ExclamationCircleOutlined style={{ color: '#1677ff' }} />
                };
        }
    };

    const defaultProps = getDefaultProps();

    return (
        <Modal
            open={open}
            title={null}
            footer={null}
            onCancel={onCancel}
            centered
            width={400}
            maskClosable={false}
            destroyOnClose
        >
            <div style={{ padding: '20px 0' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                        <div style={{ fontSize: 24, marginTop: 4 }}>
                            {defaultProps.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                            <Title level={4} style={{ margin: '0 0 8px 0' }}>
                                {defaultProps.title}
                            </Title>
                            <div style={{ color: 'var(--text-secondary, #666)' }}>
                                {content}
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <Button onClick={onCancel} disabled={loading}>
                            {cancelText}
                        </Button>
                        <Button
                            type="primary"
                            danger={defaultProps.danger}
                            onClick={onConfirm}
                            loading={loading}
                        >
                            {defaultProps.okText}
                        </Button>
                    </div>
                </Space>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;
