import React from 'react';
import { Card, Button, Space, Typography, Divider, Row, Col, message } from 'antd';
import { 
    DeleteOutlined, 
    LogoutOutlined, 
    WarningOutlined, 
    InfoCircleOutlined,
    UserDeleteOutlined,
    SecurityScanOutlined
} from '@ant-design/icons';
import { useConfirm } from '../../hooks/useConfirm';

const { Title, Paragraph, Text } = Typography;

const ConfirmDialogDemo: React.FC = () => {
    const { 
        confirm,
        confirmDelete,
        confirmAction,
        confirmLogout,
        confirmLogoutAllDevices,
        confirmDeleteAccount,
        confirmRevokeSession,
        confirmDisable2FA,
        ConfirmDialog 
    } = useConfirm();

    const handleBasicConfirm = () => {
        confirm(
            {
                title: 'Xác nhận cơ bản',
                content: 'Đây là một dialog xác nhận cơ bản. Bạn có muốn tiếp tục không?',
                type: 'info'
            },
            () => {
                message.success('Bạn đã xác nhận!');
            }
        );
    };

    const handleWarningConfirm = () => {
        confirm(
            {
                title: 'Cảnh báo',
                content: 'Hành động này có thể ảnh hưởng đến dữ liệu của bạn. Bạn có chắc chắn muốn tiếp tục?',
                type: 'warning',
                danger: true
            },
            () => {
                message.warning('Bạn đã xác nhận hành động cảnh báo!');
            }
        );
    };

    const handleDeleteItem = () => {
        confirmDelete(
            'Sản phẩm ABC',
            () => {
                message.success('Đã xóa sản phẩm ABC!');
            }
        );
    };

    const handleDeleteUser = () => {
        confirmDelete(
            'Người dùng John Doe',
            () => {
                message.success('Đã xóa người dùng John Doe!');
            },
            {
                content: (
                    <div>
                        <p>Bạn có chắc chắn muốn xóa <strong>Người dùng John Doe</strong> không?</p>
                        <p style={{ color: 'var(--error-color)', fontSize: '14px', marginTop: '8px' }}>
                            Hành động này sẽ xóa tất cả dữ liệu liên quan và không thể hoàn tác.
                        </p>
                    </div>
                )
            }
        );
    };

    const handleCustomAction = () => {
        confirmAction(
            'Xuất báo cáo',
            'Bạn có muốn xuất báo cáo cho tháng này không? Quá trình này có thể mất vài phút.',
            () => {
                message.info('Đang xuất báo cáo...');
            },
            {
                type: 'info',
                okText: 'Xuất báo cáo'
            }
        );
    };

    const handleLogoutDemo = () => {
        confirmLogout(() => {
            message.info('Demo: Đã đăng xuất!');
        });
    };

    const handleLogoutAllDevicesDemo = () => {
        confirmLogoutAllDevices(() => {
            message.info('Demo: Đã đăng xuất tất cả thiết bị!');
        });
    };

    const handleDeleteAccountDemo = () => {
        confirmDeleteAccount(() => {
            message.error('Demo: Tài khoản sẽ được xóa!');
        });
    };

    const handleRevokeSessionDemo = () => {
        confirmRevokeSession('iPhone 15 Pro', () => {
            message.success('Demo: Đã thu hồi phiên đăng nhập trên iPhone 15 Pro!');
        });
    };

    const handleDisable2FADemo = () => {
        confirmDisable2FA(() => {
            message.warning('Demo: Đã tắt xác thực hai yếu tố!');
        });
    };

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
            <Title level={2}>Confirm Dialog Demo</Title>
            <Paragraph>
                Trang này demo các loại dialog xác nhận khác nhau được sử dụng trong ứng dụng.
                Tất cả các dialog đều có thể tùy chỉnh nội dung, icon, và hành động.
            </Paragraph>

            <Row gutter={[24, 24]}>
                {/* Basic Confirm Dialogs */}
                <Col xs={24} lg={12}>
                    <Card title="Dialog Xác Nhận Cơ Bản" style={{ height: '100%' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div>
                                <Text strong>Info Dialog</Text>
                                <br />
                                <Text type="secondary">Dialog thông tin cơ bản</Text>
                            </div>
                            <Button 
                                type="primary" 
                                icon={<InfoCircleOutlined />}
                                onClick={handleBasicConfirm}
                            >
                                Hiển thị Info Dialog
                            </Button>

                            <Divider />

                            <div>
                                <Text strong>Warning Dialog</Text>
                                <br />
                                <Text type="secondary">Dialog cảnh báo với nút danger</Text>
                            </div>
                            <Button 
                                type="default" 
                                icon={<WarningOutlined />}
                                onClick={handleWarningConfirm}
                            >
                                Hiển thị Warning Dialog
                            </Button>

                            <Divider />

                            <div>
                                <Text strong>Custom Action</Text>
                                <br />
                                <Text type="secondary">Dialog tùy chỉnh cho hành động cụ thể</Text>
                            </div>
                            <Button 
                                type="default" 
                                onClick={handleCustomAction}
                            >
                                Xuất Báo Cáo
                            </Button>
                        </Space>
                    </Card>
                </Col>

                {/* Delete Confirm Dialogs */}
                <Col xs={24} lg={12}>
                    <Card title="Dialog Xác Nhận Xóa" style={{ height: '100%' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div>
                                <Text strong>Xóa Sản Phẩm</Text>
                                <br />
                                <Text type="secondary">Dialog xóa với tên item cụ thể</Text>
                            </div>
                            <Button 
                                danger 
                                icon={<DeleteOutlined />}
                                onClick={handleDeleteItem}
                            >
                                Xóa Sản Phẩm
                            </Button>

                            <Divider />

                            <div>
                                <Text strong>Xóa Người Dùng</Text>
                                <br />
                                <Text type="secondary">Dialog xóa với nội dung tùy chỉnh</Text>
                            </div>
                            <Button 
                                danger 
                                icon={<UserDeleteOutlined />}
                                onClick={handleDeleteUser}
                            >
                                Xóa Người Dùng
                            </Button>
                        </Space>
                    </Card>
                </Col>

                {/* Authentication Related Dialogs */}
                <Col xs={24} lg={12}>
                    <Card title="Dialog Liên Quan Đến Xác Thực" style={{ height: '100%' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div>
                                <Text strong>Đăng Xuất</Text>
                                <br />
                                <Text type="secondary">Xác nhận đăng xuất khỏi hệ thống</Text>
                            </div>
                            <Button 
                                type="default" 
                                icon={<LogoutOutlined />}
                                onClick={handleLogoutDemo}
                            >
                                Đăng Xuất
                            </Button>

                            <Divider />

                            <div>
                                <Text strong>Đăng Xuất Tất Cả Thiết Bị</Text>
                                <br />
                                <Text type="secondary">Đăng xuất khỏi tất cả thiết bị</Text>
                            </div>
                            <Button 
                                type="default" 
                                danger
                                icon={<LogoutOutlined />}
                                onClick={handleLogoutAllDevicesDemo}
                            >
                                Đăng Xuất Tất Cả
                            </Button>

                            <Divider />

                            <div>
                                <Text strong>Thu Hồi Phiên Đăng Nhập</Text>
                                <br />
                                <Text type="secondary">Thu hồi phiên đăng nhập trên thiết bị cụ thể</Text>
                            </div>
                            <Button 
                                type="default" 
                                danger
                                onClick={handleRevokeSessionDemo}
                            >
                                Thu Hồi Phiên
                            </Button>
                        </Space>
                    </Card>
                </Col>

                {/* Security Related Dialogs */}
                <Col xs={24} lg={12}>
                    <Card title="Dialog Liên Quan Đến Bảo Mật" style={{ height: '100%' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div>
                                <Text strong>Tắt Xác Thực Hai Yếu Tố</Text>
                                <br />
                                <Text type="secondary">Tắt 2FA với cảnh báo bảo mật</Text>
                            </div>
                            <Button 
                                type="default" 
                                danger
                                icon={<SecurityScanOutlined />}
                                onClick={handleDisable2FADemo}
                            >
                                Tắt 2FA
                            </Button>

                            <Divider />

                            <div>
                                <Text strong>Xóa Tài Khoản</Text>
                                <br />
                                <Text type="secondary">Dialog nguy hiểm nhất - xóa tài khoản</Text>
                            </div>
                            <Button 
                                type="primary" 
                                danger
                                icon={<DeleteOutlined />}
                                onClick={handleDeleteAccountDemo}
                            >
                                Xóa Tài Khoản
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginTop: 24 }}>
                <Title level={4}>Tính Năng</Title>
                <ul>
                    <li>✅ <strong>Nhiều loại dialog:</strong> Info, Warning, Delete với icon và màu sắc phù hợp</li>
                    <li>✅ <strong>Tùy chỉnh nội dung:</strong> Title, content, button text có thể tùy chỉnh</li>
                    <li>✅ <strong>Loading state:</strong> Hiển thị loading khi thực hiện hành động async</li>
                    <li>✅ <strong>Predefined dialogs:</strong> Các dialog có sẵn cho các use case phổ biến</li>
                    <li>✅ <strong>Type safety:</strong> Fully typed với TypeScript</li>
                    <li>✅ <strong>Easy to use:</strong> Hook-based API dễ sử dụng</li>
                    <li>✅ <strong>Consistent UI:</strong> Thiết kế nhất quán với theme của ứng dụng</li>
                </ul>
            </Card>

            <ConfirmDialog />
        </div>
    );
};

export default ConfirmDialogDemo;
