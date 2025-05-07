import React, { useState } from "react";
import type { ReactNode } from "react";
import { Table, Button, Input, Space, Card, Dropdown, Pagination } from "antd";
import type { MenuProps } from "antd/es/menu";
import type { TableProps } from "antd/es/table";
import { SearchOutlined, FilterOutlined, MoreOutlined } from "@ant-design/icons";
import SearchForm from "./SearchForm";
import type { SearchFormItemProps } from "./SearchForm";

// Define API request interface
export interface ApiRequest<T> {
    // Function to fetch data from API
    fetchData: (params: {
        page: number;
        pageSize: number;
        search?: string;
        filters?: Record<string, any>;
        sorter?: { field: string; order: "ascend" | "descend" };
    }) => Promise<{
        data: T[];
        total: number;
    }>;
    // Initial params
    initialParams?: {
        filters?: Record<string, any>;
        sorter?: { field: string; order: "ascend" | "descend" };
    };
}

// Define generic type for table data
export interface CommonTableProps<T> {
    // Table data and configuration
    dataSource?: T[];
    columns: TableProps<T>["columns"];
    rowKey: string;

    // API request configuration (alternative to dataSource)
    request?: ApiRequest<T>;

    // Title and description
    title?: string;
    description?: string;

    // Filtering options
    filterOptions?: {
        placeholder?: string;
        dropdownItems?: MenuProps["items"];
    };

    // Sorting options
    sortOptions?: {
        dropdownItems?: MenuProps["items"];
    };

    // Action button
    actionButton?: {
        text: string;
        icon?: ReactNode;
        onClick: () => void;
    };

    // Search functionality
    onSearch?: (value: string) => void;

    // Custom toolbar (replaces default search, filter, and sort controls)
    toolbar?: ReactNode[];

    // Advanced search form
    searchFormItems?: SearchFormItemProps[];
    onSearchFormSubmit?: (values: Record<string, unknown>) => void;
    searchFormInitialValues?: Record<string, unknown>;
    searchFormTitle?: string;
    searchFormDefaultExpanded?: boolean;

    // Custom class names
    className?: string;
    cardClassName?: string;
}

