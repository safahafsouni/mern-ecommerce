import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Button, Card, Checkbox, Divider, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0); // Total products
  const [page, setPage] = useState(1); // Current page
  const [perPage] = useState(3); // Number of products per page
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/all');
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get total products and calculate total pages
  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/product-count');
      setTotal(data?.total);
      setTotalPages(Math.ceil(data?.total / perPage));
    } catch (error) {
      console.log(error);
    }
  };

  // Get products by page
  const getAllProducts = async (page) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
    getAllProducts(page);
  }, [page]);

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts(page);
  }, [checked.length, radio.length, page]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post('/api/v1/product/product-filters', {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={'All Products - Best Offers'}>
      {/* banner image */}
      <img
        src="/images/banner.jpg"
        className="banner-img"
        alt="bannerimage"
        width={'100%'}
        height={'450px'}
      />
      {/* banner image */}
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <Card title="Filter By Category">
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </Card>

          <Divider />

          <Card title="Filter By Price">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </Card>

          <Divider />

          <div className="d-flex flex-column mt-3 mb-5">
            <Button
              type="primary"
              danger
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </Button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                cart={cart}
                setCart={setCart}
              />
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="m-2 p-3 d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                </li>

                <li className="page-item">
                  <span className="page-link">
                    Page {page} of {totalPages}
                  </span>
                </li>

                <li
                  className={`page-item ${
                    page >= totalPages ? 'disabled' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
