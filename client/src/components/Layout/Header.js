import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge, Menu, Dropdown, Row, Col } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

function Header() {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    toast.success('User logged out successfully');
  };

  // Dropdown menu for user dashboard and logout
  const userMenu = (
    <Menu>
      <Menu.Item>
        <NavLink
          to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
          style={{ color: 'black', textDecoration: 'none' }}
        >
          Dashboard
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink
          onClick={handleLogout}
          to="/login"
          style={{ color: 'black', textDecoration: 'none' }}
        >
          Logout
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  // Dropdown menu for categories
  const categoryMenu = (
    <Menu>
      <Menu.Item>
        <NavLink
          to="/categories"
          style={{ color: 'black', textDecoration: 'none' }}
        >
          All Categories
        </NavLink>
      </Menu.Item>
      {categories?.map((c) => (
        <Menu.Item key={c.slug}>
          <NavLink
            to={`/category/${c.slug}`}
            style={{ color: 'black', textDecoration: 'none' }}
          >
            {c.name}
          </NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <nav>
      <Row
        align="middle"
        justify="space-between"
        style={{
          padding: '10px 20px',
          background: '#f0f2f5',
        }}
      >
        <Col>
          <Link
            to="/"
            style={{ fontSize: '24px', color: 'black', textDecoration: 'none' }}
          >
            🛒 Ecommerce App
          </Link>
        </Col>

        <Col>
          <SearchInput style={{ width: '200px' }} />
        </Col>

        <Col>
          <Row gutter={16} align="middle">
            <Col>
              <NavLink
                to="/"
                className="nav-link"
                style={{
                  color: 'black',
                  textDecoration: 'none',
                  fontSize: '16px',
                }}
              >
                Home
              </NavLink>
            </Col>

            <Col>
              <Dropdown overlay={categoryMenu}>
                <NavLink
                  to="/categories"
                  className="nav-link"
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                    fontSize: '16px',
                  }}
                >
                  Categories
                </NavLink>
              </Dropdown>
            </Col>

            {!auth?.user ? (
              <>
                <Col>
                  <NavLink
                    to="/register"
                    className="nav-link"
                    style={{
                      color: 'black',
                      textDecoration: 'none',
                      fontSize: '16px',
                    }}
                  >
                    Register
                  </NavLink>
                </Col>
                <Col>
                  <NavLink
                    to="/login"
                    className="nav-link"
                    style={{
                      color: 'black',
                      textDecoration: 'none',
                      fontSize: '16px',
                    }}
                  >
                    Login
                  </NavLink>
                </Col>
              </>
            ) : (
              <Col>
                <Dropdown overlay={userMenu}>
                  <NavLink
                    to="#"
                    className="nav-link"
                    style={{
                      color: 'black',
                      textDecoration: 'none',
                      fontSize: '16px',
                    }}
                  >
                    {auth?.user?.name}
                  </NavLink>
                </Dropdown>
              </Col>
            )}

            <Col>
              <NavLink
                to="/cart"
                className="nav-link"
                style={{
                  color: 'black',
                  textDecoration: 'none',
                  fontSize: '16px',
                }}
              >
                <ShoppingCartOutlined style={{ fontSize: '18px' }} />
                <Badge count={cart?.length} showZero />
              </NavLink>
            </Col>
          </Row>
        </Col>
      </Row>
    </nav>
  );
}

export default Header;
