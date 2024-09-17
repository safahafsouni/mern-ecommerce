import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';

function UserMenu() {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h4 className="text-success mb-4 text-center">User Dashboard</h4>
      <div className="list-group">
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action d-flex align-items-center text-success bg-light border-success mb-2"
          activeClassName="active"
        >
          <FaUser className="me-2" /> Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action d-flex align-items-center text-success bg-light border-success mb-2"
          activeClassName="active"
        >
          <FaShoppingCart className="me-2" /> Orders
        </NavLink>
      </div>
    </div>
  );
}

export default UserMenu;