const CommonTable = <T extends Record<string, any>>({
    dataSource: propDataSource,
    columns,
    rowKey,
    title,
    description,
    filterOptions,
    sortOptions,
    actionButton,
    onSearch,
    className,
    cardClassName,
    request,
    searchFormItems,
    onSearchFormSubmit,
    searchFormInitialValues,
    searchFormTitle,
    searchFormDefaultExpanded,
    toolbar,
}: CommonTableProps<T>) => {
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(propDataSource?.length || 0);

    // State for search
    const [searchValue, setSearchValue] = useState("");

    // State for API data
    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState<T[]>([]);
    const [filters] = useState<Record<string, any>>(request?.initialParams?.filters || {});
    const [sorter] = useState<{ field: string; order: "ascend" | "descend" } | undefined>(
        request?.initialParams?.sorter
    );

    // Determine if we're using API or local data
    const isApiMode = !!request;

    // Combine prop data with API data
    const dataSource = isApiMode ? apiData : propDataSource || [];

    // Calculate pagination for local data mode
    const paginatedData = isApiMode
        ? dataSource
        : (propDataSource || []).slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Fetch data from API
    const fetchData = async () => {
        if (!request) return;

        setLoading(true);
        try {
            const result = await request.fetchData({
                page: currentPage,
                pageSize,
                search: searchValue,
                filters,
                sorter,
            });

            setApiData(result.data);
            setTotal(result.total);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch data when pagination, search, filters, or sorter changes
    React.useEffect(() => {
        if (isApiMode) {
            fetchData();
        } else {
            setTotal(propDataSource?.length || 0);
        }
    }, [isApiMode, currentPage, pageSize, searchValue, filters, sorter]);

    // Handle pagination change
    const handlePaginationChange = (page: number, newPageSize?: number) => {
        setCurrentPage(page);
        if (newPageSize && newPageSize !== pageSize) {
            setPageSize(newPageSize);
        }
    };

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);

        // Reset to first page when searching
        if (currentPage !== 1) {
            setCurrentPage(1);
        }

        if (onSearch) {
            onSearch(value);
        }
    };

    // Handle search form submit
    const handleSearchFormSubmit = (values: Record<string, unknown>) => {
        // Reset to first page when searching
        if (currentPage !== 1) {
            setCurrentPage(1);
        }

        if (onSearchFormSubmit) {
            onSearchFormSubmit(values);
        }
    };

    return (
        <div className={className}>
            {/* Header with title and action button */}
            {(title || actionButton) && (
                <div className="flex justify-between items-center mb-6">
                    {title && (
                        <div>
                            <h2 className="text-2xl font-bold">{title}</h2>
                            {description && <p className="text-gray-500">{description}</p>}
                        </div>
                    )}
                    {actionButton && (
                        <Button
                            type="primary"
                            icon={actionButton.icon}
                            onClick={actionButton.onClick}
                            className="primary-action-button"
                        >
                            {actionButton.text}
                        </Button>
                    )}
                </div>
            )}

            {/* Advanced Search Form */}
            {searchFormItems && searchFormItems.length > 0 && (
                <SearchForm
                    items={searchFormItems}
                    onSearch={handleSearchFormSubmit}
                    initialValues={searchFormInitialValues}
                    loading={loading}
                    className="mb-4"
                    title={searchFormTitle}
                    defaultExpanded={searchFormDefaultExpanded}
                />
            )}

            <Card variant="outlined" className={`table-card ${cardClassName || ""}`}>
                {/* Toolbar section - only render if toolbar is provided or filter/sort options exist */}
                {(toolbar ||
                    onSearch ||
                    filterOptions?.dropdownItems ||
                    sortOptions?.dropdownItems) && (
                    <div className="filter-section flex justify-between items-center">
                        {toolbar ? (
                            <div className="toolbar-container">
                                {toolbar.map((item, index) => (
                                    <div key={index} className="toolbar-item">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                {onSearch && (
                                    <Input
                                        placeholder={filterOptions?.placeholder || "Search..."}
                                        prefix={<SearchOutlined />}
                                        className="filter-search-input w-64"
                                        value={searchValue}
                                        onChange={handleSearchChange}
                                    />
                                )}
                                <Space>
                                    {filterOptions?.dropdownItems && (
                                        <Dropdown
                                            menu={{ items: filterOptions.dropdownItems }}
                                            trigger={["click"]}
                                        >
                                            <Button
                                                className="filter-button"
                                                icon={<FilterOutlined />}
                                            >
                                                Filter
                                            </Button>
                                        </Dropdown>
                                    )}
                                    {sortOptions?.dropdownItems && (
                                        <Dropdown
                                            menu={{ items: sortOptions.dropdownItems }}
                                            trigger={["click"]}
                                        >
                                            <Button className="sort-button" icon={<MoreOutlined />}>
                                                Sort
                                            </Button>
                                        </Dropdown>
                                    )}
                                </Space>
                            </>
                        )}
                    </div>
                )}

                {/* Table component */}
                <Table
                    columns={columns}
                    dataSource={paginatedData}
                    rowKey={rowKey}
                    pagination={false}
                    className={`mb-4 ${
                        !(
                            toolbar ||
                            onSearch ||
                            filterOptions?.dropdownItems ||
                            sortOptions?.dropdownItems
                        )
                            ? "mt-4"
                            : ""
                    }`}
                    loading={loading}
                />

                {/* Pagination controls */}
                <div className="table-pagination flex justify-between items-center">
                    <div className="text-gray-500">
                        {total > 0 ? (
                            <>
                                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                                {Math.min(currentPage * pageSize, total)} of {total} items
                            </>
                        ) : (
                            "No data"
                        )}
                    </div>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={total}
                        onChange={handlePaginationChange}
                        showSizeChanger
                        pageSizeOptions={["5", "10", "20"]}
                        showTotal={(total) => `Total ${total} items`}
                        className="pagination-button"
                    />
                </div>
            </Card>
        </div>
    );
};

export default CommonTable;
