import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaListAlt,
  FaBox,
  FaUserFriends,
  FaShoppingCart,
} from 'react-icons/fa';

function AdminMenu() {
  return (
    <div className="bg-light p-4 rounded shadow-sm">
      <h4 className="text-primary mb-4 text-center">Admin Panel</h4>
      <div className="list-group">
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action d-flex align-items-center text-primary bg-light border-primary mb-2"
          activeClassName="active"
        >
          <FaTachometerAlt className="me-2" /> Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action d-flex align-items-center text-primary bg-light border-primary mb-2"
          activeClassName="active"
        >
          <FaBox className="me-2" /> Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action d-flex align-items-center text-primary bg-light border-primary mb-2"
          activeClassName="active"
        >
          <FaListAlt className="me-2" /> Products List
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action d-flex align-items-center text-primary bg-light border-primary mb-2"
          activeClassName="active"
        >
          <FaShoppingCart className="me-2" /> Orders List
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action d-flex align-items-center text-primary bg-light border-primary mb-2"
          activeClassName="active"
        >
          <FaUserFriends className="me-2" /> Users List
        </NavLink>
      </div>
    </div>
  );
}

export default AdminMenu;
