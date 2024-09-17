import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import { Card, Form, Input, Button } from 'antd';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Form function
  const handleSubmit = async (values) => {
    try {
      const { email, password } = values;
      const res = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || '/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title={'Login - Ecommerce App'}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Card
          title="LOGIN FORM"
          style={{ width: 400, backgroundColor: '#f0f2f5' }} // Bright background color
        >
          <Form
            onFinish={handleSubmit}
            initialValues={{ email, password }}
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
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="link"
                onClick={() => {
                  navigate('/forgot-password');
                }}
              >
                Forgot Password
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                LOGIN
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Layout>
  );
}

export default Login;
