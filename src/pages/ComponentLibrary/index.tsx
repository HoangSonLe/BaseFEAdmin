import React from "react";
import { Typography, Card, Divider, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import {
    TableOutlined,
    FormOutlined,
    FilterOutlined,
    AppstoreOutlined,
    PictureOutlined,
    PlayCircleOutlined,
    EditOutlined,
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
        {
            title: "Rich Text Editors",
            icon: <EditOutlined />,
            description: "Rich text editor components for content editing.",
            path: "/components/editors",
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

            <Row gutter={[24, 24]}>
                {componentCategories.map((category, index) => (
                    <Col xs={24} md={12} lg={8} key={index}>
                        <Card
                            variant="outlined"
                            className="hover:shadow-md transition-shadow"
                            style={{ height: "100%", display: "flex", flexDirection: "column" }}
                            title={
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <span style={{ marginRight: "8px" }}>{category.icon}</span>
                                    {category.title}
                                </div>
                            }
                            styles={{ body: { flex: 1, display: "flex", flexDirection: "column" } }}
                            actions={[
                                <Link to={category.path} key="view">
                                    <Button type="primary">View Components</Button>
                                </Link>,
                            ]}
                        >
                            <div style={{ flex: 1 }}>
                                <Paragraph>{category.description}</Paragraph>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ComponentLibrary;
