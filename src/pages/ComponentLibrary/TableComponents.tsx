import React from "react";
import { Typography, Card, Divider, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CommonTable } from "../../components/common";
import type { ApiRequest } from "../../components/common/CommonTable/index";

const { Title, Paragraph } = Typography;

interface ExampleItem extends Record<string, unknown> {
    id: number;
    name: string;
    category: string;
    status: string;
}

const TableComponents: React.FC = () => {
    // Sample data for examples
    const sampleData: ExampleItem[] = [
        { id: 1, name: "Item 1", category: "Category A", status: "Active" },
        { id: 2, name: "Item 2", category: "Category B", status: "Inactive" },
        { id: 3, name: "Item 3", category: "Category A", status: "Active" },
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
            <Title level={2}>Table Components</Title>
            <Paragraph>
                This page showcases the table components used throughout the application.
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

                <Title level={5} className="mt-4">
                    Table with Fixed Height and Scrolling
                </Title>
                <Paragraph>
                    This table has a fixed height and will scroll both horizontally and vertically
                    when content exceeds the container.
                </Paragraph>
                <CommonTable<ExampleItem>
                    title="Scrollable Table Example"
                    description="This table has a fixed height with horizontal and vertical scrolling"
                    columns={[
                        ...columns,
                        ...Array.from({ length: 10 }, (_, i) => ({
                            title: `Extra Column ${i + 1}`,
                            dataIndex: `extraColumn${i + 1}`,
                            key: `extraColumn${i + 1}`,
                            render: () => `Extra data ${i + 1}`,
                        })),
                    ]}
                    dataSource={Array.from({ length: 20 }, (_, i) => ({
                        id: i + 1,
                        name: `Item ${i + 1}`,
                        category: i % 2 === 0 ? "Category A" : "Category B",
                        status: i % 3 === 0 ? "Active" : "Inactive",
                    }))}
                    rowKey="id"
                    height={300}
                    className="mb-4"
                />
            </Card>
        </div>
    );
};

export default TableComponents;
