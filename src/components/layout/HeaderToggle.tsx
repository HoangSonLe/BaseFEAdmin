import React from "react";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./HeaderToggle.css";

interface HeaderToggleProps {
    collapsed: boolean;
    onToggle: () => void;
}

const HeaderToggle: React.FC<HeaderToggleProps> = ({ collapsed, onToggle }) => {
    return (
        <Button
            type="text"
            className="header-toggle-btn"
            onClick={onToggle}
            style={{
                fontSize: "16px",
                width: 64,
                height: 64,
            }}
        >
            <span className={`toggle-icon ${collapsed ? "toggle-icon-rotate" : ""}`}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
        </Button>
    );
};

export default HeaderToggle;
