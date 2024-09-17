import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { DeleteOutlined } from '@ant-design/icons';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Typography, Button, Card, Image, Spin, notification } from 'antd';
const { Title, Text } = Typography;

function CartPage() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState(''); // For the payment token
  //state holds the Braintree Drop-in instance. It’s set by the onInstance callback,
  //allowing you to interact with the payment details collected from the form.
  //This is required for handling the actual payment process, such as requesting the payment nonce.
  //!We need the instance to access methods like requestPaymentMethod() to retrieve the nonce
  //!(the secure token representing the payment method) for sending to the server.
  const [instance, setInstance] = useState(''); // For the payment form (DropIn)
  // **To prevent multiple payments**: Disabling the button when loading is true ensures the user doesn’t
  //initiate multiple payments by mistake.
  // **To provide feedback**: It’s a good UX practice to inform users when the application is busy (processing payment).
  const [loading, setLoading] = useState(false); // To track payment progress
  const navigate = useNavigate(); // For redirecting after payment

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeCartItem = (pid) => {
    try {
      // This line creates a shallow copy of the current cart state using the spread operator (...).
      //By copying the cart into a new array (myCart), you avoid directly mutating the original cart array, ensuring immutability
      let myCart = [...cart]; //* Create a shallow copy of cart
      // Finding the Index of the Product to Remove
      let index = myCart.findIndex((item) => item._id === pid); // *Find index of item to remove
      // splice is used to remove the item from the myCart array at the specified index.
      // The 1 in splice(index, 1) indicates that only one item should be removed starting from the given index.
      myCart.splice(index, 1); //* Find index of item to remove
      // After removing the product from myCart,
      // the setCart function (which updates the cart state) is called to update the cart with the modified array.
      setCart(myCart);
      // This line updates the local storage by saving the new cart (myCart) in the browser's localStorage.
      // JSON.stringify(myCart) converts the updated myCart array into a JSON string so it can be stored in localStorage.
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/braintree/token');
      setClientToken(data?.clientToken); // Store the token
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch the token when the component loads
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //TODO:  Handle the payment process
  //* 1. **Set loading to true**: Before making the payment request, the loading state is set to true to indicate the payment
  //is in progress and to disable the button.
  //* 2. **Request payment method**: instance.requestPaymentMethod() retrieves the payment nonce,
  //which is required for processing the payment securely.
  //* 3. **Send the payment data to the backend**: The nonce and cart information are sent to the server for final processing.
  //* 4. **Reset loading and cart**: After payment is successful, loading is set to false, the cart is cleared,
  //and the user is redirected to their orders page.
  const handlePayment = async () => {
    try {
      setLoading(true); // Indicate that the payment process has started
      // used to request a nonce from Braintree after the user enters their payment information.
      const { nonce } = await instance.requestPaymentMethod(); // Get payment nonce // Get payment details (nonce) from DropIn instance
      // Make a request to your server to process the payment
      // Sending the Nonce and Cart Data to Backend
      const { data } = await axios.post('/api/v1/product/braintree/payment', {
        nonce, // Send nonce to backend for payment processing (payment info)
        cart, // Send cart details (products being purchased)
      });
      setLoading(false); // Stop loading when payment completes
      localStorage.removeItem('cart'); // Clear the cart after successful payment
      setCart([]); // Clear cart in state
      navigate('/dashboard/user/orders'); // Redirect user to their orders page
      toast.success('Payment Completed Successfully'); // Show success message
    } catch (error) {
      console.log(error);
      setLoading(false); // Stop loading if there's an error
    }
  };

  return (
    <Layout title={'Your Cart'}>
      <div className="container my-4">
        <div className="row">
          <div className="col-md-12">
            <Title level={1} className="text-center bg-light p-3 mb-4 rounded">
              {`Hello, ${auth?.user?.name ? auth.user.name : 'Guest'}!`}
            </Title>

            {/* Display cart message or empty cart message */}
            <div className="text-center">
              {cart?.length > 0 ? (
                <div className="alert alert-success" role="alert">
                  <h4 className="alert-heading">
                    {`You have ${cart.length} item${
                      cart.length > 1 ? 's' : ''
                    } in your cart.`}{' '}
                    🛍️
                  </h4>
                  {!auth?.token && (
                    <p className="my-3">
                      Please{' '}
                      <Link to="/login" className="btn btn-primary btn-sm">
                        login
                      </Link>{' '}
                      to checkout.
                    </p>
                  )}
                </div>
              ) : (
                <div className="alert alert-warning" role="alert">
                  <h4 className="alert-heading">Your cart is empty!</h4>
                  <p>
                    Looks like you haven't added anything to your cart yet.
                    Start shopping now!
                  </p>
                  <Link to="/" className="btn btn-outline-primary mt-3">
                    Go to Shop
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          {/* Cart Items List */}
          {cart?.length > 0 && (
            <div className="row">
              <div className="col-md-8">
                {cart.map((p) => (
                  <div className="row mb-3 p-2 card flex-row" key={p._id}>
                    <div className="col-md-3">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="img-fluid rounded"
                        alt={p.name}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    <div className="col-md-7 d-flex flex-column justify-content-center">
                      <h5>{p.name}</h5>
                      <p className="mb-1">Price: {p.price}</p>
                    </div>
                    <div className="col-md-2 d-flex align-items-center">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove <DeleteOutlined />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="col-md-4 text-center">
                <div className="card p-4 shadow-sm">
                  <h3 className="mb-4">Cart Summary</h3>
                  <hr />
                  <p className="text-muted">
                    Review your items before checkout
                  </p>
                  <h4 className="my-4">
                    Total: <span className="text-success">{totalPrice()}</span>
                  </h4>

                  {auth?.user?.address ? (
                    <>
                      <div className="mb-4">
                        <h5>Shipping Address</h5>
                        <p className="text-muted">{auth?.user?.address}</p>
                        <button
                          className="btn btn-outline-warning btn-sm"
                          onClick={() => navigate('/dashboard/user/profile')}
                        >
                          Update Address
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mb-4">
                      {auth?.token ? (
                        <button
                          className="btn btn-outline-warning btn-sm"
                          onClick={() => navigate('/dashboard/user/profile')}
                        >
                          Update Address
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => navigate('/login', { state: '/cart' })}
                        >
                          Login to Checkout
                        </button>
                      )}
                    </div>
                  )}
                  <div className="mt-2">
                    {!clientToken || !auth?.token || !cart?.length ? (
                      ''
                    ) : (
                      <>
                        <DropIn
                          options={{
                            authorization: clientToken, // Pass the token to DropIn
                            //!Save Payment Information: With the vault flow, users can choose to save
                            //!their PayPal account details securely so they don’t have to re-enter them for future purchases.
                            paypal: { flow: 'vault' }, // Enable PayPal Vault flow
                          }}
                          //This sets the instance from the Drop-in,
                          //enabling you to request the payment method when the user clicks to make a payment.
                          onInstance={(instance) => setInstance(instance)} // Get the payment form instance
                        />

                        <button
                          className="btn btn-primary"
                          onClick={handlePayment} // Trigger payment process on click
                          disabled={
                            loading || !instance || !auth?.user?.address // Disable the button based on conditions
                          }
                        >
                          {loading ? 'Processing ....' : 'Make Payment'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
