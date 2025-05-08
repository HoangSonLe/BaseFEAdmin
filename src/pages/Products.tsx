import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
    SearchOutlined,
    FilterOutlined,
    DownloadOutlined,
    UploadOutlined,
    ReloadOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import { Button, Image, Space, Tag, Tooltip, Input, message } from "antd";
import type { ColumnType } from "antd/es/table";

import React, { useState } from "react";
import axios from "../apis/axios";
import {
    CommonTable,
    DatePicker,
    DateRangePicker,
    Dropdown,
    type DropdownOption,
    type SearchFormItemProps,
} from "../components/common";
import type { ApiRequest } from "../components/common/CommonTable/index";
import { CreateProductModal, UpdateProductModal, type Product } from "../components/products";

const Products: React.FC = () => {
    // State for modal visibility and editing product
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Handle showing create modal
    const showCreateModal = () => {
        setCreateModalVisible(true);
    };

    // Handle showing update modal
    const showUpdateModal = (product: Product) => {
        setEditingProduct(product);
        setUpdateModalVisible(true);
    };

    // Handle create modal cancel
    const handleCreateCancel = () => {
        setCreateModalVisible(false);
    };

    // Handle update modal cancel
    const handleUpdateCancel = () => {
        setUpdateModalVisible(false);
        setEditingProduct(null);
    };

    // Handle create form submission
    const handleCreateSubmit = (values: any) => {
        console.log("Creating new product with:", values);
        // Here you would typically save the data to your backend
        setCreateModalVisible(false);
    };

    // Handle update form submission
    const handleUpdateSubmit = (values: any) => {
        if (editingProduct) {
            console.log(`Updating product ${editingProduct.id} with:`, values);
            // Here you would typically update the data in your backend
        }
        setUpdateModalVisible(false);
        setEditingProduct(null);
    };

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
            image: "https://placehold.co/60x60",
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
            image: "https://placehold.co/60x60",
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
            image: "https://placehold.co/60x60",
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
            image: "https://placehold.co/60x60",
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
            image: "https://placehold.co/60x60",
            createdAt: "2025-03-20",
        },
        {
            id: 6,
            name: "Laptop Pro",
            category: "Electronics",
            price: 1299.99,
            stock: 8,
            status: "Low Stock",
            rating: 4.7,
            image: "https://placehold.co/60x60",
            createdAt: "2025-03-15",
        },
        {
            id: 7,
            name: "Smart Watch",
            category: "Wearables",
            price: 199.99,
            stock: 18,
            status: "In Stock",
            rating: 4.3,
            image: "https://placehold.co/60x60",
            createdAt: "2025-03-10",
        },
        {
            id: 8,
            name: "Desk Lamp",
            category: "Home Appliances",
            price: 29.99,
            stock: 40,
            status: "In Stock",
            rating: 3.8,
            image: "https://placehold.co/60x60",
            createdAt: "2025-03-05",
        },
        {
            id: 9,
            name: "Gaming Mouse",
            category: "Electronics",
            price: 69.99,
            stock: 5,
            status: "Low Stock",
            rating: 4.6,
            image: "https://placehold.co/60x60",
            createdAt: "2025-02-28",
        },
        {
            id: 10,
            name: "Blender",
            category: "Home Appliances",
            price: 39.99,
            stock: 0,
            status: "Out of Stock",
            rating: 4.1,
            image: "https://placehold.co/60x60",
            createdAt: "2025-02-20",
        },
        {
            id: 11,
            name: "Wireless Keyboard",
            category: "Electronics",
            price: 49.99,
            stock: 22,
            status: "In Stock",
            rating: 4.4,
            image: "https://placehold.co/60x60",
            createdAt: "2025-02-15",
        },
        {
            id: 12,
            name: "Air Purifier",
            category: "Home Appliances",
            price: 149.99,
            stock: 7,
            status: "Low Stock",
            rating: 4.2,
            image: "https://placehold.co/60x60",
            createdAt: "2025-02-10",
        },
    ];

    // Table columns configuration
    const columns: ColumnType<Product>[] = [
        {
            title: "Product",
            dataIndex: "name",
            key: "name",
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
            title: "Category",
            dataIndex: "category",
            key: "category",
            filters: [
                { text: "Electronics", value: "Electronics" },
                { text: "Home Appliances", value: "Home Appliances" },
                { text: "Wearables", value: "Wearables" },
            ],
            onFilter: (value: any, record: Product) => record.category === value.toString(),
            render: (category: string) => <Tag color="blue">{category}</Tag>,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price: number) => <span>${price.toFixed(2)}</span>,
            sorter: (a: Product, b: Product) => a.price - b.price,
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
            sorter: (a: Product, b: Product) => a.stock - b.stock,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            filters: [
                { text: "In Stock", value: "In Stock" },
                { text: "Low Stock", value: "Low Stock" },
                { text: "Out of Stock", value: "Out of Stock" },
            ],
            onFilter: (value: any, record: Product) => record.status === value.toString(),
            render: (status: string) => {
                let color = "green";
                if (status === "Low Stock") color = "orange";
                if (status === "Out of Stock") color = "red";
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Rating",
            dataIndex: "rating",
            key: "rating",
            render: (rating: number) => <span>{rating.toFixed(1)}</span>,
            sorter: (a: Product, b: Product) => a.rating - b.rating,
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
                            onClick={() => showUpdateModal(record)}
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

    // Handle search functionality
    const handleSearch = (value: string) => {
        console.log("Search value:", value);
        // Implement actual search functionality here
    };

    // Example API request implementation
    const apiRequest: ApiRequest<Product> = {
        fetchData: async (params: {
            page: number;
            pageSize: number;
            search?: string;
            filters?: Record<string, unknown>;
            sorter?: { field: string; order: "ascend" | "descend" };
        }) => {
            console.log("Fetching data with params:", params);

            // Simulate API call with delay
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Filter data based on search term
            let filteredData = [...productData];

            if (params.search) {
                const searchLower = params.search.toLowerCase();
                filteredData = filteredData.filter(
                    (item) =>
                        item.name.toLowerCase().includes(searchLower) ||
                        item.category.toLowerCase().includes(searchLower)
                );
            }

            // Apply filters if any
            if (params.filters) {
                Object.entries(params.filters).forEach(([key, value]) => {
                    if (value) {
                        filteredData = filteredData.filter((item) => {
                            const itemValue = item[key as keyof Product];
                            return String(itemValue) === String(value);
                        });
                    }
                });
            }

            // Apply sorting if specified
            if (params.sorter) {
                const { field, order } = params.sorter;
                filteredData.sort((a, b) => {
                    const aValue = a[field as keyof Product];
                    const bValue = b[field as keyof Product];

                    if (typeof aValue === "string" && typeof bValue === "string") {
                        return order === "ascend"
                            ? aValue.localeCompare(bValue)
                            : bValue.localeCompare(aValue);
                    }

                    if (typeof aValue === "number" && typeof bValue === "number") {
                        return order === "ascend" ? aValue - bValue : bValue - aValue;
                    }

                    return 0;
                });
            }

            // Calculate pagination
            const total = filteredData.length;
            const start = (params.page - 1) * params.pageSize;
            const end = start + params.pageSize;
            const paginatedData = filteredData.slice(start, end);

            return {
                data: paginatedData,
                total,
            };
        },
        initialParams: {
            filters: {},
            sorter: { field: "name", order: "ascend" },
        },
    };

    // Toggle between local data and API mode
    const [useApiMode, setUseApiMode] = useState(false);

    // State for test loading
    const [testLoading, setTestLoading] = useState(false);

    // Function to test the loading progress bar
    const testLoadingProgressBar = async () => {
        setTestLoading(true);
        message.info("Testing progress bar with multiple API calls...");

        try {
            // Make multiple API calls with different delays to simulate real-world scenario
            const promises = [
                axios({
                    method: "get",
                    url: "https://jsonplaceholder.typicode.com/posts",
                    timeout: 2000, // 2 seconds
                }),
                axios({
                    method: "get",
                    url: "https://jsonplaceholder.typicode.com/users",
                    timeout: 3000, // 3 seconds
                }),
                axios({
                    method: "get",
                    url: "https://jsonplaceholder.typicode.com/comments",
                    timeout: 5000, // 5 seconds
                }),
            ];

            await Promise.all(promises);
            message.success("All API calls completed successfully!");
        } catch (error) {
            message.error("Error during API calls");
            console.error("API call error:", error);
        } finally {
            setTestLoading(false);
        }
    };

    // Search form items for the CommonTable
    const searchFormItems: SearchFormItemProps[] = [
        {
            formItemProps: {
                name: "searchText",
                label: "Tìm kiếm",
                initialValue: "",
            },

            rowIndex: 0,
            renderFormItem: () => (
                <Input
                    placeholder="Tìm kiếm sản phẩm..."
                    prefix={<SearchOutlined />}
                    className="filter-search-input"
                />
            ),
        },
        {
            formItemProps: {
                name: "category",
                label: "Category",
                initialValue: "",
            },

            rowIndex: 0,
            renderFormItem: () => (
                <Dropdown
                    placeholder="All Categories"
                    options={categoryOptions}
                    allowClear={true}
                />
            ),
        },
        {
            formItemProps: {
                name: "status",
                label: "Status",
                initialValue: [],
            },

            rowIndex: 0,
            renderFormItem: () => (
                <Dropdown
                    placeholder="All Statuses"
                    mode="multiple"
                    options={statusOptions}
                    allowClear={true}
                />
            ),
        },
        {
            formItemProps: {
                name: "price",
                label: "Price Range",
                initialValue: "",
            },

            rowIndex: 0,
            renderFormItem: () => <Input placeholder="Enter price range" allowClear={true} />,
        },
        {
            formItemProps: {
                name: "createdAt",
                label: "Created Date",
            },

            rowIndex: 1,
            renderFormItem: () => <DatePicker placeholder="Select date" allowClear={true} />,
        },
        {
            formItemProps: {
                name: "dateRange",
                label: "Date Range",
            },

            rowIndex: 1,
            renderFormItem: () => (
                <DateRangePicker placeholder={["Start date", "End date"]} allowClear={true} />
            ),
        },
        {
            formItemProps: {
                name: "rating",
                label: "Rating",
                initialValue: "",
            },

            rowIndex: 1,
            renderFormItem: () => <Input placeholder="Enter rating" allowClear={true} />,
        },
        {
            formItemProps: {
                name: "stock",
                label: "Stock",
                initialValue: "",
            },

            rowIndex: 1,
            renderFormItem: () => <Input placeholder="Enter stock level" allowClear={true} />,
        },
    ];

    // Handle search form submit
    const handleSearchFormSubmit = (values: Record<string, unknown>) => {
        console.log("Search form values:", values);

        // Handle the search text
        if (values.searchText) {
            handleSearch(values.searchText as string);
        }

        // Here you would typically update your data based on the search form values
    };

    // Category options for dropdown
    const categoryOptions: DropdownOption[] = [
        { label: "All Categories", value: "" },
        { label: "Electronics", value: "Electronics" },
        { label: "Home Appliances", value: "Home Appliances" },
        { label: "Wearables", value: "Wearables" },
    ];

    // Status options for dropdown
    const statusOptions: DropdownOption[] = [
        { label: "All Statuses", value: "" },
        { label: "In Stock", value: "In Stock" },
        { label: "Low Stock", value: "Low Stock" },
        { label: "Out of Stock", value: "Out of Stock" },
    ];

    // Custom toolbar buttons
    const customToolbar = [
        <Button
            key="filter"
            icon={<FilterOutlined />}
            className="filter-button"
            onClick={() => console.log("Filter clicked")}
        >
            Lọc
        </Button>,
        <Button
            key="export"
            icon={<DownloadOutlined />}
            className="filter-button"
            onClick={() => console.log("Export clicked")}
        >
            Xuất Excel
        </Button>,
        <Button
            key="import"
            icon={<UploadOutlined />}
            className="filter-button"
            onClick={() => console.log("Import clicked")}
        >
            Nhập Excel
        </Button>,
        <Button
            key="refresh"
            icon={<ReloadOutlined />}
            className="filter-button"
            onClick={() => console.log("Refresh clicked")}
        >
            Làm mới
        </Button>,
    ];

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                <Button
                    onClick={() => setUseApiMode(!useApiMode)}
                    type={useApiMode ? "primary" : "default"}
                    className={useApiMode ? "primary-action-button" : "filter-button"}
                >
                    {useApiMode ? "Using API Mode" : "Using Local Data Mode"}
                </Button>
                <span className="text-gray-500">
                    (Click to toggle between local data and simulated API)
                </span>

                <Button
                    onClick={testLoadingProgressBar}
                    type="primary"
                    loading={testLoading}
                    className="primary-action-button"
                >
                    Test Progress Bar
                </Button>
                <span className="text-gray-500">
                    (Click to test the top progress bar with multiple API calls)
                </span>
            </div>

            <CommonTable<Product>
                title="Products"
                description="Manage your product inventory"
                dataSource={useApiMode ? undefined : productData}
                request={useApiMode ? apiRequest : undefined}
                columns={columns}
                rowKey="id"
                toolbar={customToolbar}
                actionButton={{
                    text: "Add Product",
                    icon: <PlusOutlined />,
                    onClick: () => showCreateModal(),
                }}
                onSearch={handleSearch}
                searchFormItems={searchFormItems}
                onSearchFormSubmit={handleSearchFormSubmit}
                searchFormTitle="Tìm kiếm sản phẩm"
                searchFormDefaultExpanded={true}
                className="mb-6"
            />

            {/* Product Modals */}
            <CreateProductModal
                visible={createModalVisible}
                onCancel={handleCreateCancel}
                onSubmit={handleCreateSubmit}
            />

            {editingProduct && (
                <UpdateProductModal
                    visible={updateModalVisible}
                    product={editingProduct}
                    onCancel={handleUpdateCancel}
                    onSubmit={handleUpdateSubmit}
                />
            )}
        </div>
    );
};

export default Products;
