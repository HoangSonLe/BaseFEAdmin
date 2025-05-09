import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./MainContent.css";
import { Breadcrumb } from "../common";
import type { BreadcrumbItem } from "../common";

const { Content } = Layout;

export interface MainContentProps {
    showBreadcrumb?: boolean;
    breadcrumbItems?: BreadcrumbItem[];
}

const MainContent: React.FC<MainContentProps> = ({
    showBreadcrumb = true,
    breadcrumbItems = [],
}) => {
    return (
        <Content
            className="main-content"
            style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {showBreadcrumb && <Breadcrumb items={breadcrumbItems} />}
            <Outlet />
        </Content>
    );
};

export default MainContent;
