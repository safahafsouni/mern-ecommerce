import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, Button } from 'antd';
import { ShoppingCartOutlined, InfoCircleOutlined } from '@ant-design/icons';

const ProductCard = ({ product, cart, setCart }) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success('Item Added To Cart Successfully');
  };

  return (
    <Card
      hoverable
      style={{ width: 300, margin: '1rem' }}
      cover={
        <img
          alt={product.name}
          src={`/api/v1/product/product-photo/${product._id}`}
          style={{ width: '100%', height: '250px', objectFit: 'cover' }}
        />
      }
    >
      <Card.Meta
        title={product.name}
        description={`${product.description.substring(0, 30)}...`}
      />
      <p>Price: $ {product.price}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          type="primary"
          icon={<InfoCircleOutlined />}
          onClick={() => navigate(`/product/${product.slug}`)}
          style={{ marginRight: '8px' }} // Adds space between buttons
        >
          More Details
        </Button>
        <Button
          type="default"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
        >
          Add To Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
