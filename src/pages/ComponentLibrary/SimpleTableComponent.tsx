import React from "react";
import { Tag, Space, Button, Tooltip, Typography, Card, Divider, Image } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { CommonTable } from "../../components/common";
import type { ColumnType } from "antd/es/table";

const { Title, Paragraph } = Typography;

// Define the Product interface
interface Product extends Record<string, unknown> {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: "In Stock" | "Low Stock" | "Out of Stock";
    rating: number;
    image: string;
    createdAt: string;
}

const SimpleTableComponent: React.FC = () => {
    // Sample product data
    const productData: Product[] = [
        {
            id: 1,
            name: "Wireless Headphones",
            category: "Electronics",
            price: 129.99,
            stock: 45,
            status: "In Stock",
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&crop=center",
            createdAt: "2025-04-15",
        },
        {
            id: 2,
            name: "Smartphone X",
            category: "Electronics",
            price: 899.99,
            stock: 12,
            status: "Low Stock",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&crop=center",
            createdAt: "2025-04-10",
        },
        {
            id: 3,
            name: "Coffee Maker",
            category: "Home Appliances",
            price: 79.99,
            stock: 30,
            status: "In Stock",
            rating: 4.2,
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop&crop=center",
            createdAt: "2025-04-05",
        },
        {
            id: 4,
            name: "Fitness Tracker",
            category: "Wearables",
            price: 59.99,
            stock: 0,
            status: "Out of Stock",
            rating: 3.9,
            image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=200&h=200&fit=crop&crop=center",
            createdAt: "2025-03-28",
        },
        {
            id: 5,
            name: "Bluetooth Speaker",
            category: "Electronics",
            price: 49.99,
            stock: 25,
            status: "In Stock",
            rating: 4.0,
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop&crop=center",
            createdAt: "2025-03-20",
        },
    ];

    // Table columns configuration
    const columns: ColumnType<Product>[] = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            width: 80,
            render: (image: string, record: Product) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                        src={image}
                        alt={record.name}
                        width={50}
                        height={50}
                        style={{
                            borderRadius: '6px',
                            objectFit: 'cover'
                        }}
                        preview={{
                            mask: (
                                <div style={{
                                    background: 'rgba(0,0,0,0.6)',
                                    color: 'white',
                                    fontSize: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%'
                                }}>
                                    <EyeOutlined />
                                </div>
                            )
                        }}
                    />
                </div>
            ),
        },
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
            render: (text: string, record: Product) => (
                <div>
                    <div style={{ fontWeight: 500, marginBottom: 4 }}>{text}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>ID: {record.id}</div>
                </div>
            ),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (category: string) => <Tag color="blue">{category}</Tag>,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price: number) => <span>${price.toFixed(2)}</span>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                let color = "green";
                if (status === "Low Stock") color = "orange";
                if (status === "Out of Stock") color = "red";
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record: Product) => (
                <Space>
                    <Tooltip title="View">
                        <Button
                            type="text"
                            icon={<EyeOutlined />}
                            onClick={() => console.log("View product:", record.id)}
                            className="table-action-button"
                        />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => console.log("Edit product:", record.id)}
                            className="table-action-button"
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => console.log("Delete product:", record.id)}
                            className="table-action-button danger"
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div className="component-library">
            <Title level={2}>Simple Table Component</Title>
            <Paragraph>
                A basic table implementation without advanced features like search, filtering, or toolbar.
            </Paragraph>

            <Divider orientation="left">Basic Table</Divider>
            <Card variant="outlined" className="mb-8">
                <Title level={4}>Simple Table Example</Title>
                <Paragraph>
                    This table demonstrates a basic implementation of the CommonTable component with minimal configuration.
                </Paragraph>

                <CommonTable<Product>
                    title="Products"
                    description="A simple product table without toolbar"
                    dataSource={productData}
                    columns={columns}
                    rowKey="id"
                    className="mb-6"
                />
            </Card>

            <Card variant="outlined" className="mb-8">
                <Title level={4}>Implementation</Title>
                <Paragraph>
                    To use this component in your own pages:
                </Paragraph>
                <div className="p-4 bg-gray-100 rounded">
                    <pre className="text-xs">
{`import { CommonTable } from "../components/common";

<CommonTable<YourDataType>
    title="Your Title"
    description="Your description"
    dataSource={yourData}
    columns={yourColumns}
    rowKey="id"
/>
`}
                    </pre>
                </div>
            </Card>
        </div>
    );
};

export default SimpleTableComponent;
