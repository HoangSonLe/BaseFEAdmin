import React from "react";
import type { ReactNode } from "react";
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
    WarningOutlined,
    FileExclamationOutlined,
    LoginOutlined,
    KeyOutlined,
    LockOutlined,
    EditOutlined,
} from "@ant-design/icons";

interface SidebarMenuProps {
    collapsed?: boolean;
    accordion?: boolean; // When true, only one submenu can be expanded at a time
}

// Define menu item interface
interface MenuItem {
    key: string;
    icon?: ReactNode;
    label: ReactNode;
    path?: string;
    children?: MenuItem[];
    className?: string;
}

// Define the menu structure
const menuItems: MenuItem[] = [
    {
        key: "1",
        icon: <DashboardOutlined />,
        label: <Link to="/">Dashboard</Link>,
        path: "/",
    },
    {
        key: "users-submenu",
        icon: <TeamOutlined />,
        label: "Users",
        children: [
            {
                key: "2",
                label: <Link to="/users">All Users</Link>,
                path: "/users",
            },
            {
                key: "2-1",
                icon: <UserSwitchOutlined />,
                label: <Link to="/users/roles">User Roles</Link>,
                path: "/users/roles",
            },
            {
                key: "2-2",
                icon: <SafetyCertificateOutlined />,
                label: <Link to="/users/permissions">Permissions</Link>,
                path: "/users/permissions",
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
                path: "/products",
            },
            {
                key: "3-1",
                icon: <TagsOutlined />,
                label: <Link to="/products/categories">Categories</Link>,
                path: "/products/categories",
            },
            {
                key: "3-2",
                icon: <DatabaseOutlined />,
                label: <Link to="/products/inventory">Inventory</Link>,
                path: "/products/inventory",
            },
        ],
    },

    {
        key: "components-submenu",
        icon: <AppstoreOutlined />,
        label: "Component Library",
        children: [
            {
                key: "7",
                label: <Link to="/components">Overview</Link>,
                path: "/components",
            },
            {
                key: "7-1",
                label: <Link to="/components/tables">Tables</Link>,
                path: "/components/tables",
            },
            {
                key: "7-2",
                label: <Link to="/components/forms">Form Components</Link>,
                path: "/components/forms",
            },
            {
                key: "7-3",
                label: <Link to="/components/filters">Filter Components</Link>,
                path: "/components/filters",
            },
            {
                key: "7-4",
                label: <Link to="/components/ui">UI Components</Link>,
                path: "/components/ui",
            },
            {
                key: "7-5",
                label: <Link to="/components/images">Images</Link>,
                path: "/components/images",
            },
            {
                key: "7-6",
                label: <Link to="/components/image-sliders">Image Sliders</Link>,
                path: "/components/image-sliders",
            },
            {
                key: "7-7",
                icon: <EditOutlined />,
                label: <Link to="/components/editors">Rich Text Editor</Link>,
                path: "/components/editors",
            },
            {
                key: "7-9",
                icon: <TableOutlined />,
                label: <Link to="/components/simple-table">Simple Table</Link>,
                path: "/components/simple-table",
            },
        ],
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
                path: "/pages/404",
            },
            {
                key: "9-2",
                icon: <WarningOutlined />,
                label: <Link to="/pages/500">500 Error</Link>,
                path: "/pages/500",
            },
            {
                key: "9-3",
                icon: <WarningOutlined />,
                label: <Link to="/pages/403">403 Forbidden</Link>,
                path: "/pages/403",
            },
            {
                key: "9-4",
                icon: <LoginOutlined />,
                label: <Link to="/pages/login">Login</Link>,
                path: "/pages/login",
            },
            {
                key: "9-5",
                icon: <KeyOutlined />,
                label: <Link to="/pages/forgot-password">Forgot Password</Link>,
                path: "/pages/forgot-password",
            },
            {
                key: "9-6",
                icon: <LockOutlined />,
                label: <Link to="/pages/reset-password">Reset Password</Link>,
                path: "/pages/reset-password",
            },
        ],
    },
    {
        key: "4",
        icon: <SettingOutlined />,
        label: <Link to="/settings">Settings</Link>,
        path: "/settings",
    },
    {
        key: "5",
        icon: <LogoutOutlined />,
        label: "Logout",
        className: "mt-auto",
    },
];

