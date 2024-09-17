import { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function PrivateRoute() {
  // a state variable to track if the user is authenticated (initially false)
  const [ok, setOk] = useState(false);
  // another state variable from useAuth, which holds authentication details
  const [auth, setAuth] = useAuth();

  // runs after the component mounts or when auth?.token changes
  useEffect(() => {
    // an async function that sends a GET request to /api/v1/auth/user-auth to check if the user is authenticated
    const authCheck = async () => {
      const res = await axios.get('/api/v1/auth/user-auth');
      // If the response indicates the user is authenticated (res.data.ok is true), setOk(true) sets the ok state to true
      if (res.data.ok) {
        setOk(true);
        // Otherwise, it sets ok to false
      } else {
        setOk(false);
      }
    };
    // If auth?.token is truthy (i.e., the token exists), it calls the authCheck function.
    // This function sends an HTTP request to check if the user is authenticated.
    if (auth?.token) authCheck();
    // The useEffect hook runs whenever auth?.token changes (thanks to [auth?.token] as the dependency array).
    // This ensures that the authentication check (authCheck) is performed only when there is a valid or updated token.
  }, [auth?.token]);

  // If ok is true, it renders the Outlet component (which displays the nested route content).
  //! If ok is false, it shows the Spinner component (which indicates loading).
  return ok ? <Outlet /> : <Spinner />;
}
