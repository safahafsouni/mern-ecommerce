import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Table } from 'antd';

function Products() {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/users/all');
      console.log('Fetched users:', data.users);
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong');
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: '#',
      key: 'index',
      render: (_, __, index) => index + 1,
      width: 60,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  // Ant Design Table pagination configuration
  const paginationConfig = {
    pageSize: 5,
  };

  return (
    <Layout title={'Dashboard - User List'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Users List</h1>
            <Table
              columns={columns}
              dataSource={users}
              pagination={paginationConfig}
              rowKey="_id" // Adjust this if your user object uses a different key for unique IDs
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
