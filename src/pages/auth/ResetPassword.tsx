import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Result } from "antd";
import { LockOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggle from "../../components/common/ThemeToggle";
import "./Auth.css";

const { Title, Text, Paragraph } = Typography;

const ResetPassword: React.FC = () => {
  const { resetPassword, isLoading } = useAuth();
  const { theme } = useTheme();
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const handleSubmit = async (values: { password: string; confirmPassword: string }) => {
    const { password } = values;
    
    if (!token) {
      form.setFields([
        {
          name: "password",
          errors: ["Invalid reset token. Please request a new password reset."],
        },
      ]);
      return;
    }
    
    const success = await resetPassword(token, password);
    if (success) {
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
                    loading={isLoading}
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
                  onClick={() => navigate("/login")}
                >
                  Go to Login
                </Button>
              ]}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
