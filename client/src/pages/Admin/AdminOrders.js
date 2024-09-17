import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import { Select, Table, Badge } from 'antd';

const { Option } = Select;

const AdminOrders = () => {
  const [statusOptions, setStatusOptions] = useState([
    'Not Processed',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/orders/all');
      setOrders(data?.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchOrders();
  }, [auth?.token]);

  const handleStatusChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      toast.success('Order status updated successfully');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Not Processed':
        return 'secondary';
      case 'Processing':
        return 'info';
      case 'Shipped':
        return 'primary';
      case 'Delivered':
        return 'success';
      case 'Cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const columns = [
    {
      title: 'Order #',
      dataIndex: '_id',
      key: '_id',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <div>
          <Badge
            count={status}
            style={{
              backgroundColor:
                getStatusBadge(status) === 'secondary'
                  ? '#d6d6d6'
                  : getStatusBadge(status) === 'info'
                  ? '#17a2b8'
                  : getStatusBadge(status) === 'primary'
                  ? '#007bff'
                  : getStatusBadge(status) === 'success'
                  ? '#28a745'
                  : '#dc3545',
              color: '#fff',
            }}
          />
          <Select
            variant={false}
            defaultValue={status}
            onChange={(value) => handleStatusChange(record._id, value)}
            style={{ marginLeft: 8 }}
          >
            {statusOptions.map((option, index) => (
              <Option key={index} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </div>
      ),
    },
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      key: 'buyer',
      render: (buyer) => buyer?.name || 'N/A',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => moment(date).fromNow(),
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      key: 'payment',
      render: (payment) => (
        <Badge
          count={payment?.success ? 'Success' : 'Failed'}
          style={{
            backgroundColor: payment?.success ? 'green' : 'red',
            color: '#fff',
          }}
        />
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'products',
      key: 'products',
      render: (products) => products?.length || 0,
    },
  ];

  return (
    <Layout title={'All Orders Data'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            <Table
              dataSource={orders}
              columns={columns}
              rowKey="_id"
              expandable={{
                expandedRowRender: (record) => (
                  <div className="container">
                    {record.products.map((product) => (
                      <div
                        className="row mb-2 p-2 card flex-row"
                        key={product._id}
                        style={{
                          border: '1px solid #ddd',
                          borderRadius: '5px',
                        }}
                      >
                        <div className="col-md-3">
                          <img
                            src={`/api/v1/product/product-photo/${product._id}`}
                            className="card-img-top"
                            alt={product.name}
                            style={{
                              width: '80px',
                              height: '80px',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                        <div className="col-md-9 d-flex flex-column justify-content-center">
                          <h5 style={{ margin: '0 0 5px 0' }}>
                            {product.name}
                          </h5>
                          <p style={{ margin: 0 }}>
                            <strong>Price:</strong> ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
