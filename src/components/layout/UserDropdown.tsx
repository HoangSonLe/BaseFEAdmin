import React, { useState } from "react";
import { Avatar, Dropdown } from "antd";
import { DownOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";
import { useAuth } from "../../contexts/AuthContext";
import { useConfirm } from "../../hooks/useConfirm";

import "./UserDropdown.css";

const UserDropdown: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logout } = useAuth();
    const { confirmLogout, ConfirmDialog } = useConfirm();

    const handleLogout = () => {
        confirmLogout(() => {
            logout();
        });
    };

    return (
        <>
            <Dropdown
                menu={{
                    items: [
                        {
                            key: "1",
                            label: (
                                <div className="user-profile-container">
                                    <div className="user-profile-content">
                                        {user?.avatar ? (
                                            <Avatar
                                                size={36}
                                                className="user-avatar"
                                                src={user.avatar}
                                            />
                                        ) : (
                                            <Avatar
                                                size={36}
                                                className="user-avatar"
                                                icon={<UserOutlined />}
                                            >
                                                {user?.firstName?.[0] || 'A'}
                                            </Avatar>
                                        )}
                                        <div className="user-info">
                                            <div className="username">
                                                {user?.displayName || user?.firstName + ' ' + user?.lastName || "Default User"}
                                            </div>
                                            <div className="user-handle">
                                                {user?.email || "@uxuidesigner"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ),
                            className: "user-profile-item",
                        },
                    {
                        type: "divider",
                    },
                    {
                        key: "2",
                        label: (
                            <div className="theme-toggle-container">
                                <div className="theme-toggle-item">
                                    <span className="theme-toggle-icon">
                                        <SettingOutlined />
                                    </span>
                                    <span className="theme-toggle-text">Theme</span>
                                    <div className="theme-toggle-switch">
                                        <ThemeToggle />
                                    </div>
                                </div>
                            </div>
                        ),
                    },
                    {
                        type: "divider",
                    },
                    {
                        key: "3",
                        label: (
                            <Link to="/user-settings" style={{ color: 'inherit', textDecoration: 'none' }}>
                                <div className="settings-container">
                                    <div className="settings-item">
                                        <span className="settings-icon">
                                            <UserOutlined />
                                        </span>
                                        <span className="settings-text">Account Settings</span>
                                    </div>
                                </div>
                            </Link>
                        ),
                    },
                    {
                        type: "divider",
                    },
                    {
                        key: "4",
                        label: (
                            <div className="logout-container">
                                <div className="logout-item">
                                    <span className="logout-icon">
                                        <LogoutOutlined />
                                    </span>
                                    <span className="logout-text">Log Out</span>
                                </div>
                            </div>
                        ),
                        onClick: handleLogout,
                    },
                ],
            }}
            placement="bottomRight"
            getPopupContainer={(trigger) => trigger.parentElement || document.body}
            overlayClassName={"user-dropdown-menu"}
            trigger={["click"]}
            onOpenChange={(open) => setDropdownOpen(open)}
            open={dropdownOpen}
        >
            <div className="cursor-pointer header-user-dropdown">
                {user?.avatar ? (
                    <Avatar
                        size={28}
                        className="header-avatar"
                        src={user.avatar}
                    />
                ) : (
                    <Avatar
                        size={28}
                        className="header-avatar"
                        icon={<UserOutlined />}
                    >
                        {user?.firstName?.[0] || 'A'}
                    </Avatar>
                )}
                <span className="header-user-text">{user?.displayName || user?.firstName + ' ' + user?.lastName || "Admin User"}</span>
                <DownOutlined
                    className={`dropdown-arrow ${dropdownOpen ? "dropdown-arrow-open" : ""}`}
                />
            </div>
            </Dropdown>
            <ConfirmDialog />
        </>
    );
};

export default UserDropdown;
