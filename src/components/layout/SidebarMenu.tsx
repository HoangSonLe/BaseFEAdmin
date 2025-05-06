import React, { useState } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
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
} from "@ant-design/icons";

const SidebarMenu: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // Determine which keys should be open based on the current path
    const getOpenKeys = () => {
        if (currentPath.startsWith("/users/")) return ["users-submenu"];
        if (currentPath.startsWith("/products/")) return ["products-submenu"];
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
        if (currentPath === "/settings") return "4";
        return "";
    };

    return (
        <Menu
            mode="inline"
            defaultOpenKeys={getOpenKeys()}
            selectedKeys={[getSelectedKey()]}
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
