import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import { FaUser, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Dashboard() {
  const [auth] = useAuth();

  return (
    <Layout title={'Dashboard - Ecommerce App'}>
      <div className="container-fluid my-4">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card border-success shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-success mb-4">User Dashboard</h2>
                <div className="d-flex align-items-center mb-3">
                  <FaUser className="text-success me-2" size={24} />
                  <div>
                    <strong className="text-muted">Name:</strong>
                    <p className="mb-0 text-dark">{auth?.user?.name}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <FaEnvelope className="text-success me-2" size={24} />
                  <div>
                    <strong className="text-muted">Email:</strong>
                    <p className="mb-0 text-dark">{auth?.user?.email}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <FaMapMarkerAlt className="text-success me-2" size={24} />
                  <div>
                    <strong className="text-muted">Address:</strong>
                    <p className="mb-0 text-dark">{auth?.user?.address}</p>
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

export default Dashboard;