const SidebarMenu: React.FC<SidebarMenuProps> = ({ collapsed, accordion = false }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const { theme } = useTheme();
    const [openKeys, setOpenKeys] = React.useState<string[]>([]);

    // Handle open keys change
    const handleOpenChange = (keys: string[]) => {
        if (accordion) {
            // If accordion mode is enabled, only keep the last opened submenu
            const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
            if (latestOpenKey) {
                setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
            } else {
                setOpenKeys([]);
            }
        } else {
            // Normal mode - allow multiple submenus to be open
            setOpenKeys(keys);
        }
    };

    // Initialize open keys based on current path
    React.useEffect(() => {
        if (!collapsed) {
            const keys = getOpenKeys();
            setOpenKeys(accordion ? keys.slice(0, 1) : keys);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPath, collapsed, accordion]);

    // Find parent key for a given path
    const findParentKey = (items: MenuItem[], path: string): string | null => {
        for (const item of items) {
            if (item.children) {
                // Check if any child has this path
                const hasPath = item.children.some((child) => child.path === path);
                if (hasPath) {
                    return item.key;
                }

                // Recursively check deeper children
                const nestedParent = findParentKey(item.children, path);
                if (nestedParent) {
                    return nestedParent;
                }
            }
        }
        return null;
    };

    // Find item key for a given path
    const findItemKey = (items: MenuItem[], path: string): string | null => {
        for (const item of items) {
            if (item.path === path) {
                return item.key;
            }

            if (item.children) {
                const childKey = findItemKey(item.children, path);
                if (childKey) {
                    return childKey;
                }
            }
        }
        return null;
    };

    // Determine which keys should be open based on the current path
    const getOpenKeys = () => {
        // Find all parent submenu keys that contain the current path
        const openKeys: string[] = [];

        // First, try to find the exact parent
        const parentKey = findParentKey(menuItems, currentPath);
        if (parentKey) {
            openKeys.push(parentKey);
            return openKeys;
        }

        // If no exact match, check for submenu paths by prefix
        for (const item of menuItems) {
            if (item.children) {
                // Check if the current path starts with any child path
                const matchingChild = item.children.find(
                    (child) => child.path && currentPath.startsWith(child.path)
                );

                if (matchingChild) {
                    openKeys.push(item.key);
                }
            }
        }

        return openKeys;
    };

    // Determine which key should be selected based on the current path
    const getSelectedKey = () => {
        // Try to find exact match first
        const exactMatch = findItemKey(menuItems, currentPath);
        if (exactMatch) {
            return exactMatch;
        }

        // If no exact match, find the closest matching path
        // We'll store the best match and its length
        let bestMatch = "";
        let bestMatchLength = 0;

        // Helper function to recursively search for the best match
        const findBestMatch = (items: MenuItem[]) => {
            for (const item of items) {
                if (item.path && currentPath.startsWith(item.path)) {
                    // If this path is longer than our current best match, update it
                    if (item.path.length > bestMatchLength) {
                        bestMatch = item.key;
                        bestMatchLength = item.path.length;
                    }
                }

                // Recursively check children
                if (item.children) {
                    findBestMatch(item.children);
                }
            }
        };

        // Start the search
        findBestMatch(menuItems);

        return bestMatch;
    };

    return (
        <Menu
            mode="inline"
            theme={theme}
            openKeys={collapsed ? [] : openKeys}
            onOpenChange={handleOpenChange}
            selectedKeys={[getSelectedKey()]}
            className={`sidebar-menu ${collapsed ? "menu-collapsed" : ""}`}
            items={menuItems}
        />
    );
};

export default SidebarMenu;
