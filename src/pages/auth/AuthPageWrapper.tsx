import React from "react";
import { Card, Typography } from "antd";
import { useTheme } from "../../contexts/ThemeContext";
import "./Auth.css";

const { Title, Text } = Typography;

interface AuthPageWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * A wrapper component for displaying auth pages within the main layout
 * This is used for the /pages/login, /pages/forgot-password, etc. routes
 * that are displayed within the main layout for demonstration purposes
 */
const AuthPageWrapper: React.FC<AuthPageWrapperProps> = ({ 
  title, 
  subtitle, 
  children 
}) => {
  const { theme } = useTheme();

  return (
    <div className="auth-page-wrapper">
      <Title level={2}>Auth Page Example: {title}</Title>
      {subtitle && <Text className="auth-page-subtitle">{subtitle}</Text>}
      
      <div className="auth-page-container">
        <div className={`auth-container ${theme}`} style={{ minHeight: 'auto' }}>
          <div className="auth-content" style={{ padding: '40px 0' }}>
            <Card 
              className="auth-card" 
              bordered={false}
            >
              {children}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPageWrapper;
