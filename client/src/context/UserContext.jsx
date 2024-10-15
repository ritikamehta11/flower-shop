
import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const savedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  // Initialize user state from localStorage if available
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);
  const [cart, setCart] = useState([]);

  // Fetch the cart when the user is set or changes
  useEffect(() => {
    //console.log(user._id);
    if (user) {
      const fetchCart = async () => {
        try {
          const response = await axios.get(`https://flower-shop-backend-81tw.onrender.com/api/cart/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCart(response.data.items);
        } catch (error) {
          console.error("Error fetching cart", error);
        }
      };
      fetchCart();
    }
  }, [user, token]);




  const addToCart = async (productId, quantity) => {
    //console.log(user.id);
    if (!user) {
      console.error("User not set");
      return;
    }
    //else { console.log(user); }

    try {
      const response = await axios.post('https://flower-shop-backend-81tw.onrender.com/api/cart',
        { userId: user.id, productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      console.log(response.data.items);
      setCart(response.data.items);
     // await fetchLatestCartData();
      console.log("cart", cart);
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) {
      console.error("User not set");
      return;
    }


    try {
      console.log(`Attempting to remove product with ID: ${productId}`);

      const response = await axios.delete(`https://flower-shop-backend-81tw.onrender.com/api/cart/${user.id}/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(cart.filter(item => item.productId !== productId));
      // Check if the backend response is valid
      if (response.data && response.data.items) {
        setCart(response.data.items); // Set the new cart state with updated items from the server
        //await fetchLatestCartData();
        console.log("Cart after server response:", response.data.items);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error('Error removing from cart', error);
      // Rollback: If the request fails, reset the cart state to its previous state
      setCart(cart);
    }
  };



  const increaseQuantity = async (productId) => {
    if (!user) {
      console.error("User not set");
      return;
    }

    try {
      await axios.patch(`https://flower-shop-backend-81tw.onrender.com/api/cart/${user.id}/product/${productId}/increase`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Optionally refetch the cart or adjust the cart state accordingly
      setCart(response.data.items); // Re-fetch the cart to get updated quantities
     // await fetchLatestCartData();
    } catch (error) {
      console.error('Error increasing quantity', error);
    }
  };

  const decreaseQuantity = async (productId) => {
    if (!user) {
      console.error("User not set");
      return;
    }

    try {
      await axios.patch(`https://flower-shop-backend-81tw.onrender.com/api/cart/${user.id}/product/${productId}/decrease`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Optionally refetch the cart or adjust the cart state accordingly
      setCart(response.data.items); // Re-fetch the cart to get updated quantities
     // await fetchLatestCartData();
    } catch (error) {
      console.error('Error decreasing quantity', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
