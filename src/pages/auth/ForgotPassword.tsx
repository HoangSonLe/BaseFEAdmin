import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Result } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggle from "../../components/common/ThemeToggle";
import "./Auth.css";

const { Title, Text, Paragraph } = Typography;

const ForgotPassword: React.FC = () => {
  const { forgotPassword, isLoading } = useAuth();
  const { theme } = useTheme();
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = async (values: { email: string }) => {
    const { email } = values;
    const success = await forgotPassword(email);
    if (success) {
      setSubmittedEmail(email);
      setIsSubmitted(true);
    }
  };

  return (
    <div className={`auth-container ${theme}`}>
      <div className="auth-theme-toggle">
        <ThemeToggle showLabel />
      </div>
      <div className="auth-content">
        <Card 
          className="auth-card" 
          bordered={false}
        >
          {!isSubmitted ? (
            <>
              <div className="auth-header">
                <Link to="/login" className="back-to-login">
                  <ArrowLeftOutlined /> Back to Login
                </Link>
                <Title level={2} className="auth-title">Forgot Password</Title>
                <Text className="auth-subtitle">
                  Enter your email and we'll send you instructions to reset your password
                </Text>
              </div>

              <Form
                form={form}
                name="forgotPassword"
                layout="vertical"
                onFinish={handleSubmit}
                className="auth-form"
                initialValues={{ email: "" }}
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" }
                  ]}
                >
                  <Input 
                    prefix={<MailOutlined />} 
                    placeholder="Email" 
                    size="large" 
                  />
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="auth-submit-button" 
                    size="large" 
                    block
                    loading={isLoading}
                  >
                    Send Reset Instructions
                  </Button>
                </Form.Item>
              </Form>
            </>
          ) : (
            <Result
              status="success"
              title="Reset Instructions Sent"
              subTitle={
                <div>
                  <Paragraph>
                    We've sent password reset instructions to:
                  </Paragraph>
                  <Paragraph strong>
                    {submittedEmail}
                  </Paragraph>
                  <Paragraph>
                    Please check your email and follow the instructions to reset your password.
                  </Paragraph>
                </div>
              }
              extra={[
                <Button 
                  type="primary" 
                  key="back" 
                  onClick={() => {
                    setIsSubmitted(false);
                    form.resetFields();
                  }}
                >
                  Try Another Email
                </Button>,
                <Button key="login">
                  <Link to="/login">Back to Login</Link>
                </Button>,
              ]}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
