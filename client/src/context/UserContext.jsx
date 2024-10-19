
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
          console.log("reponse data at react:", response.data);
          console.log("response data ietms at react:", response.data.items);
          setCart(response.data);
         
        } catch (error) {
          console.error("Error fetching cart", error);
        }
      };
      fetchCart();
    }
  }, [user, token]);




  const addToCart = async (pid, quantity) => {
    //console.log(user.id);
    if (!user) {
      console.error("User not set");
      return;
    }
    //else { console.log(user); }
    console.log("id of the product while adding to cart:", pid);
    try {
      const response = await axios.post('https://flower-shop-backend-81tw.onrender.com/api/cart',
        { userId: user.id, pid, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 
      console.log("cart items in front:",response.data.items);
      setCart(response.data);
      // await fetchLatestCartData();
      console.log("cart", cart);
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  };

  const removeFromCart = async (id) => {
    if (!user) {
      console.error("User not set");
      return;
    }

    try {
      console.log(`Attempting to remove product with id: ${id}`);

      // Send the DELETE request to the backend
      // Update the cart with the new state after removal
   
      
      const response = await axios.delete(
        `https://flower-shop-backend-81tw.onrender.com/api/cart/${user.id}/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
   const updatedCart = cart.items.filter(item => item.product._id !== id);
      setCart({ ...cart, items: updatedCart });

     
      // }
    } catch (error) {
      console.error("Error removing from cart", error);
    }
  };




  const increaseQuantity = async (pid) => {
    if (!user) {
      console.error("User not set");
      return;
    }

    try {
      console.log("pid in increasing quantity function: ",pid);
      await axios.patch(`https://flower-shop-backend-81tw.onrender.com/api/cart/${user.id}/product/${pid}/increase`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Optionally refetch the cart or adjust the cart state accordingly
      setCart({ ...cart, items: updatedCart });
      // await fetchLatestCartData();
    } catch (error) {
      console.error('Error increasing quantity', error);
    }
  };

  const decreaseQuantity = async (product) => {
    if (!user) {
      console.error("User not set");
      return;
    }

    try {
      await axios.patch(`https://flower-shop-backend-81tw.onrender.com/api/cart/${user.id}/product/${product._id}/decrease`, {}, {
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
