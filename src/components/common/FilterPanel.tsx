import React, { useState, ReactNode } from "react";
import { Button, Space, Typography, Divider } from "antd";
import { FilterOutlined, DownOutlined, ReloadOutlined, ClearOutlined } from "@ant-design/icons";
import "./ComponentStyles.css";

const { Text } = Typography;

export interface FilterPanelProps {
    title?: string;
    children: ReactNode;
    onReset?: () => void;
    onApply?: () => void;
    defaultExpanded?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
    title = "Filters",
    children,
    onReset,
    onApply,
    defaultExpanded = true,
    className = "",
    style,
}) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const handleReset = () => {
        if (onReset) {
            onReset();
        }
    };

    const handleApply = () => {
        if (onApply) {
            onApply();
        }
    };

    return (
        <div className={`filter-panel ${className}`} style={style}>
            <div className="filter-panel-header" onClick={handleToggle}>
                <Space>
                    <FilterOutlined />
                    <Text className="filter-panel-title">{title}</Text>
                </Space>
                <DownOutlined
                    className={`filter-panel-collapse-icon ${expanded ? "expanded" : ""}`}
                />
            </div>

            {expanded && (
                <>
                    <Divider style={{ margin: "8px 0" }} />
                    <div className="filter-panel-content">{children}</div>
                    <div className="filter-panel-actions">
                        <Button
                            icon={<ClearOutlined />}
                            onClick={handleReset}
                            className="filter-panel-button"
                        >
                            Reset
                        </Button>
                        <Button
                            type="primary"
                            icon={<ReloadOutlined />}
                            onClick={handleApply}
                            className="filter-panel-button"
                        >
                            Apply Filters
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default FilterPanel;
