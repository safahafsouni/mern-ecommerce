import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Modal, Table } from 'antd';

function Products() {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/all');
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong');
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const showModal = (description) => {
    setModalContent(description);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: '#',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => (
        <img
          src={`/api/v1/product/product-photo/${record._id}`}
          alt={record.name}
          style={{
            width: '50px',
            height: '50px',
            objectFit: 'cover',
          }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) =>
        text.length > 50 ? (
          <>
            {text.slice(0, 50)}...
            <Button
              type="link"
              onClick={() => showModal(text)}
              style={{ padding: 0 }}
            >
              Read More
            </Button>
          </>
        ) : (
          text
        ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `$${text}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Link
          to={`/dashboard/admin/product/${record.slug}`}
          className="btn btn-primary btn-sm"
        >
          View
        </Link>
      ),
    },
  ];

  // Ant Design Table pagination configuration
  const paginationConfig = {
    pageSize: 5,
  };

  return (
    <Layout title={'Dashboard - Product List'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <Table
              columns={columns}
              dataSource={products}
              pagination={paginationConfig}
              rowKey={(record) => record._id}
            />
            {/* Ant Design Modal */}
            <Modal
              title="Product Description"
              open={modalVisible}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Close
                </Button>,
              ]}
            >
              <p>{modalContent}</p>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
