import React from "react";
import "./SidebarLogo.css";

interface SidebarLogoProps {
    collapsed: boolean;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({ collapsed }) => {
    return (
        <div className="sidebar-logo flex justify-center items-center h-16 text-white">
            <h1 className={`text-xl font-bold ${collapsed ? "hidden" : "block"}`}>Admin Panel</h1>
            {collapsed && <span className="text-xl font-bold">AP</span>}
        </div>
    );
};

export default SidebarLogo;
