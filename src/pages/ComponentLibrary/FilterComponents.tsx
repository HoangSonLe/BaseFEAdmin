import React, { useState } from "react";
import { Typography, Card, Divider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
    Dropdown,
    DatePicker,
    FilterPanel,
    SearchForm,
    type DropdownOption,
    type SearchFormItemProps,
} from "../../components/common";

const { Title, Paragraph } = Typography;

const FilterComponents: React.FC = () => {
    // State for examples
    const [selectedValue, setSelectedValue] = useState<
        string | number | string[] | number[] | null
    >(null);

    // Dropdown options
    const categoryOptions: DropdownOption[] = [
        { label: "All Categories", value: "" },
        { label: "Category A", value: "Category A" },
        { label: "Category B", value: "Category B" },
        { label: "Category C", value: "Category C" },
    ];

    // Search form items
    const searchFormItems: SearchFormItemProps[] = [
        {
            formItemProps: {
                name: "search",
                label: "Search",
                initialValue: "",
            },
            rowIndex: 0,
            renderFormItem: () => (
                <Input
                    placeholder="Search..."
                    prefix={<SearchOutlined />}
                    className="filter-search-input"
                />
            ),
        },
        {
            formItemProps: {
                name: "category",
                label: "Category",
                initialValue: "",
            },
            rowIndex: 0,
            renderFormItem: () => (
                <Dropdown
                    placeholder="Select category"
                    options={categoryOptions}
                    allowClear={true}
                />
            ),
        },
        {
            formItemProps: {
                name: "date",
                label: "Date",
            },
            rowIndex: 1,
            renderFormItem: () => <DatePicker placeholder="Select date" allowClear={true} />,
        },
    ];

    return (
        <div className="component-library">
            <Title level={2}>Filter Components</Title>
            <Paragraph>
                This page showcases the filter components used throughout the application.
            </Paragraph>

            <Divider orientation="left">Filter Components</Divider>
            <Card variant="outlined" className="mb-8">
                <Title level={4}>FilterPanel</Title>
                <Paragraph>A collapsible panel for containing filter controls.</Paragraph>
                <FilterPanel
                    title="Filter Example"
                    onReset={() => console.log("Reset filters")}
                    onApply={() => console.log("Apply filters")}
                    className="mb-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Dropdown
                            label="Category"
                            placeholder="Select category"
                            options={categoryOptions}
                            value={selectedValue}
                            onChange={setSelectedValue}
                        />
                        <DatePicker
                            label="Date"
                            placeholder="Select date"
                            onChange={(date) => console.log("Date selected:", date)}
                        />
                    </div>
                </FilterPanel>

                <Title level={4}>SearchForm</Title>
                <Paragraph>
                    A form component specifically designed for search and filter operations.
                </Paragraph>
                <SearchForm
                    items={searchFormItems}
                    onSearch={(values) => console.log("Search form values:", values)}
                    onReset={() => console.log("Reset search form")}
                    title="Search Example"
                    className="mb-4"
                />
            </Card>
        </div>
    );
};

export default FilterComponents;
