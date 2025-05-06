import React from 'react';
import { Typography, Card, Table, Button, Space, Tag, Input, Tooltip } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Role {
  id: number;
  name: string;
  description: string;
  usersCount: number;
  permissions: string[];
  isSystem: boolean;
}

const UserRoles: React.FC = () => {
  // Sample data
  const roles: Role[] = [
    { 
      id: 1, 
      name: 'Administrator', 
      description: 'Full access to all features', 
      usersCount: 3, 
      permissions: ['all'], 
      isSystem: true 
    },
    { 
      id: 2, 
      name: 'Editor', 
      description: 'Can edit content but cannot manage users or settings', 
      usersCount: 8, 
      permissions: ['read', 'write', 'update'], 
      isSystem: true 
    },
    { 
      id: 3, 
      name: 'Viewer', 
      description: 'Read-only access to content', 
      usersCount: 15, 
      permissions: ['read'], 
      isSystem: true 
    },
    { 
      id: 4, 
      name: 'Product Manager', 
      description: 'Can manage products and inventory', 
      usersCount: 5, 
      permissions: ['read', 'write', 'update', 'delete:products'], 
      isSystem: false 
    },
    { 
      id: 5, 
      name: 'Customer Support', 
      description: 'Can view orders and customer information', 
      usersCount: 7, 
      permissions: ['read:users', 'read:orders', 'update:orders'], 
      isSystem: false 
    },
  ];

  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Role, b: Role) => a.name.localeCompare(b.name),
      render: (text: string, record: Role) => (
        <div>
          <div className="font-medium">{text}</div>
          {record.isSystem && (
            <Tag color="blue" className="mt-1">System</Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Users',
      dataIndex: 'usersCount',
      key: 'usersCount',
      sorter: (a: Role, b: Role) => a.usersCount - b.usersCount,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Role) => (
        <Space>
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => console.log('Edit role:', record.id)}
              disabled={record.isSystem}
            />
          </Tooltip>
          <Tooltip title={record.isSystem ? "System roles cannot be deleted" : "Delete"}>
            <Button 
              type="text" 
              danger 
              icon={record.isSystem ? <LockOutlined /> : <DeleteOutlined />}
              onClick={() => console.log('Delete role:', record.id)}
              disabled={record.isSystem}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2}>User Roles</Title>
          <p className="text-gray-500">Manage user roles and permissions</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => console.log('Add new role')}
        >
          Add Role
        </Button>
      </div>

      <div className="mb-4">
        <Input 
          placeholder="Search roles" 
          prefix={<SearchOutlined />} 
          className="w-64"
        />
      </div>

      <Card bordered={false}>
        <Table 
          columns={columns} 
          dataSource={roles} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default UserRoles;
