import React from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const { Content } = Layout;

const MainContent: React.FC = () => {
    const { token } = theme.useToken();
    const { theme: appTheme } = useTheme();
    const isDark = appTheme === "dark";

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
                boxShadow: isDark
                    ? "0 2px 8px rgba(0, 0, 0, 0.3)"
                    : "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
        >
            <Outlet />
        </Content>
    );
};

export default MainContent;
