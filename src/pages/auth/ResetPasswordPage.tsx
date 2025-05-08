import React, { useState } from "react";
import { Form, Input, Button, Result, Typography } from "antd";
import { LockOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AuthPageWrapper from "./AuthPageWrapper";

const { Title, Text } = Typography;

const ResetPasswordPage: React.FC = () => {
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (values: { password: string; confirmPassword: string }) => {
    console.log("Reset password form values:", values);
    setIsSubmitted(true);
  };

  return (
    <AuthPageWrapper 
      title="Reset Password" 
      subtitle="This is how the reset password page looks when accessed directly."
    >
      {!isSubmitted ? (
        <>
          <div className="auth-header">
            <Link to="/pages/login" className="back-to-login">
              <ArrowLeftOutlined /> Back to Login
            </Link>
            <Title level={2} className="auth-title">Reset Password</Title>
            <Text className="auth-subtitle">
              Create a new password for your account
            </Text>
          </div>

          <Form
            form={form}
            name="resetPassword"
            layout="vertical"
            onFinish={handleSubmit}
            className="auth-form"
            initialValues={{ password: "", confirmPassword: "" }}
          >
            <Form.Item
              name="password"
              label="New Password"
              rules={[
                { required: true, message: "Please enter your new password" },
                { min: 8, message: "Password must be at least 8 characters" }
              ]}
              hasFeedback
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="New Password" 
                size="large" 
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("The two passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Confirm Password" 
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
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <Result
          status="success"
          title="Password Reset Successful"
          subTitle="Your password has been reset successfully."
          extra={[
            <Button 
              type="primary" 
              key="login" 
              onClick={() => {
                form.resetFields();
                setIsSubmitted(false);
              }}
            >
              Reset Another Password
            </Button>,
            <Button key="login">
              <Link to="/pages/login">Go to Login</Link>
            </Button>
          ]}
        />
      )}
    </AuthPageWrapper>
  );
};

export default ResetPasswordPage;
