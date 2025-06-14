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
} from "@ant-design/icons";
import { Button, Image, Space, Tag, Tooltip, Input, message, Popconfirm, Switch } from "antd";
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
import {
    CreateProductModal,
    UpdateProductModal,
    type Product as ProductType,
} from "../components/products";
import { useConfirm } from "../hooks/useConfirm";

// Extend Product to satisfy Record<string, unknown>
interface Product extends ProductType, Record<string, unknown> {}

const Products: React.FC = () => {
    // State for modal visibility and editing product
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Confirm dialog hook
    const { confirmDelete, ConfirmDialog } = useConfirm();

    // State for delete confirmation type
    const [usePopconfirm, setUsePopconfirm] = useState(false);

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

    // Handle delete product with confirmation
    const handleDeleteProduct = (product: Product) => {
        confirmDelete(
            product.name,
            () => {
                console.log("Deleting product:", product.id);
                message.success(`Product "${product.name}" has been deleted successfully!`);
                // Here you would typically delete the product from your backend
            }
        );
    };

    // Handle delete product with Popconfirm
    const handleDeleteProductPopconfirm = (product: Product) => {
        console.log("Deleting product:", product.id);
        message.success(`Product "${product.name}" has been deleted successfully!`);
        // Here you would typically delete the product from your backend
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
        {
            id: 6,
            name: "Laptop Pro",
            category: "Electronics",
            price: 1299.99,
            stock: 8,
            status: "Low Stock",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200&h=200&fit=crop&crop=center",
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
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&crop=center",
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
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=center",
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
            image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop&crop=center",
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
            image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=200&h=200&fit=crop&crop=center",
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
            image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop&crop=center",
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
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&crop=center",
            createdAt: "2025-02-10",
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
                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
                    />
                </div>
            ),
        },
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
            render: (_text: string, record: Product) => (
                <div>
                    <div style={{ fontWeight: 500, marginBottom: 4 }}>{_text}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>ID: {record.id}</div>
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
                        {usePopconfirm ? (
                            <Popconfirm
                                title="Delete Product"
                                description={
                                    <div>
                                        <p>Are you sure you want to delete <strong>{record.name}</strong>?</p>
                                        <p style={{ color: '#ff4d4f', fontSize: '12px', margin: '4px 0 0 0' }}>
                                            This action cannot be undone.
                                        </p>
                                    </div>
                                }
                                onConfirm={() => handleDeleteProductPopconfirm(record)}
                                okText="Delete"
                                cancelText="Cancel"
                                okType="danger"
                                placement="topRight"
                                icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
                            >
                                <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    className="table-action-button danger"
                                />
                            </Popconfirm>
                        ) : (
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDeleteProduct(record)}
                                className="table-action-button danger"
                            />
                        )}
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
            <div className="mb-4 flex items-center gap-4 flex-wrap">
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

                <div className="flex items-center gap-2 ml-4 p-2 border rounded-md bg-gray-50">
                    <span className="text-sm font-medium">Delete Confirmation:</span>
                    <Switch
                        checked={usePopconfirm}
                        onChange={setUsePopconfirm}
                        checkedChildren="Popconfirm"
                        unCheckedChildren="Dialog"
                        size="small"
                    />
                    <span className="text-xs text-gray-500">
                        {usePopconfirm ? "Using Popconfirm" : "Using Modal Dialog"}
                    </span>
                </div>
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

            <ConfirmDialog />
        </div>
    );
};

export default Products;
