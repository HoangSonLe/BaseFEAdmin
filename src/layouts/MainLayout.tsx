import { Layout } from "antd";
import React, { useState } from "react";
import "./MainLayout.css";
import {
    HeaderToggle,
    MainContent,
    SidebarLogo,
    SidebarMenu,
    UserDropdown,
} from "../components/layout";
import { useTheme } from "../contexts/ThemeContext";

const { Header, Sider } = Layout;

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const handleToggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme={isDark ? "dark" : "light"}
                style={{
                    boxShadow: isDark
                        ? "0 2px 8px rgba(0, 0, 0, 0.3)"
                        : "0 2px 8px rgba(0, 0, 0, 0.15)",
                }}
            >
                <SidebarLogo collapsed={collapsed} />
                <SidebarMenu />
            </Sider>
            <Layout>
                <Header className={`app-header ${isDark ? "app-header-dark" : ""}`}>
                    <HeaderToggle collapsed={collapsed} onToggle={handleToggleCollapse} />
                    <UserDropdown />
                </Header>
                <MainContent />
            </Layout>
        </Layout>
    );
};

export default MainLayout;
