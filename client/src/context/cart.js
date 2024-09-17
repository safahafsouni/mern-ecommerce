import { useState, useContext, createContext, useEffect } from 'react';

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  //! **Storing Data**: Use JSON.stringify to convert the JavaScript object/array into a JSON string, then use localStorage.
  //! setItem to store it.
  //! **Retrieving Data**: Use localStorage.getItem to retrieve the JSON string, then use JSON.parse to convert it back
  //! into a JavaScript object/array.

  useEffect(() => {
    let existingCartItem = localStorage.getItem('cart');
    // Converts the JSON string from localStorage back into a JavaScript object or array.
    // This is necessary because data stored in localStorage is always in string format.
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
