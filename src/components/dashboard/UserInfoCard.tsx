import React from 'react';
import { Card, Avatar, Typography, Space, Tag, Descriptions, Button } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePermissions } from '../../hooks/usePermissions';

const { Title, Text } = Typography;

const UserInfoCard: React.FC = () => {
    const { user, logout } = useAuth();
    const { can, is } = usePermissions();

    if (!user) {
        return null;
    }

    return (
        <Card
            title="Current User Information"
            extra={
                <Space>
                    <Link to="/user-settings">
                        <Button type="text" icon={<SettingOutlined />}>
                            Settings
                        </Button>
                    </Link>
                    <Button 
                        type="text" 
                        danger 
                        icon={<LogoutOutlined />}
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </Space>
            }
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    {user.avatar ? (
                        <Avatar
                            size={64}
                            src={user.avatar}
                        />
                    ) : (
                        <Avatar
                            size={64}
                            icon={<UserOutlined />}
                        >
                            {user.firstName?.[0] || 'A'}
                        </Avatar>
                    )}
                    <div>
                        <Title level={4} style={{ margin: 0 }}>
                            {user.displayName}
                        </Title>
                        <Text type="secondary">{user.email}</Text>
                        <br />
                        <Tag color={
                            user.role.name === 'admin' ? 'red' :
                            user.role.name === 'manager' ? 'orange' :
                            user.role.name === 'editor' ? 'blue' :
                            'green'
                        }>
                            {user.role.displayName}
                        </Tag>
                    </div>
                </div>

                <Descriptions column={1} size="small">
                    <Descriptions.Item label="User ID">
                        <Text code>{user.id}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Email Verified">
                        <Tag color={user.isEmailVerified ? 'green' : 'orange'}>
                            {user.isEmailVerified ? 'Verified' : 'Not Verified'}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Account Status">
                        <Tag color={user.isActive ? 'green' : 'red'}>
                            {user.isActive ? 'Active' : 'Inactive'}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Login">
                        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Member Since">
                        {new Date(user.createdAt).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Permissions">
                        {user.permissions.length}
                    </Descriptions.Item>
                </Descriptions>

                <div>
                    <Title level={5}>Quick Permission Check:</Title>
                    <Space wrap>
                        <Tag color={can.manageUsers() ? 'green' : 'red'}>
                            {can.manageUsers() ? '✓' : '✗'} Manage Users
                        </Tag>
                        <Tag color={can.manageProducts() ? 'green' : 'red'}>
                            {can.manageProducts() ? '✓' : '✗'} Manage Products
                        </Tag>
                        <Tag color={can.manageSettings() ? 'green' : 'red'}>
                            {can.manageSettings() ? '✓' : '✗'} Manage Settings
                        </Tag>
                        <Tag color={can.accessReports() ? 'green' : 'red'}>
                            {can.accessReports() ? '✓' : '✗'} Access Reports
                        </Tag>
                    </Space>
                </div>

                <div>
                    <Title level={5}>Role Checks:</Title>
                    <Space wrap>
                        <Tag color={is.admin() ? 'green' : 'default'}>
                            {is.admin() ? '✓' : '✗'} Admin
                        </Tag>
                        <Tag color={is.manager() ? 'green' : 'default'}>
                            {is.manager() ? '✓' : '✗'} Manager
                        </Tag>
                        <Tag color={is.editor() ? 'green' : 'default'}>
                            {is.editor() ? '✓' : '✗'} Editor
                        </Tag>
                        <Tag color={is.viewer() ? 'green' : 'default'}>
                            {is.viewer() ? '✓' : '✗'} Viewer
                        </Tag>
                    </Space>
                </div>

                {user.profile?.preferences && (
                    <div>
                        <Title level={5}>Preferences:</Title>
                        <Descriptions column={2} size="small">
                            <Descriptions.Item label="Theme">
                                <Tag>{user.profile.preferences.theme}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Language">
                                <Tag>{user.profile.preferences.language}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Timezone">
                                <Tag>{user.profile.preferences.timezone}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Email Notifications">
                                <Tag color={user.profile.preferences.emailNotifications ? 'green' : 'red'}>
                                    {user.profile.preferences.emailNotifications ? 'Enabled' : 'Disabled'}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Push Notifications">
                                <Tag color={user.profile.preferences.pushNotifications ? 'green' : 'red'}>
                                    {user.profile.preferences.pushNotifications ? 'Enabled' : 'Disabled'}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="2FA">
                                <Tag color={user.profile.preferences.twoFactorEnabled ? 'green' : 'orange'}>
                                    {user.profile.preferences.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                )}
            </Space>
        </Card>
    );
};

export default UserInfoCard;
