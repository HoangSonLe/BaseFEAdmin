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

    const handleToggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className="main-layout" style={{ minHeight: "100vh" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme={theme}
                className="app-sider"
                style={{
                    position: "fixed",
                    height: "100vh",
                    zIndex: 10,
                    left: 0,
                    top: 0,
                    overflow: "auto",
                }}
            >
                <SidebarLogo collapsed={collapsed} />
                <SidebarMenu collapsed={collapsed} />
            </Sider>
            <Layout
                className="main-content-layout nested-layout"
                style={{ marginLeft: collapsed ? 80 : 200 }}
            >
                <Header
                    className="app-header"
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 9,
                        width: "100%",
                    }}
                >
                    <HeaderToggle collapsed={collapsed} onToggle={handleToggleCollapse} />
                    <UserDropdown />
                </Header>
                <MainContent />
            </Layout>
        </Layout>
    );
};

export default MainLayout;
