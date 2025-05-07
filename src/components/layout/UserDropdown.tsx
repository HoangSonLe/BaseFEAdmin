import React, { useState } from "react";
import { Avatar, Dropdown } from "antd";
import { DownOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import ThemeToggle from "../common/ThemeToggle";
import { useTheme } from "../../contexts/ThemeContext";
import "./UserDropdown.css";

const UserDropdown: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";

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
                                        <div className="username">Default User</div>
                                        <div className="user-handle">@uxuidesigner</div>
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
                        onClick: () => console.log("Logout clicked"),
                    },
                ],
            }}
            placement="bottomRight"
            getPopupContainer={(trigger) => trigger.parentElement || document.body}
            overlayStyle={{ position: "fixed" }}
            trigger={["click"]}
            onOpenChange={(open) => setDropdownOpen(open)}
            open={dropdownOpen}
            dropdownRender={(menu) => <div className="user-dropdown-menu">{menu}</div>}
        >
            <div className="cursor-pointer header-user-dropdown">
                <Avatar size={28} className="header-avatar">
                    AU
                </Avatar>
                <span className="header-user-text">Admin User</span>
                <DownOutlined
                    className={`dropdown-arrow ${dropdownOpen ? "dropdown-arrow-open" : ""}`}
                />
            </div>
        </Dropdown>
    );
};

export default UserDropdown;
