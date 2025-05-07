import React from "react";
import { Switch } from "antd";
import { useTheme } from "../../contexts/ThemeContext";
import "./ThemeToggle.css";

interface ThemeToggleProps {
    className?: string;
    showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "", showLabel = false }) => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className={`theme-toggle-wrapper flex items-center ${className}`}>
            {showLabel && (
                <span
                    className={`mr-3 text-sm font-medium ${
                        isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
                    }`}
                >
                    {isDark ? "Dark Mode" : "Light Mode"}
                </span>
            )}
            <Switch checked={isDark} onChange={toggleTheme} className="simple-theme-switch" />
        </div>
    );
};

export default ThemeToggle;
