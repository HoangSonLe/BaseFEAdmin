import React from "react";
import { Switch } from "antd";
import { useTheme } from "../../../contexts/ThemeContext";
import "./ThemeToggle.css";

interface ThemeToggleProps {
    className?: string;
    showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "", showLabel = false }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={`theme-toggle-wrapper flex items-center ${className}`}>
            {showLabel && (
                <span className="theme-toggle-label mr-3 text-sm font-medium">
                    {theme === "dark" ? "Dark Mode" : "Light Mode"}
                </span>
            )}
            <Switch
                checked={theme === "dark"}
                onChange={toggleTheme}
                className="simple-theme-switch"
            />
        </div>
    );
};

export default ThemeToggle;
