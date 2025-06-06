import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Checkbox, Divider, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggle from "../../components/common/ThemeToggle";
import MockUserInfo from "../../components/auth/MockUserInfo";
import "./Auth.css";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();
  const [form] = Form.useForm();
  const [rememberMe, setRememberMe] = useState(false);

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    await login({ email, password, rememberMe });
  };

  return (
    <div className={`auth-container ${theme}`}>
      <div className="auth-theme-toggle">
        <ThemeToggle showLabel />
      </div>
      <div className="auth-content">
        <Row gutter={[24, 24]} justify="center" align="top">
          <Col xs={24} sm={24} md={12} lg={10} xl={8}>
            <Card
              className="auth-card"
              variant="outlined"
            >
          <div className="auth-header">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="auth-logo" 
              onError={(e) => {
                // Fallback if logo image doesn't exist
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.style.display = 'none';
              }}
            />
            <Title level={2} className="auth-title">Welcome Back</Title>
            <Text className="auth-subtitle">Sign in to your account</Text>
          </div>

          <Form
            form={form}
            name="login"
            layout="vertical"
            onFinish={handleSubmit}
            className="auth-form"
            initialValues={{ email: "", password: "" }}
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
                prefix={<UserOutlined />} 
                placeholder="Email" 
                size="large" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Password" 
                size="large" 
              />
            </Form.Item>

            <div className="auth-form-options">
              <Checkbox 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)}
              >
                Remember me
              </Checkbox>
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot password?
              </Link>
            </div>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="auth-submit-button" 
                size="large" 
                block
                loading={isLoading}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <Divider plain>Don't have an account?</Divider>
          
          <div className="auth-footer">
            <Button type="default" size="large" block>
              Contact Administrator
            </Button>
          </div>
        </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={14} xl={16}>
            <MockUserInfo />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
