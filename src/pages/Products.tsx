import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Input, 
  Space, 
  Tag, 
  Typography, 
  Card, 
  Dropdown, 
  Tooltip, 
  Image, 
  Badge, 
  Pagination 
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  MoreOutlined, 
  FilterOutlined, 
  SortAscendingOutlined, 
  SortDescendingOutlined 
} from '@ant-design/icons';

const { Title } = Typography;

// Define the Product interface
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  rating: number;
  image: string;
  createdAt: string;
}

const Products: React.FC = () => {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  
  // Sample product data
  const productData: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 129.99,
      stock: 45,
      status: 'In Stock',
      rating: 4.5,
      image: 'https://placehold.co/60x60',
      createdAt: '2025-04-15',
    },
    {
      id: 2,
      name: 'Smartphone X',
      category: 'Electronics',
      price: 899.99,
      stock: 12,
      status: 'Low Stock',
      rating: 4.8,
      image: 'https://placehold.co/60x60',
      createdAt: '2025-04-10',
    },
    {
      id: 3,
      name: 'Coffee Maker',
      category: 'Home Appliances',
      price: 79.99,
      stock: 30,
      status: 'In Stock',
      rating: 4.2,
      image: 'https://placehold.co/60x60',
      createdAt: '2025-04-05',
    },
    {
      id: 4,
      name: 'Fitness Tracker',
      category: 'Wearables',
      price: 59.99,
      stock: 0,
      status: 'Out of Stock',
      rating: 3.9,
      image: 'https://placehold.co/60x60',
      createdAt: '2025-03-28',
    },
    {
      id: 5,
      name: 'Bluetooth Speaker',
      category: 'Electronics',
      price: 49.99,
      stock: 25,
      status: 'In Stock',
      rating: 4.0,
      image: 'https://placehold.co/60x60',
      createdAt: '2025-03-20',
    },
    {
      id: 6,
      name: 'Laptop Pro',
      category: 'Electronics',
      price: 1299.99,
      stock: 8,
      status: 'Low Stock',
      rating: 4.7,
      image: 'https://placehold.co/60x60',
      createdAt: '2025-03-15',
    },
    {
      id: 7,
      name: 'Smart Watch',
      category: 'Wearables',
      price: 199.99,
      stock: 18,
      status: 'In Stock',
      rating: 4.3,
      image: 'https://placehold.co/60x60',
      createdAt: '2025-03-10',
    },
    {
      id: 8,
      name: 'Desk Lamp',
      category: 'Home Appliances',
      price: 29.99,
      stock: 40,
      status: 'In Stock',
      rating: 3.8,
      image: 'https://placehold.co/60x60',
      createdAt: '2025-03-05',
    },
    {
      id: 9,
      name: 'Gaming Mouse',
      category: 'Electronics',
      price: 69.99,
      stock: 5,
      status: 'Low Stock',
      rating: 4.6,
      image: 'https://placehold.co/60x60',
      createdAt: '2025-02-28',
    },
    {
      id: 10,
      name: 'Blender',
      category: 'Home Appliances',
      price: 39.99,
      stock: 0,
      status: 'Out of Stock',
      rating: 4.1,
      image: 'https://placehold.co/60x60',
      createdAt: '2025-02-20',
    },
    {
      id: 11,
      name: 'Wireless Keyboard',
      category: 'Electronics',
      price: 49.99,
      stock: 22,
      status: 'In Stock',
      rating: 4.4,
      image: 'https://placehold.co/60x60',
      createdAt: '2025-02-15',
    },
    {
      id: 12,
      name: 'Air Purifier',
      category: 'Home Appliances',
      price: 149.99,
      stock: 7,
      status: 'Low Stock',
      rating: 4.2,
      image: 'https://placehold.co/60x60',
      createdAt: '2025-02-10',
    },
  ];

  // Table columns configuration
  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Product) => (
        <div className="flex items-center">
          <Image 
            src={record.image} 
            alt={text} 
            width={40} 
            height={40} 
            className="mr-3 rounded"
            preview={false}
          />
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-xs text-gray-500">ID: {record.id}</div>
          </div>
        </div>
      ),
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Electronics', value: 'Electronics' },
        { text: 'Home Appliances', value: 'Home Appliances' },
        { text: 'Wearables', value: 'Wearables' },
      ],
      onFilter: (value: string, record: Product) => record.category === value,
      render: (category: string) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <span>${price.toFixed(2)}</span>
      ),
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a: Product, b: Product) => a.stock - b.stock,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'In Stock', value: 'In Stock' },
        { text: 'Low Stock', value: 'Low Stock' },
        { text: 'Out of Stock', value: 'Out of Stock' },
      ],
      onFilter: (value: string, record: Product) => record.status === value,
      render: (status: string) => {
        let color = 'green';
        if (status === 'Low Stock') color = 'orange';
        if (status === 'Out of Stock') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <span>{rating.toFixed(1)}</span>
      ),
      sorter: (a: Product, b: Product) => a.rating - b.rating,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Product) => (
        <Space>
          <Tooltip title="View">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => console.log('View product:', record.id)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => console.log('Edit product:', record.id)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => console.log('Delete product:', record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Calculate pagination
  const paginatedData = productData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle pagination change
  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2}>Products</Title>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => console.log('Add new product')}
        >
          Add Product
        </Button>
      </div>

      <Card bordered={false} className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <Input 
            placeholder="Search products" 
            prefix={<SearchOutlined />} 
            className="w-64"
          />
          <Space>
            <Dropdown 
              menu={{ 
                items: [
                  { key: '1', label: 'All Categories' },
                  { key: '2', label: 'Electronics' },
                  { key: '3', label: 'Home Appliances' },
                  { key: '4', label: 'Wearables' },
                ] 
              }} 
              trigger={['click']}
            >
              <Button icon={<FilterOutlined />}>
                Filter
              </Button>
            </Dropdown>
            <Dropdown 
              menu={{ 
                items: [
                  { key: '1', label: 'Name (A-Z)', icon: <SortAscendingOutlined /> },
                  { key: '2', label: 'Name (Z-A)', icon: <SortDescendingOutlined /> },
                  { key: '3', label: 'Price (Low to High)', icon: <SortAscendingOutlined /> },
                  { key: '4', label: 'Price (High to Low)', icon: <SortDescendingOutlined /> },
                  { key: '5', label: 'Rating (High to Low)', icon: <SortDescendingOutlined /> },
                ] 
              }} 
              trigger={['click']}
            >
              <Button icon={<MoreOutlined />}>
                Sort
              </Button>
            </Dropdown>
          </Space>
        </div>

        <Table 
          columns={columns} 
          dataSource={paginatedData} 
          rowKey="id"
          pagination={false}
          className="mb-4"
        />
        
        <div className="flex justify-between items-center">
          <div className="text-gray-500">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, productData.length)} of {productData.length} products
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={productData.length}
            onChange={handlePaginationChange}
            showSizeChanger
            pageSizeOptions={['5', '10', '20']}
            showTotal={(total) => `Total ${total} items`}
          />
        </div>
      </Card>
    </div>
  );
};

export default Products;
