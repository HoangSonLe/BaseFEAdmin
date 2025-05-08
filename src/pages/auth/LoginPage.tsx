import React from "react";
import { Form, Input, Button, Checkbox, Divider, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AuthPageWrapper from "./AuthPageWrapper";

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = (values: any) => {
    console.log("Login form values:", values);
  };

  return (
    <AuthPageWrapper 
      title="Login" 
      subtitle="This is how the login page looks when accessed directly."
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
          <Link to="/pages/forgot-password" className="forgot-password-link">
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
    </AuthPageWrapper>
  );
};

export default LoginPage;
