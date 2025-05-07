import React from "react";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useTheme } from "../../contexts/ThemeContext";

interface HeaderToggleProps {
    collapsed: boolean;
    onToggle: () => void;
}

const HeaderToggle: React.FC<HeaderToggleProps> = ({ collapsed, onToggle }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onToggle}
            style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                color: isDark ? "rgba(255, 255, 255, 0.85)" : undefined,
            }}
        />
    );
};

export default HeaderToggle;
