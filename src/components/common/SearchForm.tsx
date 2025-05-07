import React, { useState } from "react";
import { Form, Button, Space, Typography, Divider } from "antd";
import { SearchOutlined, ReloadOutlined, DownOutlined, FilterOutlined } from "@ant-design/icons";

const { Text } = Typography;

export interface SearchFormItemProps {
    formItemProps: {
        name: string;
        label: React.ReactNode;
        initialValue?: any;
        labelCol?: { span: number };
        wrapperCol?: { span: number };
        rules?: any[];
        [key: string]: any;
    };
    renderFormItem: () => React.ReactNode;
    // Optional row index to control which row this item appears in
    rowIndex?: number;
}

export interface SearchFormProps {
    items: SearchFormItemProps[];
    onSearch: (values: any) => void;
    onReset?: () => void;
    initialValues?: Record<string, any>;
    loading?: boolean;
    className?: string;
    style?: React.CSSProperties;
    title?: string;
    defaultExpanded?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
    items,
    onSearch,
    onReset,
    initialValues,
    loading = false,
    className = "",
    style,
    title = "Tìm kiếm nâng cao",
    defaultExpanded = true,
}) => {
    const [form] = Form.useForm();
    const [expanded, setExpanded] = useState(defaultExpanded);

    const handleReset = () => {
        form.resetFields();
        if (onReset) {
            onReset();
        }
    };

    const handleFinish = (values: any) => {
        onSearch(values);
    };

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    // Group items by row index
    const groupItemsByRow = () => {
        const groupedItems: Record<number, SearchFormItemProps[]> = {};

        items.forEach((item) => {
            const rowIndex = item.rowIndex || 0;
            if (!groupedItems[rowIndex]) {
                groupedItems[rowIndex] = [];
            }
            groupedItems[rowIndex].push(item);
        });

        return Object.entries(groupedItems).map(([rowIndex, rowItems]) => ({
            rowIndex: parseInt(rowIndex),
            items: rowItems,
        }));
    };

    const rowGroups = groupItemsByRow();

    return (
        <div className={`search-form-container ${className}`} style={style}>
            <div className="search-form-header" onClick={handleToggle}>
                <Space>
                    <FilterOutlined />
                    <Text className="search-form-title">{title}</Text>
                </Space>
                <DownOutlined
                    className={`search-form-collapse-icon ${expanded ? "expanded" : ""}`}
                />
            </div>

            {expanded && (
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={initialValues}
                    onFinish={handleFinish}
                    className="w-full"
                >
                    <Divider style={{ margin: "8px 0" }} />
                    <div className="search-form-content">
                        {rowGroups.map((group, groupIndex) => (
                            <div key={groupIndex} className="search-form-row">
                                {group.items.map((item, index) => (
                                    <div key={index} className="search-form-item-wrapper">
                                        <Form.Item
                                            {...item.formItemProps}
                                            className="search-form-item"
                                        >
                                            {item.renderFormItem()}
                                        </Form.Item>
                                    </div>
                                ))}
                            </div>
                        ))}

                        <div className="search-form-buttons-wrapper">
                            <Form.Item className="search-form-buttons-item">
                                <div className="search-form-buttons-container">
                                    <Button
                                        icon={<ReloadOutlined />}
                                        onClick={handleReset}
                                        className="search-form-button reset-button"
                                    >
                                        Làm mới
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        icon={<SearchOutlined />}
                                        loading={loading}
                                        className="search-form-button search-button"
                                    >
                                        Tìm kiếm
                                    </Button>
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            )}
        </div>
    );
};

export default SearchForm;
