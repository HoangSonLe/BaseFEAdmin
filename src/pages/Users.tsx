import React, { useState } from 'react';
import { Table, Button, Input, Space, Tag, Modal, Form, Select, Typography } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

interface User {
  key: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const Users: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | null>(null);

  // Sample data
  const data: User[] = [
    {
      key: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      key: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Editor',
      status: 'Active',
    },
    {
      key: '3',
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      role: 'Viewer',
      status: 'Inactive',
    },
    {
      key: '4',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'Editor',
      status: 'Active',
    },
    {
      key: '5',
      name: 'Michael Wilson',
      email: 'michael.wilson@example.com',
      role: 'Viewer',
      status: 'Active',
    },
  ];

  const showModal = (record?: User) => {
    setIsModalVisible(true);
    if (record) {
      setEditingKey(record.key);
      form.setFieldsValue(record);
    } else {
      setEditingKey(null);
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Admin', value: 'Admin' },
        { text: 'Editor', value: 'Editor' },
        { text: 'Viewer', value: 'Viewer' },
      ],
      onFilter: (value: string, record: User) => record.role === value,
      render: (role: string) => {
        let color = 'blue';
        if (role === 'Admin') color = 'purple';
        if (role === 'Viewer') color = 'green';
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
      ],
      onFilter: (value: string, record: User) => record.status === value,
      render: (status: string) => {
        const color = status === 'Active' ? 'green' : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => console.log('Delete user:', record.key)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2}>Users</Title>
          <p className="text-gray-500">Manage user accounts</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
        >
          Add User
        </Button>
      </div>

      <div className="mb-4">
        <Input 
          placeholder="Search users" 
          prefix={<SearchOutlined />} 
          className="w-64"
        />
      </div>

      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="key"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingKey ? "Edit User" : "Add New User"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={editingKey ? "Save Changes" : "Add User"}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter an email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="Editor">Editor</Option>
              <Option value="Viewer">Viewer</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
