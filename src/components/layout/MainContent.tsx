import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./MainContent.css";

const { Content } = Layout;

const MainContent: React.FC = () => {
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
            <Outlet />
        </Content>
    );
};

export default MainContent;
