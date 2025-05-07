// import React from "react";
// import { Tag, Space } from "antd";
// import { Dropdown, type DropdownOption } from "./Dropdown";
// import "./Status.css";

// export interface StatusOption {
//     label: string;
//     value: string;
//     color: string;
// }

// export interface StatusProps {
//     value?: string | string[];
//     onChange?: (value: string | string[]) => void;
//     options: StatusOption[];
//     mode?: "single" | "multiple";
//     label?: string;
//     placeholder?: string;
//     className?: string;
//     style?: React.CSSProperties;
// }

// const Status: React.FC<StatusProps> = ({
//     value,
//     onChange,
//     options,
//     mode = "single",
//     label,
//     placeholder = "Select status",
//     className = "",
//     style,
// }) => {
//     // Convert StatusOption to DropdownOption
//     const dropdownOptions: DropdownOption[] = options.map((option) => ({
//         label: option.label,
//         value: option.value,
//     }));

//     // Handle change
//     const handleChange = (newValue: string | string[] | number | number[] | null) => {
//         if (onChange) {
//             if (Array.isArray(newValue)) {
//                 onChange(newValue.map(v => String(v)));
//             } else if (newValue !== null) {
//                 onChange(String(newValue));
//             }
//         }
//     };

//     // Render status tags
//     const renderStatusTags = () => {
//         if (!value) return null;

//         const values = Array.isArray(value) ? value : [value];

//         return (
//             <Space size={4} wrap className="status-tags">
//                 {values.map((val) => {
//                     const option = options.find((opt) => opt.value === val);
//                     return option ? (
//                         <Tag key={val} color={option.color} className="status-tag">
//                             {option.label}
//                         </Tag>
//                     ) : null;
//                 })}
//             </Space>
//         );
//     };

//     return (
//         <div className={`status-component ${className}`} style={style}>
//             <Dropdown
//                 label={label}
//                 value={value}
//                 onChange={handleChange}
//                 options={dropdownOptions}
//                 placeholder={placeholder}
//                 mode={mode === "multiple" ? "multiple" : undefined}
//                 className="status-dropdown"
//             />
//             {renderStatusTags()}
//         </div>
//     );
// };

// export default Status;
