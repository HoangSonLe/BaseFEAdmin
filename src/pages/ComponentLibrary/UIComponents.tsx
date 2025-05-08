import React from "react";
import { Typography, Card, Divider } from "antd";
import { ThemeToggle } from "../../components/common";

const { Title, Paragraph, Text } = Typography;

const UIComponents: React.FC = () => {
    return (
        <div className="component-library">
            <Title level={2}>UI Components</Title>
            <Paragraph>
                This page showcases the UI components used throughout the application.
            </Paragraph>

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

export default UIComponents;
