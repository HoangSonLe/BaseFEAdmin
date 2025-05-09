import React from "react";
import { Breadcrumb as AntBreadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";

export interface BreadcrumbItem {
    path: string;
    label: string;
    icon?: React.ReactNode;
}

export interface BreadcrumbProps {
    items?: BreadcrumbItem[];
    autoGenerate?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
    items = [],
    autoGenerate = true,
    className = "",
    style,
}) => {
    const location = useLocation();
    const pathSnippets = location.pathname.split("/").filter((i) => i);

    // Auto-generate breadcrumb items based on current path
    const generateBreadcrumbItems = () => {
        if (!autoGenerate) return items;

        // If items are provided, use them
        if (items.length > 0) return items;

        // Otherwise, generate from path
        const generatedItems: BreadcrumbItem[] = [];
        let url = "";

        // Add home
        generatedItems.push({
            path: "/",
            label: "Home",
        });

        // Add path segments
        pathSnippets.forEach((segment) => {
            url += `/${segment}`;
            const label = segment
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            generatedItems.push({
                path: url,
                label,
            });
        });

        return generatedItems;
    };

    const breadcrumbItems = generateBreadcrumbItems();

    // Don't render if we're at the home page and there's only one item
    if (breadcrumbItems.length <= 1 && location.pathname === "/") {
        return null;
    }

    return (
        <AntBreadcrumb className={`app-breadcrumb ${className}`} style={style}>
            {breadcrumbItems.map((item, index) => (
                <AntBreadcrumb.Item key={item.path}>
                    {index < breadcrumbItems.length - 1 ? (
                        <Link to={item.path}>
                            {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
                            {item.label}
                        </Link>
                    ) : (
                        <>
                            {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
                            {item.label}
                        </>
                    )}
                </AntBreadcrumb.Item>
            ))}
        </AntBreadcrumb>
    );
};

export default Breadcrumb;
