import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const Spinner = ({ path = 'login' }) => {
  const [count, setCount] = useState(3); //state variable that starts at 5. This will be used to count down the seconds before redirecting.
  const navigate = useNavigate(); // hook to programmatically navigate to different routes.
  const location = useLocation(); // hook to get the current route information.

  useEffect(() => {
    // Sets up a timer to decrease the count by 1 every second.
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    // When count reaches 0, it redirects the user to the /login page.
    // It also passes the current route (location.pathname) so the login page knows where the user was before being redirected.
    // redirects the user to the /login route and passes the current pathname as state.
    // This can be useful if you want to redirect the user back to their original path after logging in.
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    // When the component is unmounted or count, navigate, or location changes, the timer is cleared to avoid potential issues.
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <h1 className="Text-center">redirecting to you in {count} second </h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
