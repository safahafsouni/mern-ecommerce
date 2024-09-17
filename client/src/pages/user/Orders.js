import React, { useEffect, useState } from 'react';
import UserMenu from '../../components/Layout/UserMenu';
import Layout from './../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/orders');
      setOrders(data?.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Not Processed':
        return 'secondary';
      case 'Processing':
        return 'info';
      case 'Shipped':
        return 'primary';
      case 'Delivered':
        return 'success';
      case 'Cancel':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <Layout title={'Your Orders'}>
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2 className="text-center mb-4">Your Orders</h2>
            {orders?.map((o, i) => (
              <div key={i} className="border rounded shadow-sm mb-4">
                <div className="p-3 bg-light rounded-top">
                  <h5 className="mb-0">Order {o._id}</h5>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="table-secondary">
                      <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <span
                            className={`badge bg-${getStatusBadge(o?.status)}`}
                          >
                            {o?.status}
                          </span>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>
                          <span
                            className={`badge bg-${
                              o?.payment?.success ? 'success' : 'danger'
                            }`}
                          >
                            {o?.payment.success ? 'Success' : 'Failed'}
                          </span>
                        </td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-3">
                  <h6 className="product-header">
                    <i className="bi bi-box-seam"></i>
                    Products
                  </h6>
                  {o?.products?.map((p) => (
                    <div className="row align-items-center mb-3" key={p._id}>
                      <div className="col-md-3 text-center">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="img-fluid rounded"
                          alt={p.name}
                          style={{ maxHeight: '150px', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-md-9">
                        <h6 className="mb-1">
                          <a
                            href={`/product/${p._id}`}
                            className="text-decoration-none text-dark"
                          >
                            {p.name}
                          </a>
                        </h6>
                        <p className="mb-0">
                          <strong>Price:</strong> ${p.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
