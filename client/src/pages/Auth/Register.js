import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  // Form function
  const handleSubmit = async (values) => {
    try {
      const { name, email, password, phone, address } = values;
      const res = await axios.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
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
    <Layout title={'Register - Ecommerce App'}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Card
          title="REGISTER FORM"
          style={{ width: 400, backgroundColor: '#e6fffb' }} // Different background color
        >
          <Form
            onFinish={handleSubmit}
            initialValues={{ name, email, password, phone, address }}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
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
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: 'Please input your phone number!' },
              ]}
            >
              <Input
                placeholder="Enter Your Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                { required: true, message: 'Please input your address!' },
              ]}
            >
              <Input
                placeholder="Enter Your Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                REGISTER
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Layout>
  );
}

export default Register;
