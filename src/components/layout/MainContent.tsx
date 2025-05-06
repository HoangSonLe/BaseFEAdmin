import React from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const MainContent: React.FC = () => {
    const { token } = theme.useToken();

    return (
        <Content
            style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: token.colorBgContainer,
                borderRadius: token.borderRadiusLG,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Outlet />
        </Content>
    );
};

export default MainContent;
