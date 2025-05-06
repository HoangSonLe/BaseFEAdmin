import React from 'react';
import { Card, Form, Input, Button, Switch, Tabs, Typography, Select, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const Settings: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <div>
      <div className="mb-6">
        <Title level={2}>Settings</Title>
        <p className="text-gray-500">Manage application settings</p>
      </div>

      <Card bordered={false}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="General" key="1">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                siteName: 'Admin Dashboard',
                siteDescription: 'Management system for your business',
                language: 'en',
                timezone: 'UTC+0',
                enableNotifications: true,
                enableDarkMode: false,
              }}
            >
              <Title level={4}>Site Settings</Title>
              <Form.Item
                name="siteName"
                label="Site Name"
                rules={[{ required: true, message: 'Please enter site name' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="siteDescription"
                label="Site Description"
              >
                <Input.TextArea rows={3} />
              </Form.Item>

              <Divider />
              <Title level={4}>Localization</Title>

              <Form.Item
                name="language"
                label="Language"
              >
                <Select>
                  <Option value="en">English</Option>
                  <Option value="fr">French</Option>
                  <Option value="es">Spanish</Option>
                  <Option value="de">German</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="timezone"
                label="Timezone"
              >
                <Select>
                  <Option value="UTC+0">UTC+0 (London, Lisbon)</Option>
                  <Option value="UTC+1">UTC+1 (Paris, Berlin)</Option>
                  <Option value="UTC+7">UTC+7 (Bangkok, Jakarta)</Option>
                  <Option value="UTC+8">UTC+8 (Singapore, Beijing)</Option>
                  <Option value="UTC-5">UTC-5 (New York, Toronto)</Option>
                  <Option value="UTC-8">UTC-8 (Los Angeles, Vancouver)</Option>
                </Select>
              </Form.Item>

              <Divider />
              <Title level={4}>Preferences</Title>

              <Form.Item
                name="enableNotifications"
                label="Enable Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                name="enableDarkMode"
                label="Enable Dark Mode"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  icon={<SaveOutlined />}
                >
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Security" key="2">
            <Form
              layout="vertical"
              initialValues={{
                requireTwoFactor: false,
                sessionTimeout: '30',
                passwordExpiry: 'never',
              }}
            >
              <Title level={4}>Security Settings</Title>
              <Form.Item
                name="requireTwoFactor"
                label="Require Two-Factor Authentication"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                name="sessionTimeout"
                label="Session Timeout (minutes)"
              >
                <Select>
                  <Option value="15">15 minutes</Option>
                  <Option value="30">30 minutes</Option>
                  <Option value="60">1 hour</Option>
                  <Option value="120">2 hours</Option>
                  <Option value="never">Never</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="passwordExpiry"
                label="Password Expiry"
              >
                <Select>
                  <Option value="30">30 days</Option>
                  <Option value="60">60 days</Option>
                  <Option value="90">90 days</Option>
                  <Option value="never">Never</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  icon={<SaveOutlined />}
                >
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Settings;
