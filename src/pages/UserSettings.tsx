import React, { useState } from 'react';
import {
    Card,
    Tabs,
    Form,
    Input,
    Button,
    Typography,
    Space,
    Divider,
    List,
    Tag,
    message,
    Switch,
    Alert
} from 'antd';
import {
    UserOutlined,
    SecurityScanOutlined,
    BellOutlined,
    KeyOutlined,
    LogoutOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import UserProfile from '../components/user/UserProfile';
import { useConfirm } from '../hooks/useConfirm';
import type { ChangePasswordData } from '../types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const UserSettings: React.FC = () => {
    const { user, changePassword, logout, isLoading } = useAuth();
    const [passwordForm] = Form.useForm();
    const [activeTab, setActiveTab] = useState('profile');
    const {
        confirmDeleteAccount,
        confirmLogoutAllDevices,
        confirmRevokeSession,
        confirmDisable2FA,
        ConfirmDialog
    } = useConfirm();

    // Handle password change
    const handlePasswordChange = async (values: any) => {
        const passwordData: ChangePasswordData = {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword
        };

        const success = await changePassword(passwordData);
        if (success) {
            passwordForm.resetFields();
        }
    };

    // Handle account deletion
    const handleDeleteAccount = () => {
        confirmDeleteAccount(() => {
            message.info('Tính năng xóa tài khoản sẽ được triển khai sớm.');
        });
    };

    // Handle logout from all devices
    const handleLogoutAllDevices = () => {
        confirmLogoutAllDevices(() => {
            logout();
        });
    };

    // Handle session revocation
    const handleRevokeSession = (_sessionId: string, deviceName: string) => {
        confirmRevokeSession(deviceName, () => {
            message.success(`Đã thu hồi phiên đăng nhập trên ${deviceName}`);
        });
    };

    // Handle disable 2FA
    const handleDisable2FA = () => {
        confirmDisable2FA(() => {
            message.success('Đã tắt xác thực hai yếu tố');
        });
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px' }}>
            <Title level={2}>Account Settings</Title>
            <Paragraph type="secondary">
                Manage your account settings and preferences
            </Paragraph>

            <Tabs activeKey={activeTab} onChange={setActiveTab}>
                {/* Profile Tab */}
                <TabPane
                    tab={
                        <span>
                            <UserOutlined />
                            Profile
                        </span>
                    }
                    key="profile"
                >
                    <UserProfile />
                </TabPane>

                {/* Security Tab */}
                <TabPane
                    tab={
                        <span>
                            <SecurityScanOutlined />
                            Security
                        </span>
                    }
                    key="security"
                >
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        {/* Change Password */}
                        <Card title="Change Password">
                            <Form
                                form={passwordForm}
                                layout="vertical"
                                onFinish={handlePasswordChange}
                                style={{ maxWidth: 400 }}
                            >
                                <Form.Item
                                    label="Current Password"
                                    name="currentPassword"
                                    rules={[
                                        { required: true, message: 'Please enter your current password' }
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    label="New Password"
                                    name="newPassword"
                                    rules={[
                                        { required: true, message: 'Please enter a new password' },
                                        { min: 8, message: 'Password must be at least 8 characters' }
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    label="Confirm New Password"
                                    name="confirmPassword"
                                    dependencies={['newPassword']}
                                    rules={[
                                        { required: true, message: 'Please confirm your new password' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('newPassword') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Passwords do not match'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        icon={<KeyOutlined />}
                                        loading={isLoading}
                                    >
                                        Change Password
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>

                        {/* Two-Factor Authentication */}
                        <Card title="Two-Factor Authentication">
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <Text strong>Two-Factor Authentication</Text>
                                        <br />
                                        <Text type="secondary">
                                            Add an extra layer of security to your account
                                        </Text>
                                    </div>
                                    <Switch
                                        checked={user.profile?.preferences?.twoFactorEnabled}
                                        onChange={(checked) => {
                                            if (!checked && user.profile?.preferences?.twoFactorEnabled) {
                                                handleDisable2FA();
                                            } else {
                                                message.info(`Xác thực hai yếu tố ${checked ? 'đã bật' : 'đã tắt'}`);
                                            }
                                        }}
                                    />
                                </div>
                                {user.profile?.preferences?.twoFactorEnabled && (
                                    <Alert
                                        message="Two-factor authentication is enabled"
                                        description="Your account is protected with two-factor authentication."
                                        type="success"
                                        showIcon
                                    />
                                )}
                            </Space>
                        </Card>

                        {/* Active Sessions */}
                        <Card title="Active Sessions">
                            <List
                                dataSource={[
                                    {
                                        id: '1',
                                        device: 'Chrome on Windows',
                                        location: 'New York, US',
                                        lastActive: '2 phút trước',
                                        current: true
                                    },
                                    {
                                        id: '2',
                                        device: 'Safari on iPhone',
                                        location: 'New York, US',
                                        lastActive: '1 giờ trước',
                                        current: false
                                    }
                                ]}
                                renderItem={(session) => (
                                    <List.Item
                                        actions={[
                                            session.current ? (
                                                <Tag color="green">Hiện tại</Tag>
                                            ) : (
                                                <Button
                                                    type="link"
                                                    danger
                                                    size="small"
                                                    onClick={() => handleRevokeSession(session.id, session.device)}
                                                >
                                                    Thu hồi
                                                </Button>
                                            )
                                        ]}
                                    >
                                        <List.Item.Meta
                                            title={session.device}
                                            description={`${session.location} • Hoạt động lần cuối ${session.lastActive}`}
                                        />
                                    </List.Item>
                                )}
                            />
                            <Divider />
                            <Button
                                type="primary"
                                danger
                                icon={<LogoutOutlined />}
                                onClick={handleLogoutAllDevices}
                            >
                                Đăng xuất tất cả thiết bị
                            </Button>
                        </Card>
                    </Space>
                </TabPane>

                {/* Notifications Tab */}
                <TabPane
                    tab={
                        <span>
                            <BellOutlined />
                            Notifications
                        </span>
                    }
                    key="notifications"
                >
                    <Card title="Notification Preferences">
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <Text strong>Email Notifications</Text>
                                    <br />
                                    <Text type="secondary">Receive notifications via email</Text>
                                </div>
                                <Switch
                                    checked={user.profile?.preferences?.emailNotifications}
                                    onChange={(checked) => {
                                        message.info(`Thông báo email ${checked ? 'đã bật' : 'đã tắt'}`);
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <Text strong>Push Notifications</Text>
                                    <br />
                                    <Text type="secondary">Receive push notifications in your browser</Text>
                                </div>
                                <Switch
                                    checked={user.profile?.preferences?.pushNotifications}
                                    onChange={(checked) => {
                                        message.info(`Thông báo đẩy ${checked ? 'đã bật' : 'đã tắt'}`);
                                    }}
                                />
                            </div>

                            <Divider />

                            <Title level={5}>Email Notification Types</Title>
                            
                            <Space direction="vertical" style={{ width: '100%' }}>
                                {[
                                    { key: 'security', label: 'Cảnh báo bảo mật', description: 'Thông báo đăng nhập, thay đổi mật khẩu' },
                                    { key: 'updates', label: 'Cập nhật sản phẩm', description: 'Tính năng mới và cải tiến' },
                                    { key: 'marketing', label: 'Email marketing', description: 'Nội dung quảng cáo và ưu đãi' },
                                    { key: 'reminders', label: 'Nhắc nhở', description: 'Nhắc nhở công việc và deadline' }
                                ].map(item => (
                                    <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <Text>{item.label}</Text>
                                            <br />
                                            <Text type="secondary" style={{ fontSize: '12px' }}>{item.description}</Text>
                                        </div>
                                        <Switch
                                            defaultChecked={item.key === 'security'}
                                            onChange={(checked) => {
                                                message.info(`${item.label} ${checked ? 'đã bật' : 'đã tắt'}`);
                                            }}
                                        />
                                    </div>
                                ))}
                            </Space>
                        </Space>
                    </Card>
                </TabPane>

                {/* Danger Zone Tab */}
                <TabPane
                    tab={
                        <span>
                            <DeleteOutlined />
                            Danger Zone
                        </span>
                    }
                    key="danger"
                >
                    <Card title="Vùng Nguy Hiểm">
                        <Alert
                            message="Cảnh báo"
                            description="Những hành động này không thể hoàn tác. Vui lòng thực hiện cẩn thận."
                            type="warning"
                            showIcon
                            style={{ marginBottom: 24 }}
                        />

                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <div style={{ padding: '16px', border: '1px solid #ff4d4f', borderRadius: '6px' }}>
                                <Title level={5} style={{ color: '#ff4d4f', marginBottom: 8 }}>
                                    Xóa Tài Khoản
                                </Title>
                                <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                                    Một khi bạn xóa tài khoản, sẽ không thể khôi phục lại. Vui lòng chắc chắn về quyết định này.
                                </Paragraph>
                                <Button
                                    type="primary"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={handleDeleteAccount}
                                >
                                    Xóa Tài Khoản
                                </Button>
                            </div>
                        </Space>
                    </Card>
                </TabPane>
            </Tabs>
            <ConfirmDialog />
        </div>
    );
};

export default UserSettings;
