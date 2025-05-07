import React from "react";
import { Card, Row, Col, Statistic, Table, Typography, Button } from "antd";
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    UserOutlined,
    ShoppingOutlined,
    DollarOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const Dashboard: React.FC = () => {
    // Sample data for statistics
    const stats = [
        {
            title: "Total Users",
            value: 2458,
            icon: <UserOutlined />,
            color: "#1890ff",
            increase: 12.5,
        },
        {
            title: "Total Orders",
            value: 1526,
            icon: <ShoppingOutlined />,
            color: "#52c41a",
            increase: 8.2,
        },
        {
            title: "Total Revenue",
            value: 9280,
            prefix: "$",
            icon: <DollarOutlined />,
            color: "#722ed1",
            increase: -2.5,
        },
    ];

    // Sample data for recent activities
    const recentActivities = [
        {
            key: "1",
            user: "John Doe",
            action: "Created a new account",
            time: "2 hours ago",
        },
        {
            key: "2",
            user: "Jane Smith",
            action: "Updated profile information",
            time: "4 hours ago",
        },
        {
            key: "3",
            user: "Robert Johnson",
            action: "Placed a new order",
            time: "5 hours ago",
        },
        {
            key: "4",
            user: "Emily Davis",
            action: "Submitted a support ticket",
            time: "1 day ago",
        },
        {
            key: "5",
            user: "Michael Wilson",
            action: "Cancelled subscription",
            time: "1 day ago",
        },
    ];

    const columns = [
        {
            title: "User",
            dataIndex: "user",
            key: "user",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
        },
    ];

    return (
        <div>
            <div className="mb-6">
                <Title level={2}>Dashboard</Title>
                <p className="text-gray-500">Welcome to your admin dashboard</p>
            </div>

            <Row gutter={[16, 16]} className="mb-6">
                {stats.map((stat, index) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                        <Card variant="outlined" className="h-full">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 mb-1">{stat.title}</p>
                                    <Statistic
                                        value={stat.value}
                                        precision={0}
                                        prefix={stat.prefix}
                                        valueStyle={{ color: stat.color, fontWeight: "bold" }}
                                    />
                                </div>
                                <div
                                    className="flex items-center justify-center w-12 h-12 rounded-full"
                                    style={{ backgroundColor: `${stat.color}20` }}
                                >
                                    <span style={{ color: stat.color, fontSize: "24px" }}>
                                        {stat.icon}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <span
                                    className={
                                        stat.increase >= 0 ? "text-green-500" : "text-red-500"
                                    }
                                >
                                    {stat.increase >= 0 ? (
                                        <ArrowUpOutlined />
                                    ) : (
                                        <ArrowDownOutlined />
                                    )}
                                    {Math.abs(stat.increase)}%
                                </span>
                                <span className="text-gray-500 ml-2">Since last month</span>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <Card
                        title="Recent Activities"
                        variant="outlined"
                        extra={<Button type="link">View All</Button>}
                    >
                        <Table dataSource={recentActivities} columns={columns} pagination={false} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
