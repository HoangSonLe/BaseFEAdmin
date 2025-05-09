import React from "react";

export interface BasicIconProps {
    size?: number | string;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * BasicIcon component that renders a simple plus icon
 * This is a hardcoded SVG to avoid any issues with SVG imports
 */
const BasicIcon: React.FC<BasicIconProps> = ({
    size = 24,
    color = "currentColor",
    className = "",
    style = {},
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            style={style}
        >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
    );
};

export default BasicIcon;
