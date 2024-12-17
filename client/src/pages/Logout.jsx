import { UserContext } from '@/context/UserContext';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const { setUser ,setCart} = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    // Reset states
    setUser(null);
    setCart({ items: [] })

    navigate('/login');
  },[setUser, setCart, navigate, user, token]);
 
  return;
}
