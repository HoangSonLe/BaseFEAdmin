import React from "react";
import { Typography, Card, Divider, Button } from "antd";
import { Link } from "react-router-dom";
import {
    TableOutlined,
    FormOutlined,
    FilterOutlined,
    AppstoreOutlined,
    PictureOutlined,
    PlayCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const ComponentLibrary: React.FC = () => {
    const componentCategories = [
        {
            title: "Table Components",
            icon: <TableOutlined />,
            description:
                "Table components with various features like pagination, filtering, and API integration.",
            path: "/components/tables",
        },
        {
            title: "Form Components",
            icon: <FormOutlined />,
            description: "Form components like dropdowns, date pickers, and more.",
            path: "/components/forms",
        },
        {
            title: "Filter Components",
            icon: <FilterOutlined />,
            description: "Components for filtering and searching data.",
            path: "/components/filters",
        },
        {
            title: "UI Components",
            icon: <AppstoreOutlined />,
            description: "General UI components like theme toggles and more.",
            path: "/components/ui",
        },
        {
            title: "Image Components",
            icon: <PictureOutlined />,
            description: "Image components with various styling options and preview functionality.",
            path: "/components/images",
        },
        {
            title: "Image Slider Components",
            icon: <PlayCircleOutlined />,
            description: "Image slider components with various display options.",
            path: "/components/image-sliders",
        },
    ];

    return (
        <div className="component-library">
            <Title level={2}>Component Library</Title>
            <Paragraph>
                This page showcases the common components used throughout the application. Each
                component includes a description and example usage. Select a category below to view
                specific components.
            </Paragraph>

            <Divider orientation="left">Component Categories</Divider>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {componentCategories.map((category, index) => (
                    <Card
                        key={index}
                        variant="outlined"
                        className="mb-4 hover:shadow-md transition-shadow"
                        title={
                            <div className="flex items-center">
                                <span className="mr-2">{category.icon}</span>
                                {category.title}
                            </div>
                        }
                        actions={[
                            <Link to={category.path} key="view">
                                <Button type="primary">View Components</Button>
                            </Link>,
                        ]}
                    >
                        <Paragraph>{category.description}</Paragraph>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ComponentLibrary;
