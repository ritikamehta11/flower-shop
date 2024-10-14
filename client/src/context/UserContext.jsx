// import { useContext } from "react";
// import { useState } from "react";
// import { createContext } from "react";


// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// import { useState, createContext, useContext, useEffect } from "react";
// import axios from "axios";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {



//   const [user, setUser] = useState(null);
//   const [cart, setCart] = useState([]);
//   const token = localStorage.getItem('token');
//   const savedUser = localStorage.getItem('user');

//   useEffect(() => {
//     console.log("token at usercontext:", token);
//     console.log(savedUser);
//     // if (token && savedUser) {
//     setUser(JSON.parse(savedUser)); // Restore the user from localStorage
//     // };
    
//     if (user) {
//       const fetchCart = async () => {
//         try {
//           const response = await axios.get(`http://localhost:8888/api/cart/${user._id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           });
//           setCart(response.data.items);
//         } catch (error) {
//           console.error("Error fetching cart", error);
//         }
//       };
//       fetchCart();
//     }
//   }, []);

//   const addToCart = async (productId, quantity) => {
//     try {
//       const response = await axios.post('http://localhost:8888/api/cart', { userId: user._id, productId, quantity }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setCart(response.data.items);
//     } catch (error) {
//       console.error('Error adding to cart', error);
//     }
//   };

//   const removeFromCart = async (productId) => {
//     try {
//       const response = await axios.delete(`/api/cart/${user._id}/product/${productId}`);
//       setCart(response.data.items);
//     } catch (error) {
//       console.error('Error removing from cart', error);
//     }
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser, cart, addToCart, removeFromCart }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => useContext(UserContext);


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
    console.log(user._id);
    if (user) {
      const fetchCart = async () => {
        try {
          const response = await axios.get(`http://localhost:8888/api/cart/${user.id}`, {
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

    try {
      const response = await axios.post('http://localhost:8888/api/cart',
        { userId: user.id, productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setCart(response.data.items);
      console.log("cart",cart);
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) {
      console.error("User not set");
      return;
    }

    // Optimistically update the cart in the UI
    const newCart = cart.filter(item => item.productId !== productId);
    setCart(newCart); // Remove the item locally first

    try {
      console.log(`Attempting to remove product with ID: ${productId}`);

      const response = await axios.delete(`http://localhost:8888/api/cart/${user.id}/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if the backend response is valid
      if (response.data && response.data.items) {
        setCart(response.data.items); // Set the new cart state with updated items from the server
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


  return (
    <UserContext.Provider value={{ user, setUser, cart, addToCart, removeFromCart }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
