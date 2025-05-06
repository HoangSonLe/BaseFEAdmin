import React from 'react';
import { Typography, Card, Table, Button, Space, Tag, Input } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Category {
  id: number;
  name: string;
  slug: string;
  productsCount: number;
  status: string;
}

const ProductCategories: React.FC = () => {
  // Sample data
  const categories: Category[] = [
    { id: 1, name: 'Electronics', slug: 'electronics', productsCount: 42, status: 'Active' },
    { id: 2, name: 'Home Appliances', slug: 'home-appliances', productsCount: 28, status: 'Active' },
    { id: 3, name: 'Wearables', slug: 'wearables', productsCount: 15, status: 'Active' },
    { id: 4, name: 'Accessories', slug: 'accessories', productsCount: 36, status: 'Inactive' },
    { id: 5, name: 'Furniture', slug: 'furniture', productsCount: 19, status: 'Active' },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Category, b: Category) => a.name.localeCompare(b.name),
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Products',
      dataIndex: 'productsCount',
      key: 'productsCount',
      sorter: (a: Category, b: Category) => a.productsCount - b.productsCount,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'Active' ? 'green' : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Category) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => console.log('Edit category:', record.id)}
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => console.log('Delete category:', record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2}>Product Categories</Title>
          <p className="text-gray-500">Manage product categories</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => console.log('Add new category')}
        >
          Add Category
        </Button>
      </div>

      <div className="mb-4">
        <Input 
          placeholder="Search categories" 
          prefix={<SearchOutlined />} 
          className="w-64"
        />
      </div>

      <Card bordered={false}>
        <Table 
          columns={columns} 
          dataSource={categories} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default ProductCategories;
