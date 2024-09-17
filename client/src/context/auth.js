import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Creates 'auth' state to hold user and token information
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  });

  // default axios
  // Set the Authorization header for all Axios requests to the value of auth.token if it exists.
  //! it helps you automatically send the authentication token with every request, so you don't have to add it manually each time.
  //? instead of making this in page "Private.js" in const "res"
  /* headers: {
      Authorization: auth?.token
   } */
  axios.defaults.headers.common['Authorization'] = auth?.token;

  // Runs after the component renders once to load auth data
  useEffect(() => {
    // Retrieves any saved authentication data from localStorage
    const data = localStorage.getItem('auth');
    // If there is some saved data, it continues to process it.
    if (data) {
      // Parses the saved data and updates the 'auth' state
      // Converts the stringified data back into an object (for example: { user: 'John', token: 'abc123' }).
      const parseData = JSON.parse(data);
      // Updates the auth state with the saved user and token values.
      // When you call setAuth({...}), you create a new object for the auth state.
      setAuth({
        // ...auth is the spread operator. It copies everything that is already inside the auth object.
        //! We use this when we want to update only specific parts of the object (like user and token),
        //! while keeping the rest of the object unchanged.
        ...auth, // Copies everything in 'auth' (user, token, role, etc.)
        user: parseData.user, // Updates only the 'user' property
        token: parseData.token, // Updates only the 'token' property
      });
    }
    // eslint-disable-next-line
  }, []); // Empty array means this runs only once when the component loads

  // Returns the context provider that shares 'auth' and 'setAuth' with children
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// costum hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
