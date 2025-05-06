import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  UserOutlined, 
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="light"
        style={{
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div className="flex justify-center items-center h-16 bg-blue-600 text-white">
          <h1 className={`text-xl font-bold ${collapsed ? 'hidden' : 'block'}`}>Admin Panel</h1>
          {collapsed && <span className="text-xl font-bold">AP</span>}
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: '2',
              icon: <TeamOutlined />,
              label: <Link to="/users">Users</Link>,
            },
            {
              key: '3',
              icon: <SettingOutlined />,
              label: <Link to="/settings">Settings</Link>,
            },
            {
              key: '4',
              icon: <LogoutOutlined />,
              label: 'Logout',
              className: 'mt-auto',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: 0, 
          background: token.colorBgContainer,
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="flex items-center mr-4">
            <span className="mr-2">Admin User</span>
            <UserOutlined className="text-lg" />
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
