import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/axios";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  /* -------------------- STATE -------------------- */

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : { items: [] };
  });

  const token = localStorage.getItem("token");
  const userId = user?.id || user?._id;

  /* -------------------- AUTH HELPERS -------------------- */

  const isTokenValid = useCallback(() => {
    return token && token.split(".").length === 3;
  }, [token]);

  const isValidUser = useCallback(() => {
    return (
      user &&
      typeof user === "object" &&
      user.role &&
      isTokenValid()
    );
  }, [user, isTokenValid]);

  const handleError = (error) => {
    console.error("API Error:", error?.response?.data || error.message);
  };

  /* -------------------- CART FETCH -------------------- */

  const fetchCart = useCallback(async () => {
    if (!isValidUser() || !userId) return;

    try {
      const { data } = await API.get(`/api/cart/${userId}`);

      if (data.userId !== userId) {
        console.warn("Cart-user mismatch. Clearing cart.");
        setCart({ items: [] });
        return;
      }

      setCart({
        ...data,
        items: data.items.filter((i) => i.quantity > 0),
      });
    } catch (error) {
      handleError(error);
    }
  }, [userId, isValidUser]);

  /* -------------------- EFFECTS -------------------- */

  // 🔒 Remove ghost / invalid users (PRODUCTION FIX)
  useEffect(() => {
    if (user && !isValidUser()) {
      console.warn("Invalid user detected. Logging out.");

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [user, isValidUser]);

  // Fetch cart on login / refresh
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Clear cart on logout
  useEffect(() => {
    if (!user) {
      setCart({ items: [] });
      localStorage.removeItem("cart");
    }
  }, [user]);

  /* -------------------- CART ACTIONS -------------------- */

  const addToCart = async (pid, quantity = 1) => {
    if (!isValidUser()) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await API.post("/api/cart", {
        userId,
        pid,
        quantity,
      });

      setCart(data);
    } catch (error) {
      handleError(error);
    }
  };

  const removeFromCart = async (pid) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.product._id !== pid),
    }));

    try {
      const { data } = await API.delete(
        `/api/cart/${userId}/product/${pid}`
      );
      setCart(data);
    } catch (error) {
      handleError(error);
    }
  };

  const increaseQuantity = async (pid) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.product._id === pid
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));

    try {
      const { data } = await API.patch(
        `/api/cart/${userId}/product/${pid}/increase`
      );
      setCart(data);
    } catch (error) {
      handleError(error);
    }
  };

  const decreaseQuantity = async (pid) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items
        .map((item) =>
          item.product._id === pid
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    }));

    try {
      const { data } = await API.patch(
        `/api/cart/${userId}/product/${pid}/decrease`
      );
      setCart(data);
    } catch (error) {
      handleError(error);
    }
  };

  /* -------------------- PROVIDER -------------------- */

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        cart,
        isAuthenticated: isValidUser(),
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/* -------------------- SAFE HOOK -------------------- */

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUserContext must be used inside UserProvider");
  }
  return ctx;
};
