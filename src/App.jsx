import { useState } from 'react';
import { Outlet } from 'react-router';
import NavBar from './components/NavBar/NavBar';
import Toast from './components/Toast/Toast';

const App = () => {
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);

  // Adds a product object and how many the user wants to add.
  // Checks if product is already in cart by looking for a matching id.
  // If yes, don't duplicate, but loop through the cart and increase the quantity on the matching item.
  // Else, add the product object as a new entry.
  const addToCart = (product, quantity) => {
    // Shows toast notification when addToCart is triggered. Removes it after 2 seconds.
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, {...product, quantity}];
    });
  };

  // Handles the cart page.
  // If quantity is 0, delete item from the cart.
  // Else, update the item's quantity.
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      quantity === 0
        ? prevCart.filter((item) => item.id !== productId)
        : prevCart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          )
    );
  };

  // Adds all the quantities across every item in the cart.
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <NavBar cartCount={cartCount} />
      <Outlet context={{ cart, addToCart, updateQuantity }} />
      <Toast show={showToast} />
    </>
  );
};

export default App;