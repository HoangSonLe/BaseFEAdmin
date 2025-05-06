import React from 'react';
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

interface HeaderToggleProps {
  collapsed: boolean;
  onToggle: () => void;
}

const HeaderToggle: React.FC<HeaderToggleProps> = ({ collapsed, onToggle }) => {
  return (
    <Button
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={onToggle}
      style={{
        fontSize: "16px",
        width: 64,
        height: 64,
      }}
    />
  );
};

export default HeaderToggle;
