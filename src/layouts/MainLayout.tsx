import { Layout, Drawer } from "antd";
import React, { useState, useEffect } from "react";
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
    const [isMobile, setIsMobile] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const { theme } = useTheme();

    // Check if the screen is mobile size and handle responsive behavior
    useEffect(() => {
        const checkMobile = () => {
            const isMobileView = window.innerWidth < 768;

            // Only update if the mobile state has changed
            if (isMobileView !== isMobile) {
                setIsMobile(isMobileView);

                // When switching to mobile, collapse the sidebar
                // When switching to desktop, keep the current state or use default (expanded)
                if (isMobileView) {
                    setCollapsed(true);
                }

                // Close drawer when switching to desktop
                if (!isMobileView) {
                    setDrawerVisible(false);
                }
            }
        };

        // Initial check
        const initialCheck = () => {
            const isMobileView = window.innerWidth < 768;
            setIsMobile(isMobileView);

            // Set initial collapsed state based on screen size
            if (isMobileView) {
                setCollapsed(true);
            }
        };

        initialCheck();
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, [isMobile]);

    const handleToggleCollapse = () => {
        if (isMobile) {
            // For mobile, toggle the drawer visibility
            setDrawerVisible(!drawerVisible);
        } else {
            // For desktop, toggle the sidebar collapse state
            setCollapsed(!collapsed);
        }
    };

    const handleDrawerClose = () => {
        setDrawerVisible(false);
    };

    // Sidebar content component to reuse in both desktop and mobile views
    const SidebarContent = () => (
        <>
            <SidebarLogo collapsed={isMobile ? false : collapsed} />
            <SidebarMenu collapsed={isMobile ? false : collapsed} />
        </>
    );

    return (
        <Layout className="main-layout" style={{ minHeight: "100vh" }}>
            {/* Desktop Sidebar */}
            {!isMobile && (
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    theme={theme}
                    className="app-sider desktop-sider"
                    style={{
                        position: "fixed",
                        height: "100vh",
                        zIndex: 10,
                        left: 0,
                        top: 0,
                        overflow: "auto",
                    }}
                >
                    <SidebarContent />
                </Sider>
            )}

            {/* Mobile Drawer Sidebar */}
            <Drawer
                placement="left"
                closable={false}
                onClose={handleDrawerClose}
                open={drawerVisible && isMobile}
                className="mobile-sidebar-drawer"
                width={250}
                styles={{ body: { padding: 0, overflow: "auto" } }}
                maskClosable={true}
            >
                <SidebarContent />
            </Drawer>

            <Layout
                className="main-content-layout nested-layout"
                style={{ marginLeft: isMobile ? 0 : collapsed ? 80 : 200 }}
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
                    <HeaderToggle
                        collapsed={isMobile ? drawerVisible : collapsed}
                        onToggle={handleToggleCollapse}
                    />
                    <UserDropdown />
                </Header>
                <MainContent />
            </Layout>
        </Layout>
    );
};

export default MainLayout;
