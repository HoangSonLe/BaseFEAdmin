import React, { useState } from "react";
import { Avatar, Dropdown } from "antd";
import { DownOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import ThemeToggle from "../common/ThemeToggle";
import { useAuth } from "../../contexts/AuthContext";

import "./UserDropdown.css";

const UserDropdown: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <Dropdown
            menu={{
                items: [
                    {
                        key: "1",
                        label: (
                            <div className="user-profile-container">
                                <div className="user-profile-content">
                                    <Avatar size={36} className="user-avatar">
                                        AU
                                    </Avatar>
                                    <div className="user-info">
                                        <div className="username">
                                            {user?.name || "Default User"}
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
                            <div className="logout-container">
                                <div className="logout-item">
                                    <span className="logout-icon">
                                        <LogoutOutlined />
                                    </span>
                                    <span className="logout-text">Log Out</span>
                                </div>
                            </div>
                        ),
                        onClick: () => logout(),
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
                <Avatar size={28} className="header-avatar">
                    AU
                </Avatar>
                <span className="header-user-text">{user?.name || "Admin User"}</span>
                <DownOutlined
                    className={`dropdown-arrow ${dropdownOpen ? "dropdown-arrow-open" : ""}`}
                />
            </div>
        </Dropdown>
    );
};

export default UserDropdown;
