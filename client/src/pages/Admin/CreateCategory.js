import React, { useEffect, useState } from 'react';
import Layout from './../../components/Layout/Layout';
import AdminMenu from './../../components/Layout/AdminMenu';
import { toast } from 'react-toastify';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal, Table, Button } from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/category/create-category', {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created successfully`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in input form');
    }
  };

  // Fetch All Categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/all');
      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Update Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated successfully`);
        setSelected(null);
        setUpdatedName('');
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  // Delete Category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success('Category is deleted successfully');
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  // Define columns for Ant Design Table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            style={{
              backgroundColor: '#52c41a',
              color: '#fff',
              border: 'none',
              marginRight: '8px',
            }} // Green color for Edit
            onClick={() => {
              setVisible(true);
              setUpdatedName(record.name);
              setSelected(record);
            }}
          >
            Edit
          </Button>
          <Button
            style={{
              backgroundColor: '#ff4d4f',
              color: '#fff',
              border: 'none',
            }} // Red color for Delete
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  // Ant Design Table pagination configuration
  const paginationConfig = {
    pageSize: 5,
  };

  return (
    <Layout title={'Dashboard - Create Category'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                buttonText={'Add Category'}
                buttonStyle={{ backgroundColor: '#1890ff', color: '#fff' }} // Blue color for Add Category
              />
            </div>
            <div className="w-75">
              <Table
                columns={columns}
                dataSource={categories}
                pagination={paginationConfig}
                rowKey={(record) => record._id}
              />
            </div>
            <Modal
              title="Update Category"
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
                buttonText={'Save'}
                buttonStyle={{ backgroundColor: '#1890ff', color: '#fff' }} // Blue color for Save
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
