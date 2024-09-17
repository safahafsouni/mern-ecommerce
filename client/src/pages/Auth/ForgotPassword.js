import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  // Form function
  const handleSubmit = async (values) => {
    try {
      const { email, newPassword } = values;
      const res = await axios.post('/api/v1/auth/forgot-password', {
        email,
        newPassword,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title={'Forgot Password - Ecommerce App'}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Card
          title="RESET PASSWORD"
          style={{ width: 400, backgroundColor: '#fff0f6' }} // Different background color
        >
          <Form
            onFinish={handleSubmit}
            initialValues={{ email, newPassword }}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                type="email"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: 'Please input your new password!' },
              ]}
            >
              <Input.Password
                placeholder="Enter Your New Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                RESET
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Layout>
  );
}

export default ForgotPassword;
