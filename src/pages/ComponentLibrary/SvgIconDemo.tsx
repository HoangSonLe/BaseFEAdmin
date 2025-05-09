import React, { useState } from "react";
import { Card, Row, Col, Input, Space, Typography, Divider } from "antd";
import BasicIcon from "../../components/common/BasicIcon";

const { Title, Paragraph } = Typography;

const SvgIconDemo: React.FC = () => {
    const [iconSize, setIconSize] = useState<number>(24);
    const [iconColor, setIconColor] = useState<string>("#1677ff");

    return (
        <div className="component-library">
            <Title level={2}>SVG Icon Components</Title>
            <Paragraph>This page demonstrates how to use SVG icons in React components.</Paragraph>

            <Divider orientation="left">Using BasicIcon Component</Divider>
            <Card variant="outlined" className="mb-8">
                <Title level={4}>BasicIcon Component</Title>
                <Paragraph>Using a simple React component with inline SVG.</Paragraph>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <div>
                                <label>Size:</label>
                                <Input
                                    type="number"
                                    style={{ width: 100, marginLeft: 8 }}
                                    value={iconSize}
                                    onChange={(e) => setIconSize(Number(e.target.value))}
                                />
                            </div>
                            <div>
                                <label>Color:</label>
                                <Input
                                    type="color"
                                    style={{ width: 100, marginLeft: 8 }}
                                    value={iconColor}
                                    onChange={(e) => setIconColor(e.target.value)}
                                />
                            </div>
                        </Space>
                    </Col>
                    <Col span={24}>
                        <Card title="Preview" style={{ textAlign: "center", padding: 24 }}>
                            <BasicIcon size={iconSize} color={iconColor} style={{ margin: 16 }} />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Paragraph>
                            <pre>
                                {`// Import the BasicIcon component
import BasicIcon from "../../components/common/BasicIcon";

// Use in your component
<BasicIcon
  size={${iconSize}}
  color="${iconColor}"
/>`}
                            </pre>
                        </Paragraph>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default SvgIconDemo;
