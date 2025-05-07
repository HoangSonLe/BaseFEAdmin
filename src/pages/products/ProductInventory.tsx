import React from "react";
import { Typography, Card, Table, Button, Space, Tag, Input, Progress } from "antd";
import { PlusOutlined, SearchOutlined, ReloadOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface InventoryItem {
    id: number;
    productName: string;
    sku: string;
    inStock: number;
    reserved: number;
    available: number;
    reorderLevel: number;
    stockStatus: string;
}

const ProductInventory: React.FC = () => {
    // Sample data
    const inventoryData: InventoryItem[] = [
        {
            id: 1,
            productName: "Smartphone X",
            sku: "SMX-001",
            inStock: 120,
            reserved: 15,
            available: 105,
            reorderLevel: 20,
            stockStatus: "In Stock",
        },
        {
            id: 2,
            productName: "Laptop Pro",
            sku: "LP-002",
            inStock: 45,
            reserved: 10,
            available: 35,
            reorderLevel: 15,
            stockStatus: "In Stock",
        },
        {
            id: 3,
            productName: "Wireless Earbuds",
            sku: "WE-003",
            inStock: 18,
            reserved: 5,
            available: 13,
            reorderLevel: 20,
            stockStatus: "Low Stock",
        },
        {
            id: 4,
            productName: "Smart Watch",
            sku: "SW-004",
            inStock: 8,
            reserved: 3,
            available: 5,
            reorderLevel: 10,
            stockStatus: "Low Stock",
        },
        {
            id: 5,
            productName: "Bluetooth Speaker",
            sku: "BS-005",
            inStock: 0,
            reserved: 0,
            available: 0,
            reorderLevel: 15,
            stockStatus: "Out of Stock",
        },
    ];

    const columns = [
        {
            title: "Product Name",
            dataIndex: "productName",
            key: "productName",
            sorter: (a: InventoryItem, b: InventoryItem) =>
                a.productName.localeCompare(b.productName),
        },
        {
            title: "SKU",
            dataIndex: "sku",
            key: "sku",
        },
        {
            title: "In Stock",
            dataIndex: "inStock",
            key: "inStock",
            sorter: (a: InventoryItem, b: InventoryItem) => a.inStock - b.inStock,
        },
        {
            title: "Available",
            dataIndex: "available",
            key: "available",
        },
        {
            title: "Stock Level",
            key: "stockLevel",
            render: (_, record: InventoryItem) => {
                let percent = (record.inStock / record.reorderLevel) * 100;
                if (percent > 100) percent = 100;

                let color = "green";
                if (percent <= 0) color = "red";
                else if (percent < 50) color = "orange";

                return <Progress percent={percent} showInfo={false} strokeColor={color} />;
            },
        },
        {
            title: "Status",
            dataIndex: "stockStatus",
            key: "stockStatus",
            render: (status: string) => {
                let color = "green";
                if (status === "Out of Stock") color = "red";
                else if (status === "Low Stock") color = "orange";

                return <Tag color={color}>{status}</Tag>;
            },
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Title level={2}>Inventory Management</Title>
                    <p className="text-gray-500">Track and manage product inventory</p>
                </div>
                <Space>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={() => console.log("Refresh inventory")}
                    >
                        Refresh
                    </Button>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => console.log("Add inventory")}
                    >
                        Add Stock
                    </Button>
                </Space>
            </div>

            <div className="mb-4">
                <Input
                    placeholder="Search inventory"
                    prefix={<SearchOutlined />}
                    className="w-64"
                />
            </div>

            <Card variant="outlined">
                <Table
                    columns={columns}
                    dataSource={inventoryData}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    );
};

export default ProductInventory;
