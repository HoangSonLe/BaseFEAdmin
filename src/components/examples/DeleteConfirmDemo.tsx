import React, { useState } from 'react';
import { Card, Button, Space, Typography, Row, Col, message, Popconfirm, Switch, Table } from 'antd';
import { DeleteOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { useConfirm } from '../../hooks/useConfirm';

const { Title, Paragraph, Text } = Typography;

interface DemoItem {
    id: number;
    name: string;
    type: string;
    description: string;
}

const DeleteConfirmDemo: React.FC = () => {
    const { confirmDelete, ConfirmDialog } = useConfirm();
    const [usePopconfirm, setUsePopconfirm] = useState(false);

    // Sample data for demo
    const demoItems: DemoItem[] = [
        { id: 1, name: "Important Document", type: "File", description: "Critical business document" },
        { id: 2, name: "User Account", type: "Account", description: "Customer account with order history" },
        { id: 3, name: "Product Item", type: "Product", description: "Inventory item with stock" },
        { id: 4, name: "Database Record", type: "Data", description: "Sensitive database entry" },
    ];

    // Handle delete with modal dialog
    const handleDeleteWithDialog = (item: DemoItem) => {
        confirmDelete(
            item.name,
            () => {
                message.success(`${item.name} has been deleted successfully!`);
            },
            {
                content: (
                    <div>
                        <p>Are you sure you want to delete <strong>{item.name}</strong>?</p>
                        <p style={{ color: 'var(--warning-color, #faad14)', fontSize: '14px', marginTop: '8px' }}>
                            Type: {item.type} | {item.description}
                        </p>
                        <p style={{ color: 'var(--error-color, #ff4d4f)', fontSize: '12px', marginTop: '8px' }}>
                            This action cannot be undone and may affect related data.
                        </p>
                    </div>
                )
            }
        );
    };

    // Handle delete with popconfirm
    const handleDeleteWithPopconfirm = (item: DemoItem) => {
        message.success(`${item.name} has been deleted successfully!`);
    };

    // Table columns for demo
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: DemoItem) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{text}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{record.description}</div>
                </div>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: DemoItem) => (
                <Space>
                    {usePopconfirm ? (
                        <Popconfirm
                            title="Delete Item"
                            description={`Are you sure you want to delete "${record.name}"? This action cannot be undone.`}
                            onConfirm={() => handleDeleteWithPopconfirm(record)}
                            okText="Delete"
                            cancelText="Cancel"
                            okType="danger"
                            placement="topRight"
                            icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
                        >
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                size="small"
                            >
                                Delete (Popconfirm)
                            </Button>
                        </Popconfirm>
                    ) : (
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteWithDialog(record)}
                            size="small"
                        >
                            Delete (Dialog)
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
            <Title level={2}>Delete Confirmation Methods Demo</Title>
            <Paragraph>
                This page demonstrates two different approaches for delete confirmations: 
                Modal Dialog and Popconfirm. Each has its own use cases and benefits.
            </Paragraph>

            {/* Toggle Control */}
            <Card style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Text strong>Confirmation Method:</Text>
                    <Switch
                        checked={usePopconfirm}
                        onChange={setUsePopconfirm}
                        checkedChildren="Popconfirm"
                        unCheckedChildren="Dialog"
                    />
                    <Text type="secondary">
                        Currently using: <strong>{usePopconfirm ? "Popconfirm" : "Modal Dialog"}</strong>
                    </Text>
                </div>
            </Card>

            {/* Demo Table */}
            <Card title="Interactive Demo" style={{ marginBottom: 24 }}>
                <Paragraph>
                    Try deleting items from the table below. Toggle the switch above to see different confirmation methods.
                </Paragraph>
                <Table
                    dataSource={demoItems}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                    size="small"
                />
            </Card>

            {/* Comparison */}
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                    <Card 
                        title={
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <InfoCircleOutlined style={{ color: '#1677ff' }} />
                                Modal Dialog Confirmation
                            </div>
                        }
                        style={{ height: '100%' }}
                    >
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div>
                                <Text strong>Pros:</Text>
                                <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                                    <li>More space for detailed content</li>
                                    <li>Better for complex confirmations</li>
                                    <li>Can include rich content (images, forms)</li>
                                    <li>More prominent and attention-grabbing</li>
                                    <li>Better accessibility features</li>
                                </ul>
                            </div>
                            
                            <div>
                                <Text strong>Cons:</Text>
                                <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                                    <li>Takes more screen space</li>
                                    <li>Requires more clicks to dismiss</li>
                                    <li>Can feel heavy for simple actions</li>
                                </ul>
                            </div>

                            <div>
                                <Text strong>Best for:</Text>
                                <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                                    <li>Critical operations</li>
                                    <li>When detailed explanation is needed</li>
                                    <li>Bulk operations</li>
                                    <li>When consequences are severe</li>
                                </ul>
                            </div>
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card 
                        title={
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <WarningOutlined style={{ color: '#faad14' }} />
                                Popconfirm Confirmation
                            </div>
                        }
                        style={{ height: '100%' }}
                    >
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div>
                                <Text strong>Pros:</Text>
                                <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                                    <li>Lightweight and fast</li>
                                    <li>Contextual (appears near the trigger)</li>
                                    <li>Less disruptive to workflow</li>
                                    <li>Good for frequent operations</li>
                                    <li>Mobile-friendly</li>
                                </ul>
                            </div>
                            
                            <div>
                                <Text strong>Cons:</Text>
                                <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                                    <li>Limited space for content</li>
                                    <li>Can be missed by users</li>
                                    <li>Less suitable for critical actions</li>
                                    <li>May be covered by other elements</li>
                                </ul>
                            </div>

                            <div>
                                <Text strong>Best for:</Text>
                                <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                                    <li>Simple delete operations</li>
                                    <li>Table row actions</li>
                                    <li>Quick confirmations</li>
                                    <li>Non-critical operations</li>
                                </ul>
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginTop: 24 }}>
                <Title level={4}>Live Demo - Standard Ant Design Popconfirm</Title>
                <Paragraph>
                    This demonstrates the default Ant Design Popconfirm with 2 buttons horizontally positioned at the bottom.
                    No custom CSS needed - it works perfectly out of the box!
                </Paragraph>

                <div style={{ padding: 24, background: '#fafafa', borderRadius: 8, textAlign: 'center' }}>
                    <Space size="large">
                        <Popconfirm
                            title="Delete Database Record?"
                            description="This action cannot be undone."
                            onConfirm={() => message.success('Database Record deleted!')}
                            okText="Delete"
                            cancelText="Cancel"
                            okType="danger"
                            icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
                        >
                            <Button danger type="primary">
                                Delete (Standard Popconfirm)
                            </Button>
                        </Popconfirm>

                        <Button
                            type="default"
                            onClick={() => {
                                confirmDelete('Test Item', () => {
                                    message.success('Test Item deleted via Modal Dialog!');
                                });
                            }}
                        >
                            Delete (Modal Dialog)
                        </Button>
                    </Space>
                </div>
            </Card>

            <Card style={{ marginTop: 24 }}>
                <Title level={4}>Implementation Examples</Title>
                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={12}>
                        <Title level={5}>Modal Dialog</Title>
                        <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 6 }}>
                            <pre style={{ margin: 0, fontSize: '12px' }}>
{`const { confirmDelete } = useConfirm();

const handleDelete = (item) => {
  confirmDelete(item.name, () => {
    // Delete logic here
    message.success('Deleted!');
  });
};`}
                            </pre>
                        </div>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Title level={5}>Standard Popconfirm (Recommended)</Title>
                        <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 6 }}>
                            <pre style={{ margin: 0, fontSize: '12px' }}>
{`<Popconfirm
  title="Delete item?"
  description="This cannot be undone."
  onConfirm={handleDelete}
  okText="Delete"
  cancelText="Cancel"
  okType="danger"
  icon={<DeleteOutlined />}
>
  <Button danger>Delete</Button>
</Popconfirm>`}
                            </pre>
                        </div>
                    </Col>
                </Row>
            </Card>

            <ConfirmDialog />
        </div>
    );
};

export default DeleteConfirmDemo;
