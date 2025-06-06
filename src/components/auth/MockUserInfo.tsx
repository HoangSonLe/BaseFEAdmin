import React from 'react';
import { Card, Typography, Table, Tag, Space, Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { mockUsers } from '../../data/mockData';

const { Title, Paragraph, Text } = Typography;

const MockUserInfo: React.FC = () => {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        message.success('Copied to clipboard!');
    };

    const columns = [
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role: any) => (
                <Tag color={
                    role.name === 'admin' ? 'red' :
                    role.name === 'manager' ? 'orange' :
                    role.name === 'editor' ? 'blue' :
                    'green'
                }>
                    {role.displayName}
                </Tag>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email: string) => (
                <Space>
                    <Text code>{email}</Text>
                    <Button
                        type="text"
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={() => copyToClipboard(email)}
                    />
                </Space>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'displayName',
            key: 'displayName',
        },
        {
            title: 'Password',
            key: 'password',
            render: () => (
                <Space>
                    <Text code>any password (min 3 chars)</Text>
                    <Button
                        type="text"
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={() => copyToClipboard('123456')}
                    />
                </Space>
            ),
        },
        {
            title: 'Permissions',
            key: 'permissions',
            render: (record: any) => (
                <Text>{record.permissions.length} permissions</Text>
            ),
        },
    ];

    return (
        <Card>
            <Title level={4}>🧪 Mock User Accounts</Title>
            <Paragraph>
                For testing purposes, you can use any of these mock user accounts. 
                The password can be anything with at least 3 characters.
            </Paragraph>
            
            <Table
                dataSource={mockUsers}
                columns={columns}
                rowKey="id"
                pagination={false}
                size="small"
            />

            <div style={{ marginTop: 16 }}>
                <Title level={5}>Quick Test Credentials:</Title>
                <Space direction="vertical">
                    <div>
                        <Text strong>Admin User:</Text>
                        <br />
                        <Text>Email: </Text>
                        <Text code>admin@example.com</Text>
                        <Button
                            type="text"
                            size="small"
                            icon={<CopyOutlined />}
                            onClick={() => copyToClipboard('admin@example.com')}
                        />
                        <br />
                        <Text>Password: </Text>
                        <Text code>123456</Text>
                        <Button
                            type="text"
                            size="small"
                            icon={<CopyOutlined />}
                            onClick={() => copyToClipboard('123456')}
                        />
                    </div>
                    
                    <div>
                        <Text strong>Manager User:</Text>
                        <br />
                        <Text>Email: </Text>
                        <Text code>manager@example.com</Text>
                        <Button
                            type="text"
                            size="small"
                            icon={<CopyOutlined />}
                            onClick={() => copyToClipboard('manager@example.com')}
                        />
                        <br />
                        <Text>Password: </Text>
                        <Text code>123456</Text>
                        <Button
                            type="text"
                            size="small"
                            icon={<CopyOutlined />}
                            onClick={() => copyToClipboard('123456')}
                        />
                    </div>
                </Space>
            </div>

            <div style={{ marginTop: 16, padding: 12, backgroundColor: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 6 }}>
                <Text strong style={{ color: '#52c41a' }}>💡 Tips:</Text>
                <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
                    <li>Click the copy button next to any email to copy it to clipboard</li>
                    <li>Use any password with at least 3 characters (e.g., "123456")</li>
                    <li>Different users have different permission levels</li>
                    <li>Admin user has full access to all features</li>
                    <li>Try logging in with different users to see permission differences</li>
                </ul>
            </div>
        </Card>
    );
};

export default MockUserInfo;
