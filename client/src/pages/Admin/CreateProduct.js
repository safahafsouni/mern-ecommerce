import React, { useEffect, useState } from 'react';
import Layout from './../../components/Layout/Layout';
import AdminMenu from './../../components/Layout/AdminMenu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
//!  extracting the Option property from the Select object.
//? Option can now be used directly as a standalone component without having to reference Select.Option every time.
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState('');
  const [photo, setPhoto] = useState('');

  // get all categories
  const getAllCategories = async () => {
    const { data } = await axios.get('/api/v1/category/all');
    if (data?.success) {
      setCategories(data.categories);
    }
    try {
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch categories');
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  // create product function
  const handleCreate = async (e) => {
    // is used to prevent the default behavior of form submission, which would reload the page.
    // This keeps the user on the same page.
    e.preventDefault();
    try {
      // The FormData object (productData) is created to hold the product details , which can include both files and text.
      // This allows for sending multipart/form-data in the HTTP request.
      const productData = new FormData();
      // FormData.append() is used to add the different fields (name, description, etc.) to the FormData object.
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('quantity', quantity);
      productData.append('photo', photo);
      productData.append('category', category);
      const { data } = axios.post(
        '/api/v1/product/create-product',
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success('Product Created Successfully');
        navigate('/dashboard/admin/products');
      }
    } catch (error) {
      console.log(error);
      toast.error('something went wrong');
    }
  };
  return (
    <Layout title={'Dashboard - Create Product'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                variant={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                //! For the Select component from the antd library, the onChange handler receives the selected value directly,
                //! not an event object.
                onChange={(value) => {
                  setCategory(value); // Sets the selected category's ID in the state
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : 'Upload Photo'}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])} // Sets the uploaded file in the state
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      // URL.createObjectURL is a JavaScript method that creates a temporary URL representing a file
                      // The <img> tag's src attribute is set to the result of URL.createObjectURL(photo), which allows the browser to display
                      // the image immediately before it has been uploaded to the server.
                      // that belongs to the URL interface in the browser's Web API.
                      src={URL.createObjectURL(photo)} // Previews the selected photo
                      alt="product_photo"
                      height={'200px'}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)} // Sets the product name in the state
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)} // Sets the product description
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)} // Sets the product price
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)} // Sets the product quantity
                />
              </div>
              <div className="mb-3">
                <Select
                  variant={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }} // Sets the shipping status
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-info" onClick={handleCreate}>
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
