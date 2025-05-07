import React from "react";
import { DatePicker, Typography } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import { CalendarOutlined } from "@ant-design/icons";
import "./ComponentStyles.css";

const { RangePicker } = DatePicker;
const { Text } = Typography;

export interface DateRangePickerProps extends RangePickerProps {
    label?: string;
    className?: string;
    style?: React.CSSProperties;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
    label,
    className = "",
    style,
    ...rest
}) => {
    return (
        <div className={`filter-daterange-container ${className}`} style={style}>
            {label && <Text className="filter-daterange-label">{label}</Text>}
            <RangePicker
                className="filter-daterange"
                suffixIcon={<CalendarOutlined className="calendar-icon" />}
                popupClassName="filter-daterange-popup"
                {...rest}
            />
        </div>
    );
};

export default DateRangePicker;
