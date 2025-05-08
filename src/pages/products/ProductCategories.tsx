import React from "react";
import { Button, Space, Tag } from "antd";
import type { ColumnType } from "antd/es/table";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { CommonTable } from "../../components/common";

interface Category extends Record<string, unknown> {
    id: number;
    name: string;
    slug: string;
    productsCount: number;
    status: string;
}

const ProductCategories: React.FC = () => {
    // Sample data
    const categories: Category[] = [
        { id: 1, name: "Electronics", slug: "electronics", productsCount: 42, status: "Active" },
        {
            id: 2,
            name: "Home Appliances",
            slug: "home-appliances",
            productsCount: 28,
            status: "Active",
        },
        { id: 3, name: "Wearables", slug: "wearables", productsCount: 15, status: "Active" },
        { id: 4, name: "Accessories", slug: "accessories", productsCount: 36, status: "Inactive" },
        { id: 5, name: "Furniture", slug: "furniture", productsCount: 19, status: "Active" },
    ];

    const columns: ColumnType<Category>[] = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a: Category, b: Category) => a.name.localeCompare(b.name),
        },
        {
            title: "Slug",
            dataIndex: "slug",
            key: "slug",
        },
        {
            title: "Products",
            dataIndex: "productsCount",
            key: "productsCount",
            sorter: (a: Category, b: Category) => a.productsCount - b.productsCount,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                const color = status === "Active" ? "green" : "red";
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record: Category) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => console.log("Edit category:", record.id)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => console.log("Delete category:", record.id)}
                    />
                </Space>
            ),
        },
    ];

    // Handle search functionality
    const handleSearch = (value: string) => {
        console.log("Search value:", value);
        // Implement actual search functionality here
    };

    return (
        <CommonTable<Category>
            title="Product Categories"
            description="Manage product categories"
            dataSource={categories}
            columns={columns}
            rowKey="id"
            filterOptions={{
                placeholder: "Search categories",
            }}
            actionButton={{
                text: "Add Category",
                icon: <PlusOutlined />,
                onClick: () => console.log("Add new category"),
            }}
            onSearch={handleSearch}
        />
    );
};

export default ProductCategories;
