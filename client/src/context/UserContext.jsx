import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const savedUser = localStorage.getItem("user");
  const savedCart = localStorage.getItem("cart");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const isTokenValid = (token) => token && token.split(".").length === 3;

  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);
  const [cart, setCart] = useState(savedCart ? JSON.parse(savedCart) : { items: [] });

  const handleError = (error) => {
    console.error("API Error:", error);
   
  };

  useEffect(() => {
    if (user && isTokenValid(token)) {
      const fetchCart = async () => {
        try {
          const response = await axios.get(
            `https://flower-shop-ochre.vercel.app/api/cart/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          setCart(response.data);
        } catch (error) {
          handleError(error);
        }
      };
      fetchCart();
    }
  }, [user, token]);

  useEffect(() => {
    if (cart?.items) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = async (pid, quantity) => {
    console.log(user._id, user.id)
    if (!user || !isTokenValid(token)) {
      navigate('/login');
      console.error("User not set or token invalid");
      return;
    }
    try {
      const response = await axios.post(
        "https://flower-shop-ochre.vercel.app/api/cart",
        { userId: user.id, pid, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const removeFromCart = async (id) => {
    if (!user || !isTokenValid(token)) {
      console.error("User not set or token invalid");
      return;
    }
    try {
      await axios.delete(
        `https://flower-shop-ochre.vercel.app/api/cart/${user.id}/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.product._id !== id),
      }));
    } catch (error) {
      handleError(error);
    }
  };

  const increaseQuantity = async (pid) => {
    if (!user || !isTokenValid(token)) {
      console.error("User not set or token invalid");
      return;
    }
    try {
      await axios.patch(
        `https://flower-shop-ochre.vercel.app/api/cart/${user.id}/product/${pid}/increase`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.product._id === pid ? { ...item, quantity: item.quantity + 1 } : item
        ),
      }));
    } catch (error) {
      handleError(error);
    }
  };

  const decreaseQuantity = async (pid) => {
    if (!user || !isTokenValid(token)) {
      console.error("User not set or token invalid");
      return;
    }
    try {
      await axios.patch(
        `https://flower-shop-ochre.vercel.app/api/cart/${user._id}/product/${pid}/decrease`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.product._id === pid ? { ...item, quantity: item.quantity - 1 } : item
        ),
      }));
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
