import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

function AdminDashboard() {
  const [auth] = useAuth();

  return (
    <Layout title={'Admin Dashboard - Ecommerce App'}>
      <div className="container-fluid my-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card border-primary shadow-lg">
              <div className="card-body">
                <h2 className="card-title mb-4 text-primary">
                  Admin Dashboard
                </h2>
                <div className="d-flex align-items-center mb-3">
                  <FaUser className="text-primary me-2" />
                  <div>
                    <strong className="text-muted">Name:</strong>
                    <p className="mb-0 text-dark">{auth?.user?.name}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <FaEnvelope className="text-primary me-2" />
                  <div>
                    <strong className="text-muted">Email:</strong>
                    <p className="mb-0 text-dark">{auth?.user?.email}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <FaPhone className="text-primary me-2" />
                  <div>
                    <strong className="text-muted">Contact:</strong>
                    <p className="mb-0 text-dark">{auth?.user?.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
