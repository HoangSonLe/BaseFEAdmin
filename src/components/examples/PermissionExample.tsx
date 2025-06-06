import React from 'react';
import { Card, Button, Space, Typography, Divider, Alert } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import PermissionGuard from '../auth/PermissionGuard';
import { usePermissions } from '../../hooks/usePermissions';

const { Title, Paragraph, Text } = Typography;

const PermissionExample: React.FC = () => {
    const { can, is, user } = usePermissions();

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
            <Title level={2}>Permission System Example</Title>
            <Paragraph>
                This page demonstrates how the permission system works with different user roles and permissions.
            </Paragraph>

            {/* Current User Info */}
            <Card title="Current User Information" style={{ marginBottom: 24 }}>
                <Space direction="vertical">
                    <Text><strong>Name:</strong> {user?.displayName || 'Unknown'}</Text>
                    <Text><strong>Email:</strong> {user?.email || 'Unknown'}</Text>
                    <Text><strong>Role:</strong> {user?.role?.displayName || 'Unknown'}</Text>
                    <Text><strong>Permissions:</strong></Text>
                    <div style={{ marginLeft: 16 }}>
                        {user?.permissions?.map(permission => (
                            <div key={permission.id}>
                                <Text code>{permission.resource}:{permission.action}</Text>
                            </div>
                        )) || <Text type="secondary">No permissions found</Text>}
                    </div>
                </Space>
            </Card>

            {/* Role-based Access Control */}
            <Card title="Role-based Access Control" style={{ marginBottom: 24 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <PermissionGuard role="admin">
                        <Alert
                            message="Admin Only Content"
                            description="This content is only visible to administrators."
                            type="success"
                            showIcon
                        />
                    </PermissionGuard>

                    <PermissionGuard role="editor">
                        <Alert
                            message="Editor Content"
                            description="This content is visible to editors."
                            type="info"
                            showIcon
                        />
                    </PermissionGuard>

                    <PermissionGuard role="viewer">
                        <Alert
                            message="Viewer Content"
                            description="This content is visible to viewers."
                            type="warning"
                            showIcon
                        />
                    </PermissionGuard>

                    <PermissionGuard roles={['admin', 'manager']}>
                        <Alert
                            message="Management Content"
                            description="This content is visible to admins and managers."
                            type="success"
                            showIcon
                        />
                    </PermissionGuard>
                </Space>
            </Card>

            {/* Permission-based Access Control */}
            <Card title="Permission-based Access Control" style={{ marginBottom: 24 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                        <Title level={4}>User Management Actions</Title>
                        <Space wrap>
                            <PermissionGuard permission={{ resource: 'users', action: 'create' }}>
                                <Button type="primary" icon={<PlusOutlined />}>
                                    Create User
                                </Button>
                            </PermissionGuard>

                            <PermissionGuard permission={{ resource: 'users', action: 'update' }}>
                                <Button icon={<EditOutlined />}>
                                    Edit User
                                </Button>
                            </PermissionGuard>

                            <PermissionGuard permission={{ resource: 'users', action: 'delete' }}>
                                <Button danger icon={<DeleteOutlined />}>
                                    Delete User
                                </Button>
                            </PermissionGuard>

                            <PermissionGuard permission={{ resource: 'users', action: 'manage' }}>
                                <Button icon={<SettingOutlined />}>
                                    Manage Users
                                </Button>
                            </PermissionGuard>
                        </Space>
                    </div>

                    <Divider />

                    <div>
                        <Title level={4}>Product Management Actions</Title>
                        <Space wrap>
                            <PermissionGuard permission={{ resource: 'products', action: 'create' }}>
                                <Button type="primary" icon={<PlusOutlined />}>
                                    Create Product
                                </Button>
                            </PermissionGuard>

                            <PermissionGuard permission={{ resource: 'products', action: 'update' }}>
                                <Button icon={<EditOutlined />}>
                                    Edit Product
                                </Button>
                            </PermissionGuard>

                            <PermissionGuard permission={{ resource: 'products', action: 'delete' }}>
                                <Button danger icon={<DeleteOutlined />}>
                                    Delete Product
                                </Button>
                            </PermissionGuard>
                        </Space>
                    </div>

                    <Divider />

                    <div>
                        <Title level={4}>Settings Access</Title>
                        <Space wrap>
                            <PermissionGuard permission={{ resource: 'settings', action: 'read' }}>
                                <Button>View Settings</Button>
                            </PermissionGuard>

                            <PermissionGuard permission={{ resource: 'settings', action: 'update' }}>
                                <Button type="primary">Modify Settings</Button>
                            </PermissionGuard>

                            <PermissionGuard permission={{ resource: 'settings', action: 'manage' }}>
                                <Button type="primary" icon={<SettingOutlined />}>
                                    Manage Settings
                                </Button>
                            </PermissionGuard>
                        </Space>
                    </div>
                </Space>
            </Card>

            {/* Multiple Permissions */}
            <Card title="Multiple Permission Requirements" style={{ marginBottom: 24 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                        <Title level={4}>Require ANY of these permissions</Title>
                        <PermissionGuard
                            permissions={[
                                { resource: 'users', action: 'manage' },
                                { resource: 'products', action: 'manage' }
                            ]}
                            requireAll={false}
                        >
                            <Alert
                                message="Management Access"
                                description="You can manage either users or products (or both)."
                                type="success"
                                showIcon
                            />
                        </PermissionGuard>
                    </div>

                    <div>
                        <Title level={4}>Require ALL of these permissions</Title>
                        <PermissionGuard
                            permissions={[
                                { resource: 'users', action: 'read' },
                                { resource: 'products', action: 'read' }
                            ]}
                            requireAll={true}
                        >
                            <Alert
                                message="Full Read Access"
                                description="You have read access to both users and products."
                                type="info"
                                showIcon
                            />
                        </PermissionGuard>
                    </div>
                </Space>
            </Card>

            {/* Permission Check Results */}
            <Card title="Permission Check Results">
                <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                        <Title level={4}>Role Checks</Title>
                        <Space direction="vertical">
                            <Text>Is Admin: <Text code>{is.admin() ? 'Yes' : 'No'}</Text></Text>
                            <Text>Is Editor: <Text code>{is.editor() ? 'Yes' : 'No'}</Text></Text>
                            <Text>Is Viewer: <Text code>{is.viewer() ? 'Yes' : 'No'}</Text></Text>
                            <Text>Is Manager: <Text code>{is.manager() ? 'Yes' : 'No'}</Text></Text>
                        </Space>
                    </div>

                    <Divider />

                    <div>
                        <Title level={4}>Permission Checks</Title>
                        <Space direction="vertical">
                            <Text>Can Manage Users: <Text code>{can.manageUsers() ? 'Yes' : 'No'}</Text></Text>
                            <Text>Can Create Users: <Text code>{can.createUsers() ? 'Yes' : 'No'}</Text></Text>
                            <Text>Can Read Users: <Text code>{can.readUsers() ? 'Yes' : 'No'}</Text></Text>
                            <Text>Can Update Users: <Text code>{can.updateUsers() ? 'Yes' : 'No'}</Text></Text>
                            <Text>Can Delete Users: <Text code>{can.deleteUsers() ? 'Yes' : 'No'}</Text></Text>
                        </Space>
                    </div>

                    <Divider />

                    <div>
                        <Title level={4}>Product Permissions</Title>
                        <Space direction="vertical">
                            <Text>Can Manage Products: <Text code>{can.manageProducts() ? 'Yes' : 'No'}</Text></Text>
                            <Text>Can Create Products: <Text code>{can.createProducts() ? 'Yes' : 'No'}</Text></Text>
                            <Text>Can Read Products: <Text code>{can.readProducts() ? 'Yes' : 'No'}</Text></Text>
                            <Text>Can Update Products: <Text code>{can.updateProducts() ? 'Yes' : 'No'}</Text></Text>
                            <Text>Can Delete Products: <Text code>{can.deleteProducts() ? 'Yes' : 'No'}</Text></Text>
                        </Space>
                    </div>

                    <Divider />

                    <div>
                        <Title level={4}>Other Permissions</Title>
                        <Space direction="vertical">
                            <Text>Can Access Dashboard: <Text code>{can.accessDashboard() ? 'Yes' : 'No'}</Text></Text>
                            <Text>Can Access Reports: <Text code>{can.accessReports() ? 'Yes' : 'No'}</Text></Text>
                            <Text>Can Manage Settings: <Text code>{can.manageSettings() ? 'Yes' : 'No'}</Text></Text>
                        </Space>
                    </div>
                </Space>
            </Card>
        </div>
    );
};

export default PermissionExample;
