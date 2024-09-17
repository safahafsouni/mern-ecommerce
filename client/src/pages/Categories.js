import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';
import { TagsOutlined } from '@ant-design/icons'; // Example icon
import useCategory from '../hooks/useCategory';
import Layout from '../components/Layout/Layout';

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories">
      <div className="container mt-5">
        <div className="row">
          {categories.map((c) => (
            <div key={c._id} className="col-md-4 col-lg-3 mb-4">
              <Card
                hoverable
                style={{
                  borderRadius: '12px',
                  textAlign: 'center',
                  backgroundColor: '#f0f8ff', // Lighter background color
                }}
              >
                <TagsOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                <h3 style={{ color: '#000', margin: '10px 0' }}>{c.name}</h3>
                <Link to={`/category/${c.slug}`}>
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    style={{
                      backgroundColor: '#ff4d4f',
                      borderColor: '#ff4d4f',
                      width: '100%',
                    }}
                  >
                    View Category
                  </Button>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
