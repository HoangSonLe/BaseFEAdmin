import React, { useState } from "react";
import { Modal, Form, Input, Select, InputNumber, Upload, Button, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import type { UploadFile } from "antd/es/upload/interface";

// Define the Product interface
export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: "In Stock" | "Low Stock" | "Out of Stock";
    rating: number;
    image: string;
    createdAt: string;
}

export interface ProductDetailModalProps {
    /**
     * Whether the modal is visible
     */
    visible: boolean;
    /**
     * Product data for editing (null for create mode)
     */
    product: Product | null;
    /**
     * Callback when the modal is closed
     */
    onCancel: () => void;
    /**
     * Callback when the form is submitted
     */
    onSubmit: (values: Record<string, unknown>) => void;
    /**
     * Modal title
     */
    title: string;
    /**
     * Submit button text
     */
    submitButtonText: string;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
    visible,
    product,
    onCancel,
    onSubmit,
    title,
    submitButtonText,
}) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // Handle form submission
    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                onSubmit(values);
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    // Reset form and set initial values when modal opens or product changes
    React.useEffect(() => {
        if (visible) {
            form.resetFields();
            if (product) {
                form.setFieldsValue(product);
                if (product.image) {
                    setFileList([
                        {
                            uid: "-1",
                            name: "product-image.png",
                            status: "done",
                            url: product.image,
                        },
                    ]);
                }
            } else {
                setFileList([]);
            }
        }
    }, [visible, form, product]);

    return (
        <Modal title={title} open={visible} footer={null} onCancel={onCancel} width={700} centered>
            <Form form={form} layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Product Name"
                            rules={[{ required: true, message: "Please enter product name" }]}
                        >
                            <Input placeholder="Enter product name" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="category"
                            label="Category"
                            rules={[{ required: true, message: "Please select a category" }]}
                        >
                            <Select placeholder="Select category">
                                <Select.Option value="Electronics">Electronics</Select.Option>
                                <Select.Option value="Home Appliances">
                                    Home Appliances
                                </Select.Option>
                                <Select.Option value="Wearables">Wearables</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="status"
                            label="Status"
                            rules={[{ required: true, message: "Please select a status" }]}
                        >
                            <Select placeholder="Select status">
                                <Select.Option value="In Stock">In Stock</Select.Option>
                                <Select.Option value="Low Stock">Low Stock</Select.Option>
                                <Select.Option value="Out of Stock">Out of Stock</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true, message: "Please enter price" }]}
                        >
                            <InputNumber
                                min={0}
                                precision={2}
                                style={{ width: "100%" }}
                                placeholder="Enter price"
                                prefix="$"
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="stock"
                            label="Stock"
                            rules={[{ required: true, message: "Please enter stock quantity" }]}
                        >
                            <InputNumber
                                min={0}
                                style={{ width: "100%" }}
                                placeholder="Enter stock quantity"
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="rating"
                            label="Rating"
                            rules={[
                                { required: true, message: "Please enter rating" },
                                {
                                    type: "number",
                                    min: 0,
                                    max: 5,
                                    message: "Rating must be between 0 and 5",
                                },
                            ]}
                        >
                            <InputNumber
                                min={0}
                                max={5}
                                precision={1}
                                style={{ width: "100%" }}
                                placeholder="Enter rating (0-5)"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item name="image" label="Product Image">
                            <Upload
                                listType="picture-card"
                                maxCount={1}
                                fileList={fileList}
                                onRemove={() => setFileList([])}
                                beforeUpload={(file) => {
                                    setFileList([file]);
                                    return false;
                                }}
                            >
                                {fileList.length === 0 && (
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>

                    {/* Form buttons at the bottom */}
                    <Col span={24}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "12px",
                                marginTop: "24px",
                            }}
                        >
                            <Button onClick={onCancel}>Cancel</Button>
                            <Button type="primary" onClick={handleSubmit}>
                                {submitButtonText}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ProductDetailModal;
