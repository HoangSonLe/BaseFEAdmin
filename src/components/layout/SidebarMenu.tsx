import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import "./SidebarMenu.css";
import {
    DashboardOutlined,
    TeamOutlined,
    ShoppingOutlined,
    SettingOutlined,
    LogoutOutlined,
    TagsOutlined,
    DatabaseOutlined,
    UserSwitchOutlined,
    SafetyCertificateOutlined,
    TableOutlined,
    AppstoreOutlined,
    TagOutlined,
    WarningOutlined,
    FileExclamationOutlined,
    LoginOutlined,
    KeyOutlined,
    LockOutlined,
} from "@ant-design/icons";

interface SidebarMenuProps {
    collapsed?: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ collapsed }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const { theme } = useTheme();

    // Determine which keys should be open based on the current path
    const getOpenKeys = () => {
        if (currentPath.startsWith("/users/")) return ["users-submenu"];
        if (currentPath.startsWith("/products/")) return ["products-submenu"];
        if (currentPath.startsWith("/components/")) return ["components-submenu"];
        if (currentPath.startsWith("/pages/")) return ["pages-submenu"];
        return [];
    };

    // Determine which key should be selected based on the current path
    const getSelectedKey = () => {
        if (currentPath === "/") return "1";
        if (currentPath === "/users") return "2";
        if (currentPath === "/users/roles") return "2-1";
        if (currentPath === "/users/permissions") return "2-2";
        if (currentPath === "/products") return "3";
        if (currentPath === "/products/categories") return "3-1";
        if (currentPath === "/products/inventory") return "3-2";
        if (currentPath === "/simple-table") return "6";
        if (currentPath === "/components") return "7";
        if (currentPath === "/components/tables") return "7-1";
        if (currentPath === "/components/forms") return "7-2";
        if (currentPath === "/components/filters") return "7-3";
        if (currentPath === "/components/ui") return "7-4";
        if (currentPath === "/components/images") return "7-5";
        if (currentPath === "/components/image-sliders") return "7-6";
        if (currentPath === "/status-example") return "8";
        if (currentPath === "/settings") return "4";

        // Pages submenu
        if (currentPath === "/pages/404") return "9-1";
        if (currentPath === "/pages/500") return "9-2";
        if (currentPath === "/pages/403") return "9-3";
        if (currentPath === "/pages/login") return "9-4";
        if (currentPath === "/pages/forgot-password") return "9-5";
        if (currentPath === "/pages/reset-password") return "9-6";

        return "";
    };

    return (
        <Menu
            mode="inline"
            theme={theme}
            defaultOpenKeys={getOpenKeys()}
            selectedKeys={[getSelectedKey()]}
            className={`sidebar-menu ${collapsed ? "menu-collapsed" : ""}`}
            items={[
                {
                    key: "1",
                    icon: <DashboardOutlined />,
                    label: <Link to="/">Dashboard</Link>,
                },
                {
                    key: "users-submenu",
                    icon: <TeamOutlined />,
                    label: "Users",
                    children: [
                        {
                            key: "2",
                            label: <Link to="/users">All Users</Link>,
                        },
                        {
                            key: "2-1",
                            icon: <UserSwitchOutlined />,
                            label: <Link to="/users/roles">User Roles</Link>,
                        },
                        {
                            key: "2-2",
                            icon: <SafetyCertificateOutlined />,
                            label: <Link to="/users/permissions">Permissions</Link>,
                        },
                    ],
                },
                {
                    key: "products-submenu",
                    icon: <ShoppingOutlined />,
                    label: "Products",
                    children: [
                        {
                            key: "3",
                            label: <Link to="/products">All Products</Link>,
                        },
                        {
                            key: "3-1",
                            icon: <TagsOutlined />,
                            label: <Link to="/products/categories">Categories</Link>,
                        },
                        {
                            key: "3-2",
                            icon: <DatabaseOutlined />,
                            label: <Link to="/products/inventory">Inventory</Link>,
                        },
                    ],
                },
                {
                    key: "6",
                    icon: <TableOutlined />,
                    label: <Link to="/simple-table">Simple Table</Link>,
                },
                {
                    key: "components-submenu",
                    icon: <AppstoreOutlined />,
                    label: "Component Library",
                    children: [
                        {
                            key: "7",
                            label: <Link to="/components">Overview</Link>,
                        },
                        {
                            key: "7-1",
                            label: <Link to="/components/tables">Tables</Link>,
                        },
                        {
                            key: "7-2",
                            label: <Link to="/components/forms">Form Components</Link>,
                        },
                        {
                            key: "7-3",
                            label: <Link to="/components/filters">Filter Components</Link>,
                        },
                        {
                            key: "7-4",
                            label: <Link to="/components/ui">UI Components</Link>,
                        },
                        {
                            key: "7-5",
                            label: <Link to="/components/images">Images</Link>,
                        },
                        {
                            key: "7-6",
                            label: <Link to="/components/image-sliders">Image Sliders</Link>,
                        },
                    ],
                },
                {
                    key: "8",
                    icon: <TagOutlined />,
                    label: <Link to="/status-example">Status Component</Link>,
                },
                {
                    key: "pages-submenu",
                    icon: <FileExclamationOutlined />,
                    label: "Pages",
                    children: [
                        {
                            key: "9-1",
                            icon: <WarningOutlined />,
                            label: <Link to="/pages/404">404 Page</Link>,
                        },
                        {
                            key: "9-2",
                            icon: <WarningOutlined />,
                            label: <Link to="/pages/500">500 Error</Link>,
                        },
                        {
                            key: "9-3",
                            icon: <WarningOutlined />,
                            label: <Link to="/pages/403">403 Forbidden</Link>,
                        },
                        {
                            key: "9-4",
                            icon: <LoginOutlined />,
                            label: <Link to="/pages/login">Login</Link>,
                        },
                        {
                            key: "9-5",
                            icon: <KeyOutlined />,
                            label: <Link to="/pages/forgot-password">Forgot Password</Link>,
                        },
                        {
                            key: "9-6",
                            icon: <LockOutlined />,
                            label: <Link to="/pages/reset-password">Reset Password</Link>,
                        },
                    ],
                },
                {
                    key: "4",
                    icon: <SettingOutlined />,
                    label: <Link to="/settings">Settings</Link>,
                },
                {
                    key: "5",
                    icon: <LogoutOutlined />,
                    label: "Logout",
                    className: "mt-auto",
                },
            ]}
        />
    );
};

export default SidebarMenu;
