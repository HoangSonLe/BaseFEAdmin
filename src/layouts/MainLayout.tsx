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

const { Header, Sider } = Layout;

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="light"
                style={{
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                }}
            >
                <SidebarLogo collapsed={collapsed} />
                <SidebarMenu />
            </Sider>
            <Layout>
                <Header className="app-header">
                    <HeaderToggle collapsed={collapsed} onToggle={handleToggleCollapse} />
                    <UserDropdown />
                </Header>
                <MainContent />
            </Layout>
        </Layout>
    );
};

export default MainLayout;
