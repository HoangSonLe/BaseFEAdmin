import React, { useState, useRef } from "react";
import { Typography, Card, Divider, Button, Space, Alert } from "antd";
import ClientSideCustomEditor from "../components/common/TinyMCE/ClientSideCustomEditor";
import type { UncontrolledEditorRef } from "../components/common/TinyMCE/UncontrolledEditor";

const { Title, Paragraph, Text } = Typography;

const sampleContent = `
<h2>Welcome to the Richtext Editor</h2>
<p>This is a <strong>rich text editor</strong> that allows you to create formatted content for your application.</p>
<p>You can:</p>
<ul>
  <li>Format text with <em>italic</em>, <strong>bold</strong>, and <u>underline</u></li>
  <li>Create ordered and unordered lists</li>
  <li>Insert images and tables</li>
  <li>Add links to external resources</li>
</ul>
<p>Try editing this content to see how the editor works!</p>
`;

const Richtext: React.FC = () => {
    const [content, setContent] = useState(sampleContent);
    const editorRef = useRef<UncontrolledEditorRef>(null);

    const handleEditorChange = (newContent: string) => {
        setContent(newContent);
    };

    const handleReset = () => {
        if (editorRef.current) {
            editorRef.current.setContent(sampleContent);
        }
    };

    const handleClear = () => {
        if (editorRef.current) {
            editorRef.current.setContent("");
        }
    };

    return (
        <div className="richtext-page">
            <Title level={2}>Richtext Editor</Title>
            <Paragraph>
                Create and edit rich text content with formatting, tables, images, and more.
            </Paragraph>

            <Alert
                message="TinyMCE Editor"
                description="This editor provides comprehensive text editing capabilities without requiring an API key."
                type="info"
                showIcon
                className="mb-6"
            />

            <Card variant="outlined" className="mb-8">
                <Space className="mb-4">
                    <Button onClick={handleReset}>Reset Content</Button>
                    <Button onClick={handleClear}>Clear Content</Button>
                </Space>
                
                <div className="mb-4">
                    <ClientSideCustomEditor 
                        ref={editorRef}
                        initialValue={content} 
                        onChange={handleEditorChange} 
                        height="400px"
                    />
                </div>
                
                <Divider />
                
                <Title level={4}>Preview</Title>
                <div 
                    className="p-4 border border-gray-200 rounded"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </Card>

            <Card variant="outlined" className="mb-8">
                <Title level={4}>Usage Instructions</Title>
                <Paragraph>
                    The Richtext Editor provides a user-friendly interface for creating formatted content:
                </Paragraph>
                <ul className="list-disc pl-6 mb-4">
                    <li>Use the toolbar buttons to format text, create lists, insert tables, etc.</li>
                    <li>Insert images by clicking the image button and uploading from your device</li>
                    <li>Create tables with customizable rows and columns</li>
                    <li>Use the fullscreen mode for a larger editing area</li>
                </ul>
                
                <Title level={5}>Implementation</Title>
                <Paragraph>
                    To use this editor in your own components:
                </Paragraph>
                <div className="p-4 bg-gray-100 rounded">
                    <Text code>
                        {`import ClientSideCustomEditor from "../components/common/TinyMCE/ClientSideCustomEditor";`}
                    </Text>
                    <br />
                    <Text code>
                        {`<ClientSideCustomEditor initialValue={content} onChange={handleChange} height="300px" />`}
                    </Text>
                </div>
            </Card>
        </div>
    );
};

export default Richtext;
