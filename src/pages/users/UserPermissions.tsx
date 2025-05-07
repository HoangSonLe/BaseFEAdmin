import React, { useState } from "react";
import { Typography, Card, Button, Select, Checkbox, Form, Divider } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

interface Permission {
    id: string;
    name: string;
    description: string;
    module: string;
}

interface PermissionGroup {
    module: string;
    permissions: Permission[];
}

const UserPermissions: React.FC = () => {
    const [selectedRole, setSelectedRole] = useState<string>("administrator");
    const [form] = Form.useForm();

    // Sample data
    const permissionGroups: PermissionGroup[] = [
        {
            module: "Users",
            permissions: [
                {
                    id: "users:view",
                    name: "View Users",
                    description: "Can view user list and details",
                    module: "Users",
                },
                {
                    id: "users:create",
                    name: "Create Users",
                    description: "Can create new users",
                    module: "Users",
                },
                {
                    id: "users:edit",
                    name: "Edit Users",
                    description: "Can edit existing users",
                    module: "Users",
                },
                {
                    id: "users:delete",
                    name: "Delete Users",
                    description: "Can delete users",
                    module: "Users",
                },
            ],
        },
        {
            module: "Products",
            permissions: [
                {
                    id: "products:view",
                    name: "View Products",
                    description: "Can view product list and details",
                    module: "Products",
                },
                {
                    id: "products:create",
                    name: "Create Products",
                    description: "Can create new products",
                    module: "Products",
                },
                {
                    id: "products:edit",
                    name: "Edit Products",
                    description: "Can edit existing products",
                    module: "Products",
                },
                {
                    id: "products:delete",
                    name: "Delete Products",
                    description: "Can delete products",
                    module: "Products",
                },
            ],
        },
        {
            module: "Settings",
            permissions: [
                {
                    id: "settings:view",
                    name: "View Settings",
                    description: "Can view system settings",
                    module: "Settings",
                },
                {
                    id: "settings:edit",
                    name: "Edit Settings",
                    description: "Can modify system settings",
                    module: "Settings",
                },
            ],
        },
    ];

    // Initial values based on selected role
    const getInitialValues = () => {
        const values: Record<string, boolean> = {};

        if (selectedRole === "administrator") {
            // Admin has all permissions
            permissionGroups.forEach((group) => {
                group.permissions.forEach((permission) => {
                    values[permission.id] = true;
                });
            });
        } else if (selectedRole === "editor") {
            // Editor can view everything, edit products but not settings or users
            permissionGroups.forEach((group) => {
                group.permissions.forEach((permission) => {
                    if (permission.name.includes("View")) {
                        values[permission.id] = true;
                    } else if (
                        permission.module === "Products" &&
                        !permission.name.includes("Delete")
                    ) {
                        values[permission.id] = true;
                    } else {
                        values[permission.id] = false;
                    }
                });
            });
        } else {
            // Viewer can only view
            permissionGroups.forEach((group) => {
                group.permissions.forEach((permission) => {
                    values[permission.id] = permission.name.includes("View");
                });
            });
        }

        return values;
    };

    const handleRoleChange = (value: string) => {
        setSelectedRole(value);
        form.setFieldsValue(getInitialValues());
    };

    const handleSave = (values: any) => {
        console.log("Saved permissions:", values);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Title level={2}>User Permissions</Title>
                    <p className="text-gray-500">Configure permissions for user roles</p>
                </div>
                <Button type="primary" icon={<SaveOutlined />} onClick={() => form.submit()}>
                    Save Changes
                </Button>
            </div>

            <Card variant="outlined">
                <div className="mb-6">
                    <div className="mb-2 font-medium">Select Role</div>
                    <Select value={selectedRole} onChange={handleRoleChange} style={{ width: 200 }}>
                        <Option value="administrator">Administrator</Option>
                        <Option value="editor">Editor</Option>
                        <Option value="viewer">Viewer</Option>
                        <Option value="custom">Custom Role</Option>
                    </Select>
                </div>

                <Form
                    form={form}
                    initialValues={getInitialValues()}
                    onFinish={handleSave}
                    layout="vertical"
                >
                    {permissionGroups.map((group) => (
                        <div key={group.module} className="mb-6">
                            <Divider orientation="left">{group.module}</Divider>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {group.permissions.map((permission) => (
                                    <Form.Item
                                        key={permission.id}
                                        name={permission.id}
                                        valuePropName="checked"
                                    >
                                        <Checkbox>
                                            <div>
                                                <div className="font-medium">{permission.name}</div>
                                                <div className="text-gray-500 text-sm">
                                                    {permission.description}
                                                </div>
                                            </div>
                                        </Checkbox>
                                    </Form.Item>
                                ))}
                            </div>
                        </div>
                    ))}
                </Form>
            </Card>
        </div>
    );
};

export default UserPermissions;
