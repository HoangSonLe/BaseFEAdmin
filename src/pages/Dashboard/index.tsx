import React from "react";
import { Card, Row, Col, Statistic, Table, Typography, Button, Avatar } from "antd";
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    UserOutlined,
    ShoppingOutlined,
    DollarOutlined,
    RightOutlined,
} from "@ant-design/icons";
import UserInfoCard from "../../components/dashboard/UserInfoCard";
import "./Dashboard.css";

const { Title, Text } = Typography;

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
            render: (text: string) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                        style={{
                            backgroundColor: `hsl(${text.length * 10}, 70%, 50%)`,
                            marginRight: "8px",
                        }}
                    >
                        {text.charAt(0)}
                    </Avatar>
                    <Text strong>{text}</Text>
                </div>
            ),
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (text: string) => <Text>{text}</Text>,
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
            render: (text: string) => (
                <Text type="secondary" style={{ fontSize: "13px" }}>
                    {text}
                </Text>
            ),
        },
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <Title level={2} className="dashboard-title">
                    Dashboard
                </Title>
                <p className="dashboard-subtitle">Welcome to your admin dashboard</p>
            </div>

            <Row gutter={[24, 24]} className="stats-container">
                {stats.map((stat, index) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                        <Card
                            variant="borderless"
                            className="stat-card"
                            style={{ "--card-accent-color": stat.color } as React.CSSProperties}
                        >
                            <div className="stat-card-content">
                                <div className="stat-card-header">
                                    <div>
                                        <h4 className="stat-title">{stat.title}</h4>
                                        <Statistic
                                            value={stat.value}
                                            precision={0}
                                            prefix={stat.prefix}
                                            className="stat-value"
                                            valueStyle={{ color: stat.color, fontWeight: "bold" }}
                                        />
                                    </div>
                                    <div
                                        className="stat-icon-container"
                                        style={{ backgroundColor: `${stat.color}15` }}
                                    >
                                        <span className="stat-icon" style={{ color: stat.color }}>
                                            {stat.icon}
                                        </span>
                                    </div>
                                </div>
                                <div className="stat-footer">
                                    <div
                                        className={`stat-trend ${
                                            stat.increase >= 0 ? "trend-up" : "trend-down"
                                        }`}
                                    >
                                        <span className="trend-icon">
                                            {stat.increase >= 0 ? (
                                                <ArrowUpOutlined />
                                            ) : (
                                                <ArrowDownOutlined />
                                            )}
                                        </span>
                                        {Math.abs(stat.increase)}%
                                    </div>
                                    <span className="trend-period">Since last month</span>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Card className="activities-card" variant="borderless">
                        <div className="activities-header">
                            <h3 className="activities-title">Recent Activities</h3>
                            <Button type="link" className="view-all-btn">
                                View All <RightOutlined />
                            </Button>
                        </div>
                        <Table
                            dataSource={recentActivities}
                            columns={columns}
                            pagination={false}
                            className="activities-table"
                            rowKey="key"
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <UserInfoCard />
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
