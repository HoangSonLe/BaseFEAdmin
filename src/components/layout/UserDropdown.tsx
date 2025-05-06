import React, { useState } from 'react';
import { Avatar, Dropdown } from 'antd';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';

const UserDropdown: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "1",
            label: (
              <div className="user-profile-container">
                <div
                  className="flex items-center"
                  style={{ gap: "10px" }}
                >
                  <Avatar size={34} className="user-avatar">
                    AU
                  </Avatar>
                  <div>
                    <div className="username">Default User</div>
                    <div className="user-handle">@uxuidesigner</div>
                  </div>
                </div>
              </div>
            ),
            className: "user-profile-item",
          },
          {
            type: "divider",
          },
          {
            key: "2",
            label: (
              <div className="logout-container">
                <div className="logout-item">
                  <span className="logout-icon">
                    <LogoutOutlined />
                  </span>
                  <span>Log Out</span>
                </div>
              </div>
            ),
            onClick: () => console.log("Logout clicked"),
          },
        ],
      }}
      placement="bottomRight"
      getPopupContainer={(trigger) => trigger.parentElement || document.body}
      overlayStyle={{ position: "fixed" }}
      trigger={["click"]}
      onOpenChange={(open) => setDropdownOpen(open)}
      open={dropdownOpen}
      dropdownRender={(menu) => <div className="user-dropdown-menu">{menu}</div>}
    >
      <div className="cursor-pointer header-user-dropdown">
        <Avatar size={26} className="header-avatar">
          AU
        </Avatar>
        <span className="header-user-text">Admin User</span>
        <DownOutlined
          className={`dropdown-arrow ${
            dropdownOpen ? "dropdown-arrow-open" : ""
          }`}
        />
      </div>
    </Dropdown>
  );
};

export default UserDropdown;
