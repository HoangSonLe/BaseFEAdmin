import React, { useState } from "react";
import { Typography, Card, Divider } from "antd";
import { Dropdown, DatePicker, DateRangePicker } from "../../components/common";
import type { DropdownOption } from "../../components/common";

const { Title, Paragraph } = Typography;

const FormComponents: React.FC = () => {
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

    return (
        <div className="component-library">
            <Title level={2}>Form Components</Title>
            <Paragraph>
                This page showcases the form components used throughout the application.
            </Paragraph>

            <Divider orientation="left">Form Components</Divider>
            <Card variant="outlined" className="mb-8">
                <Title level={4}>Dropdown</Title>
                <Paragraph>A dropdown component for selecting from a list of options.</Paragraph>
                <Dropdown
                    label="Category"
                    placeholder="Select category"
                    options={categoryOptions}
                    value={selectedValue}
                    onChange={setSelectedValue}
                    className="mb-4"
                />

                <Title level={4}>DatePicker</Title>
                <Paragraph>A component for selecting a date.</Paragraph>
                <DatePicker
                    label="Date"
                    placeholder="Select date"
                    onChange={(date) => console.log("Date selected:", date)}
                    className="mb-4"
                />

                <Title level={4}>DateRangePicker</Title>
                <Paragraph>A component for selecting a date range.</Paragraph>
                <DateRangePicker
                    label="Date Range"
                    placeholder={["Start date", "End date"]}
                    onChange={(dates) => {
                        console.log("Date range selected:", dates);
                    }}
                    className="mb-4"
                />
            </Card>
        </div>
    );
};

export default FormComponents;
