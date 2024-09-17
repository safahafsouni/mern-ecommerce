import React, { useState, useEffect } from 'react';
import Layout from './../components/Layout/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/cart';
import { Row, Col, Image, Typography, Button, Divider, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-info/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Image
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            />
          </Col>
          <Col xs={24} md={12}>
            <Title level={1} style={{ fontSize: '2.5rem' }}>
              {product.name}
            </Title>
            <Paragraph style={{ fontSize: '1.25rem', lineHeight: '1.5' }}>
              {product.description}
            </Paragraph>
            <Title level={2} style={{ fontSize: '2rem' }}>
              ${product.price}
            </Title>
            <div className="mb-4">
              <span className="fw-bold text-muted">Category: </span>
              <Tag color="blue" style={{ fontSize: '1rem' }}>
                {product?.category?.name || 'Category Unavailable'}
              </Tag>
            </div>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              onClick={() => {
                const updatedCart = [...cart, product];
                setCart(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
              }}
              style={{ marginBottom: '20px' }}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col span={24}>
            <Title level={2} className="text-center">
              Similar Products
            </Title>
            {relatedProducts.length < 1 ? (
              <p className="text-center">No Similar Products found</p>
            ) : (
              <Row gutter={[16, 16]}>
                {relatedProducts.map((p) => (
                  <Col xs={24} sm={12} md={8} key={p._id}>
                    <ProductCard product={p} cart={cart} setCart={setCart} />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default ProductDetails;
