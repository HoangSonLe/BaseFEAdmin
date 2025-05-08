import React from "react";
import { Typography, Card, Divider } from "antd";
import { Image } from "../../components/common";

const { Title, Paragraph } = Typography;

const ImageComponents: React.FC = () => {
    return (
        <div className="component-library">
            <Title level={2}>Image Components</Title>
            <Paragraph>
                This page showcases the image components used throughout the application.
            </Paragraph>

            <Divider orientation="left">Image Component</Divider>
            <Card variant="outlined" className="mb-8">
                <Title level={4}>Image</Title>
                <Paragraph>
                    A versatile image component with preview functionality and various styling
                    options.
                </Paragraph>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div>
                        <Title level={5}>Basic Image with Preview</Title>
                        <Image
                            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=300&h=300&auto=format&fit=crop"
                            alt="Sample image"
                            width={200}
                        />
                    </div>

                    <div>
                        <Title level={5}>Bordered Image</Title>
                        <Image
                            src="https://images.unsplash.com/photo-1618588507085-c79565432917?q=80&w=300&h=300&auto=format&fit=crop"
                            alt="Sample image"
                            width={200}
                            bordered
                            borderRadius="8px"
                        />
                    </div>

                    <div>
                        <Title level={5}>Circular Image</Title>
                        <Image
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&h=300&auto=format&fit=crop"
                            alt="Sample image"
                            width={200}
                            circular
                            shadow
                        />
                    </div>

                    <div>
                        <Title level={5}>Image with Zoom Effect</Title>
                        <Image
                            src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=300&h=300&auto=format&fit=crop"
                            alt="Sample image"
                            width={200}
                            zoomEffect
                            borderRadius="8px"
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ImageComponents;
