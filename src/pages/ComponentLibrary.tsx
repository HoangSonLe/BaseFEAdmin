import React, { useState } from "react";
import { Typography, Card, Divider, Input, Tag } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import {
    CommonTable,
    Dropdown,
    DatePicker,
    DateRangePicker,
    FilterPanel,
    SearchForm,
    type DropdownOption,
    type SearchFormItemProps,
} from "../components/common";
import type { ApiRequest } from "../components/common/CommonTable";
import ThemeToggle from "../components/common/ThemeToggle";

const { Title, Text, Paragraph } = Typography;

interface ExampleItem {
    id: number;
    name: string;
    category: string;
    status: string;
}

const ComponentLibrary: React.FC = () => {
    // Sample data for examples
    const sampleData: ExampleItem[] = [
        { id: 1, name: "Item 1", category: "Category A", status: "Active" },
        { id: 2, name: "Item 2", category: "Category B", status: "Inactive" },
        { id: 3, name: "Item 3", category: "Category A", status: "Active" },
    ];

    // State for examples
    const [selectedValue, setSelectedValue] = useState<string | number | null>(null);

    // Dropdown options
    const categoryOptions: DropdownOption[] = [
        { label: "All Categories", value: "" },
        { label: "Category A", value: "Category A" },
        { label: "Category B", value: "Category B" },
        { label: "Category C", value: "Category C" },
    ];

    // Search form items
    const searchFormItems: SearchFormItemProps[] = [
        {
            formItemProps: {
                name: "search",
                label: "Search",
                initialValue: "",
            },
            rowIndex: 0,
            renderFormItem: () => (
                <Input
                    placeholder="Search..."
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
                    placeholder="Select category"
                    options={categoryOptions}
                    allowClear={true}
                />
            ),
        },
        {
            formItemProps: {
                name: "date",
                label: "Date",
            },
            rowIndex: 1,
            renderFormItem: () => <DatePicker placeholder="Select date" allowClear={true} />,
        },
    ];

    // Table columns
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
            ),
        },
    ];

    // Example API request
    const apiRequest: ApiRequest<ExampleItem> = {
        fetchData: async () => {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));
            return {
                data: sampleData,
                total: sampleData.length,
            };
        },
        initialParams: {
            filters: {},
        },
    };

    return (
        <div className="component-library">
            <Title level={2}>Component Library</Title>
            <Paragraph>
                This page showcases the common components used throughout the application. Each
                component includes a description and example usage.
            </Paragraph>

            <Divider orientation="left">Common Table</Divider>
            <Card variant="outlined" className="mb-8">
                <Title level={4}>CommonTable</Title>
                <Paragraph>
                    A versatile table component that supports pagination, filtering, and API
                    integration.
                </Paragraph>

                <CommonTable<ExampleItem>
                    title="Example Table"
                    description="This is an example of the CommonTable component"
                    columns={columns}
                    dataSource={sampleData}
                    rowKey="id"
                    actionButton={{
                        text: "Add Item",
                        icon: <PlusOutlined />,
                        onClick: () => console.log("Add item clicked"),
                    }}
                    onSearch={(value) => console.log("Search:", value)}
                    className="mb-4"
                />

                <Title level={5} className="mt-4">
                    API-Powered Table
                </Title>
                <CommonTable<ExampleItem>
                    title="API Table Example"
                    description="This table fetches data from an API"
                    columns={columns}
                    request={apiRequest}
                    rowKey="id"
                    className="mb-4"
                />
            </Card>

            <Divider orientation="left">Form Components</Divider>
            <Card variant="outlined" className="mb-8">
                <Title level={4}>Dropdown</Title>
                <Paragraph>A dropdown component for selecting from a list of options.</Paragraph>
                <Dropdown
                    label="Category"
                    placeholder="Select category"
                    options={categoryOptions}
                    value={selectedValue}
                    onChange={setSelectedValue}
                    className="mb-4"
                />

                <Title level={4}>DatePicker</Title>
                <Paragraph>A component for selecting a date.</Paragraph>
                <DatePicker
                    label="Date"
                    placeholder="Select date"
                    onChange={(date) => console.log("Date selected:", date)}
                    className="mb-4"
                />

                <Title level={4}>DateRangePicker</Title>
                <Paragraph>A component for selecting a date range.</Paragraph>
                <DateRangePicker
                    label="Date Range"
                    placeholder={["Start date", "End date"]}
                    onChange={(dates) => {
                        console.log("Date range selected:", dates);
                    }}
                    className="mb-4"
                />
            </Card>

            <Divider orientation="left">Filter Components</Divider>
            <Card variant="outlined" className="mb-8">
                <Title level={4}>FilterPanel</Title>
                <Paragraph>A collapsible panel for containing filter controls.</Paragraph>
                <FilterPanel
                    title="Filter Example"
                    onReset={() => console.log("Reset filters")}
                    onApply={() => console.log("Apply filters")}
                    className="mb-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Dropdown
                            label="Category"
                            placeholder="Select category"
                            options={categoryOptions}
                            value={selectedValue}
                            onChange={setSelectedValue}
                        />
                        <DatePicker
                            label="Date"
                            placeholder="Select date"
                            onChange={(date) => console.log("Date selected:", date)}
                        />
                    </div>
                </FilterPanel>

                <Title level={4}>SearchForm</Title>
                <Paragraph>
                    A form component specifically designed for search and filter operations.
                </Paragraph>
                <SearchForm
                    items={searchFormItems}
                    onSearch={(values) => console.log("Search form values:", values)}
                    onReset={() => console.log("Reset search form")}
                    title="Search Example"
                    className="mb-4"
                />
            </Card>

            <Divider orientation="left">UI Components</Divider>
            <Card variant="outlined" className="mb-8">
                <Title level={4}>ThemeToggle</Title>
                <Paragraph>A toggle switch for changing between light and dark themes.</Paragraph>
                <div className="flex items-center">
                    <Text className="mr-2">Theme:</Text>
                    <ThemeToggle />
                </div>
            </Card>
        </div>
    );
};

export default ComponentLibrary;
