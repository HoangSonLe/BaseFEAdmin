import React, { useState, useEffect } from "react";
import { Select, Typography, Spin } from "antd";
import type { SelectProps } from "antd/es/select";
import { DownOutlined } from "@ant-design/icons";
import "./ComponentStyles.css";

const { Text } = Typography;

export interface DropdownOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}

export interface DropdownProps extends Omit<SelectProps, "options"> {
    label?: string;
    options?: DropdownOption[];
    placeholder?: string;
    value?: string | number | null;
    onChange?: (value: string | number | null) => void;
    allowClear?: boolean;
    className?: string;
    style?: React.CSSProperties;
    // API-related props
    fetchOptions?: () => Promise<DropdownOption[]>;
    debounceTimeout?: number;
    searchable?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
    label,
    options: propOptions,
    placeholder = "Select an option",
    value,
    onChange,
    allowClear = true,
    className = "",
    style,
    fetchOptions,
    debounceTimeout = 300,
    searchable = false,
    ...rest
}) => {
    const [options, setOptions] = useState<DropdownOption[]>(propOptions || []);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const isApiMode = !!fetchOptions;

    // Fetch options when component mounts if in API mode
    useEffect(() => {
        if (isApiMode && fetchOptions) {
            const loadOptions = async () => {
                setLoading(true);
                try {
                    const data = await fetchOptions();
                    setOptions(data);
                } catch (error) {
                    console.error("Error fetching dropdown options:", error);
                } finally {
                    setLoading(false);
                }
            };

            loadOptions();
        }
    }, [fetchOptions, isApiMode]);

    // Update options when propOptions change (for non-API mode)
    useEffect(() => {
        if (!isApiMode && propOptions) {
            setOptions(propOptions);
        }
    }, [propOptions, isApiMode]);

    // Handle search with debounce (for API mode)
    useEffect(() => {
        if (isApiMode && searchValue) {
            const handler = setTimeout(() => {
                // You can implement additional search logic here if needed
                // For example, you could call a search API endpoint
            }, debounceTimeout);

            return () => {
                clearTimeout(handler);
            };
        }
    }, [searchValue, debounceTimeout, isApiMode]);

    const handleChange = (newValue: string | number | null) => {
        if (onChange) {
            onChange(newValue);
        }
    };

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    return (
        <div className={`filter-dropdown-container ${className}`} style={style}>
            {label && <Text className="filter-dropdown-label">{label}</Text>}
            <Select
                className="filter-dropdown"
                value={value}
                onChange={handleChange}
                onSearch={isApiMode || searchable ? handleSearch : undefined}
                placeholder={placeholder}
                allowClear={allowClear}
                options={options}
                suffixIcon={
                    loading ? <Spin size="small" /> : <DownOutlined className="dropdown-icon" />
                }
                filterOption={
                    isApiMode || searchable
                        ? (input, option) =>
                              (option?.label?.toString() || "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                        : undefined
                }
                showSearch={isApiMode || searchable}
                popupClassName="filter-dropdown-popup"
                notFoundContent={loading ? <Spin size="small" /> : "No options found"}
                {...rest}
            />
        </div>
    );
};

export default Dropdown;
