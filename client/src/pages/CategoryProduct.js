import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography } from 'antd';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/cart';
const { Title, Text } = Typography;

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <Title level={3} style={{ textAlign: 'center', marginTop: '20px' }}>
          Category - {category?.name}
        </Title>
        <Text
          type="secondary"
          style={{
            display: 'block',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          {products?.length} result{products?.length > 1 ? 's' : ''} found
        </Text>
        <div className="row">
          <div className="col-md-9 offset-1">
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
