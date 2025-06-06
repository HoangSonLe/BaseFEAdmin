import React, { useState } from 'react';
import {
    Card,
    Form,
    Input,
    Button,
    Avatar,
    Upload,
    message,
    Row,
    Col,
    Divider,
    Typography,
    Space,
    Switch,
    Select,
    DatePicker,
    Spin
} from 'antd';
import {
    UserOutlined,
    CameraOutlined,
    DeleteOutlined,
    SaveOutlined,
    EditOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useConfirm } from '../../hooks/useConfirm';
import type { UpdateProfileData, UpdatePreferencesData } from '../../types';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface UserProfileProps {
    editable?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ editable = true }) => {
    const { user, updateProfile, updatePreferences, uploadAvatar, deleteAvatar, isLoading } = useAuth();
    const [profileForm] = Form.useForm();
    const [preferencesForm] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [uploading, setUploading] = useState(false);
    const { confirmAction, ConfirmDialog } = useConfirm();

    if (!user) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
                <div style={{ marginTop: 16 }}>Loading user profile...</div>
            </div>
        );
    }

    // Handle profile form submission
    const handleProfileSubmit = async (values: any) => {
        const profileData: UpdateProfileData = {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : undefined,
            bio: values.bio,
            website: values.website,
            address: {
                street: values.street,
                city: values.city,
                state: values.state,
                country: values.country,
                zipCode: values.zipCode,
            },
            socialLinks: {
                linkedin: values.linkedin,
                twitter: values.twitter,
                github: values.github,
                facebook: values.facebook,
            }
        };

        const success = await updateProfile(profileData);
        if (success) {
            setIsEditing(false);
        }
    };

    // Handle preferences form submission
    const handlePreferencesSubmit = async (values: any) => {
        const preferencesData: UpdatePreferencesData = {
            theme: values.theme,
            language: values.language,
            timezone: values.timezone,
            emailNotifications: values.emailNotifications,
            pushNotifications: values.pushNotifications,
        };

        await updatePreferences(preferencesData);
    };

    // Handle avatar upload
    const handleAvatarUpload = async (file: File) => {
        setUploading(true);
        try {
            await uploadAvatar(file);
        } finally {
            setUploading(false);
        }
        return false; // Prevent default upload behavior
    };

    // Handle avatar deletion
    const handleAvatarDelete = () => {
        confirmAction(
            'Xóa ảnh đại diện',
            'Bạn có chắc chắn muốn xóa ảnh đại diện hiện tại không?',
            async () => {
                await deleteAvatar();
            },
            { type: 'warning', okText: 'Xóa', danger: true }
        );
    };

    // Initialize form values
    React.useEffect(() => {
        if (user.profile) {
            profileForm.setFieldsValue({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.profile.phone,
                dateOfBirth: user.profile.dateOfBirth ? dayjs(user.profile.dateOfBirth) : null,
                bio: user.profile.bio,
                website: user.profile.website,
                street: user.profile.address?.street,
                city: user.profile.address?.city,
                state: user.profile.address?.state,
                country: user.profile.address?.country,
                zipCode: user.profile.address?.zipCode,
                linkedin: user.profile.socialLinks?.linkedin,
                twitter: user.profile.socialLinks?.twitter,
                github: user.profile.socialLinks?.github,
                facebook: user.profile.socialLinks?.facebook,
            });
        }

        if (user.profile?.preferences) {
            preferencesForm.setFieldsValue({
                theme: user.profile.preferences.theme,
                language: user.profile.preferences.language,
                timezone: user.profile.preferences.timezone,
                emailNotifications: user.profile.preferences.emailNotifications,
                pushNotifications: user.profile.preferences.pushNotifications,
            });
        }
    }, [user, profileForm, preferencesForm]);

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
            {/* Profile Header */}
            <Card style={{ marginBottom: 24 }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        {user.avatar ? (
                            <Avatar
                                size={120}
                                src={user.avatar}
                                style={{ marginBottom: 16 }}
                            />
                        ) : (
                            <Avatar
                                size={120}
                                icon={<UserOutlined />}
                                style={{ marginBottom: 16 }}
                            >
                                {user.firstName?.[0] || 'A'}
                            </Avatar>
                        )}
                        {editable && (
                            <div style={{ position: 'absolute', bottom: 16, right: -8 }}>
                                <Upload
                                    accept="image/*"
                                    showUploadList={false}
                                    beforeUpload={handleAvatarUpload}
                                    disabled={uploading}
                                >
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<CameraOutlined />}
                                        size="small"
                                        loading={uploading}
                                    />
                                </Upload>
                                {user.avatar && (
                                    <Button
                                        type="primary"
                                        danger
                                        shape="circle"
                                        icon={<DeleteOutlined />}
                                        size="small"
                                        style={{ marginLeft: 8 }}
                                        onClick={handleAvatarDelete}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <Title level={3} style={{ margin: '8px 0' }}>
                        {user.displayName}
                    </Title>
                    <Text type="secondary">{user.email}</Text>
                    <br />
                    <Text type="secondary">Role: {user.role.displayName}</Text>
                </div>

                {editable && (
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            type={isEditing ? 'default' : 'primary'}
                            icon={<EditOutlined />}
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </Button>
                    </div>
                )}
            </Card>

            {/* Profile Information */}
            <Card title="Profile Information" style={{ marginBottom: 24 }}>
                <Form
                    form={profileForm}
                    layout="vertical"
                    onFinish={handleProfileSubmit}
                    disabled={!isEditing}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: true, message: 'Please enter your first name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: true, message: 'Please enter your last name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Email" name="email">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Phone" name="phone">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Date of Birth" name="dateOfBirth">
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Website" name="website">
                                <Input placeholder="https://example.com" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="Bio" name="bio">
                        <TextArea rows={3} placeholder="Tell us about yourself..." />
                    </Form.Item>

                    <Divider orientation="left">Address</Divider>

                    <Form.Item label="Street Address" name="street">
                        <Input />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="City" name="city">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="State/Province" name="state">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="ZIP/Postal Code" name="zipCode">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="Country" name="country">
                        <Input />
                    </Form.Item>

                    <Divider orientation="left">Social Links</Divider>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="LinkedIn" name="linkedin">
                                <Input placeholder="https://linkedin.com/in/username" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Twitter" name="twitter">
                                <Input placeholder="https://twitter.com/username" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="GitHub" name="github">
                                <Input placeholder="https://github.com/username" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Facebook" name="facebook">
                                <Input placeholder="https://facebook.com/username" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {isEditing && (
                        <Form.Item>
                            <Space>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    loading={isLoading}
                                >
                                    Save Changes
                                </Button>
                                <Button onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                            </Space>
                        </Form.Item>
                    )}
                </Form>
            </Card>

            {/* Preferences */}
            <Card title="Preferences">
                <Form
                    form={preferencesForm}
                    layout="vertical"
                    onFinish={handlePreferencesSubmit}
                    onValuesChange={handlePreferencesSubmit} // Auto-save preferences
                >
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Theme" name="theme">
                                <Select>
                                    <Option value="light">Light</Option>
                                    <Option value="dark">Dark</Option>
                                    <Option value="auto">Auto</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Language" name="language">
                                <Select>
                                    <Option value="en">English</Option>
                                    <Option value="es">Spanish</Option>
                                    <Option value="fr">French</Option>
                                    <Option value="de">German</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Timezone" name="timezone">
                                <Select>
                                    <Option value="UTC">UTC</Option>
                                    <Option value="America/New_York">Eastern Time</Option>
                                    <Option value="America/Chicago">Central Time</Option>
                                    <Option value="America/Denver">Mountain Time</Option>
                                    <Option value="America/Los_Angeles">Pacific Time</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left">Notifications</Divider>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Email Notifications" name="emailNotifications" valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Push Notifications" name="pushNotifications" valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
            <ConfirmDialog />
        </div>
    );
};

export default UserProfile;
