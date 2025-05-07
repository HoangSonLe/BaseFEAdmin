import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface SidebarLogoProps {
    collapsed: boolean;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({ collapsed }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            className={`flex justify-center items-center h-16 ${
                isDark ? "bg-primary-700" : "bg-primary-600"
            } text-white`}
        >
            <h1 className={`text-xl font-bold ${collapsed ? "hidden" : "block"}`}>Admin Panel</h1>
            {collapsed && <span className="text-xl font-bold">AP</span>}
        </div>
    );
};

export default SidebarLogo;
