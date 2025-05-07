import React from "react";
import { DatePicker as AntDatePicker, Typography } from "antd";
import type { DatePickerProps as AntDatePickerProps } from "antd/es/date-picker";
import { CalendarOutlined } from "@ant-design/icons";

const { Text } = Typography;

export interface DatePickerProps extends AntDatePickerProps {
    label?: string;
    className?: string;
    style?: React.CSSProperties;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, className = "", style, ...rest }) => {
    return (
        <div className={`filter-datepicker-container ${className}`} style={style}>
            {label && <Text className="filter-datepicker-label">{label}</Text>}
            <AntDatePicker
                className="filter-datepicker"
                suffixIcon={<CalendarOutlined className="calendar-icon" />}
                popupClassName="filter-datepicker-popup"
                {...rest}
            />
        </div>
    );
};

export default DatePicker;
