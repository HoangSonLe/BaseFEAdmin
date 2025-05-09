import React, { useState, useRef } from "react";
import { Typography, Card, Divider, Button, Space, Tabs, Alert } from "antd";
import ClientSideCustomEditor from "../../components/common/TinyMCE/ClientSideCustomEditor";
import type { UncontrolledEditorRef } from "../../components/common/TinyMCE/UncontrolledEditor";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const sampleContent = `
<h2>Welcome to the TinyMCE Editor</h2>
<p>This is a <strong>rich text editor</strong> that allows you to:</p>
<ul>
  <li>Format text with <em>italic</em>, <strong>bold</strong>, and <u>underline</u></li>
  <li>Create ordered and unordered lists</li>
  <li>Insert images and tables</li>
  <li>Add links to external resources</li>
</ul>
<p>Try editing this content to see how the editor works!</p>
<table style="border-collapse: collapse; width: 100%;" border="1">
  <thead>
    <tr>
      <th>Feature</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Text Formatting</td>
      <td>Bold, italic, underline, strikethrough, etc.</td>
    </tr>
    <tr>
      <td>Lists</td>
      <td>Ordered and unordered lists with indentation</td>
    </tr>
    <tr>
      <td>Media</td>
      <td>Insert images and videos</td>
    </tr>
  </tbody>
</table>
`;

const EditorComponents: React.FC = () => {
    const [basicContent, setBasicContent] = useState(
        "<p>Initial content for the editor. Try editing this text!</p>"
    );
    const [advancedContent, setAdvancedContent] = useState(sampleContent);
    const editorRef = useRef<UncontrolledEditorRef>(null);

    const handleBasicEditorChange = (newContent: string) => {
        setBasicContent(newContent);
    };

    const handleAdvancedEditorChange = (newContent: string) => {
        setAdvancedContent(newContent);
    };

    const handleReset = () => {
        if (editorRef.current) {
            editorRef.current.setContent(sampleContent);
        }
    };

    return (
        <div className="component-library">
            <Title level={2}>Rich Text Editor Components</Title>
            <Paragraph>
                This page showcases the rich text editor components used throughout the application.
            </Paragraph>

            <Alert
                message="TinyMCE Editor"
                description="This is a rich text editor component based on TinyMCE that works without requiring an API key. It provides comprehensive text editing capabilities including formatting, tables, images, and more."
                type="info"
                showIcon
                className="mb-6"
            />

            <Tabs defaultActiveKey="1" className="mb-6">
                <TabPane tab="Basic Example" key="1">
                    <Card variant="outlined" className="mb-8">
                        <Title level={4}>Basic Editor</Title>
                        <Paragraph>
                            A simple implementation of the TinyMCE editor with basic configuration.
                        </Paragraph>

                        <div className="mb-4">
                            <ClientSideCustomEditor
                                initialValue={basicContent}
                                onChange={handleBasicEditorChange}
                                height="200px"
                            />
                        </div>

                        <Title level={5} className="mt-4">
                            Editor Output
                        </Title>
                        <Paragraph>The HTML content from the editor:</Paragraph>
                        <div className="p-4 bg-gray-100 rounded overflow-auto max-h-40">
                            <pre className="text-xs">{basicContent}</pre>
                        </div>

                        <Title level={5} className="mt-4">
                            Rendered Output
                        </Title>
                        <Paragraph>How the content looks when rendered:</Paragraph>
                        <div
                            className="p-4 border border-gray-200 rounded"
                            dangerouslySetInnerHTML={{ __html: basicContent }}
                        />
                    </Card>
                </TabPane>

                <TabPane tab="Advanced Example" key="2">
                    <Card variant="outlined" className="mb-8">
                        <Title level={4}>Advanced Editor with Reference</Title>
                        <Paragraph>
                            An advanced implementation with a reference to control the editor
                            programmatically.
                        </Paragraph>

                        <Space className="mb-4">
                            <Button onClick={handleReset}>Reset Content</Button>
                            <Button
                                onClick={() => {
                                    if (editorRef.current) {
                                        editorRef.current.setContent("");
                                    }
                                }}
                            >
                                Clear Content
                            </Button>
                        </Space>

                        <div className="mb-4">
                            <ClientSideCustomEditor
                                ref={editorRef}
                                initialValue={advancedContent}
                                onChange={handleAdvancedEditorChange}
                                height="300px"
                                morePlugins={["paste", "code"]}
                            />
                        </div>

                        <Title level={5} className="mt-4">
                            Usage in Forms
                        </Title>
                        <Paragraph>
                            The TinyMCE editor can be integrated into forms for content editing. Use
                            the onChange handler to update your form state, and the ref to access
                            editor methods like getContent() and setContent().
                        </Paragraph>

                        <div className="p-4 bg-gray-100 rounded">
                            <Text code>
                                {`const editorRef = useRef<UncontrolledEditorRef>(null);`}
                            </Text>
                            <br />
                            <Text code>
                                {`<ClientSideCustomEditor ref={editorRef} initialValue={content} onChange={handleChange} />`}
                            </Text>
                            <br />
                            <Text code>{`// To get content: editorRef.current?.getContent()`}</Text>
                            <br />
                            <Text code>
                                {`// To set content: editorRef.current?.setContent(newContent)`}
                            </Text>
                        </div>
                    </Card>
                </TabPane>
            </Tabs>

            <Divider orientation="left">Implementation Details</Divider>
            <Card variant="outlined" className="mb-8">
                <Title level={4}>Component Structure</Title>
                <Paragraph>
                    The TinyMCE editor implementation consists of two main components:
                </Paragraph>
                <ul className="list-disc pl-6 mb-4">
                    <li>
                        <Text strong>UncontrolledEditor</Text> - The core editor component that
                        wraps TinyMCE
                    </li>
                    <li>
                        <Text strong>ClientSideCustomEditor</Text> - A wrapper that uses React.lazy
                        for dynamic loading
                    </li>
                </ul>

                <Title level={5}>Usage Instructions</Title>
                <Paragraph>
                    The Richtext Editor provides a user-friendly interface for creating formatted
                    content:
                </Paragraph>
                <ul className="list-disc pl-6 mb-4">
                    <li>
                        Use the toolbar buttons to format text, create lists, insert tables, etc.
                    </li>
                    <li>
                        Insert images by clicking the image button and uploading from your device
                    </li>
                    <li>Create tables with customizable rows and columns</li>
                    <li>Use the fullscreen mode for a larger editing area</li>
                </ul>

                <Title level={5}>Props</Title>
                <ul className="list-disc pl-6">
                    <li>
                        <Text strong>initialValue</Text> - The initial HTML content
                    </li>
                    <li>
                        <Text strong>value</Text> - (Optional) Controlled value
                    </li>
                    <li>
                        <Text strong>onChange</Text> - Callback when content changes
                    </li>
                    <li>
                        <Text strong>height</Text> - (Optional) Editor height
                    </li>
                    <li>
                        <Text strong>morePlugins</Text> - (Optional) Additional TinyMCE plugins to
                        load
                    </li>
                </ul>
            </Card>
        </div>
    );
};

export default EditorComponents;
