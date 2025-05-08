import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, MenuOutlined } from "@ant-design/icons";
import "./HeaderToggle.css";

interface HeaderToggleProps {
    collapsed: boolean;
    onToggle: () => void;
}

const HeaderToggle: React.FC<HeaderToggleProps> = ({ collapsed, onToggle }) => {
    const [isMobile, setIsMobile] = useState(false);

    // Check if the screen is mobile size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    return (
        <Button
            type="text"
            className="header-toggle-btn"
            onClick={onToggle}
            style={{
                fontSize: "16px",
                width: isMobile ? 48 : 64,
                height: isMobile ? 48 : 64,
            }}
        >
            <span className={`toggle-icon ${collapsed ? "toggle-icon-rotate" : ""}`}>
                {isMobile ? (
                    <MenuOutlined />
                ) : collapsed ? (
                    <MenuUnfoldOutlined />
                ) : (
                    <MenuFoldOutlined />
                )}
            </span>
        </Button>
    );
};

export default HeaderToggle;
