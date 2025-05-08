import React, { useState } from "react";
import { Form, Input, Button, Result, Typography } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AuthPageWrapper from "./AuthPageWrapper";

const { Title, Text, Paragraph } = Typography;

const ForgotPasswordPage: React.FC = () => {
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = (values: { email: string }) => {
    const { email } = values;
    setSubmittedEmail(email);
    setIsSubmitted(true);
  };

  return (
    <AuthPageWrapper 
      title="Forgot Password" 
      subtitle="This is how the forgot password page looks when accessed directly."
    >
      {!isSubmitted ? (
        <>
          <div className="auth-header">
            <Link to="/pages/login" className="back-to-login">
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
              <Link to="/pages/login">Back to Login</Link>
            </Button>,
          ]}
        />
      )}
    </AuthPageWrapper>
  );
};

export default ForgotPasswordPage;
