import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import { Mainpage } from './pages/Mainpage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProductsAdmin } from './pages/ProductsAdmin';
import { AddProduct } from './pages/AddProduct';
import { UpdateProduct } from './pages/UpdateProduct';
import { UserContext } from './context/UserContext';
import Cart from './pages/Cart';
import { Users } from './pages/Users';


function App() {
 // const { setUser } = useContext(UserContext);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  // const savedUser = localStorage.getItem('user');

  //   if (token && savedUser) {
  //setUser(JSON.parse(savedUser)); // Restore the user from localStorage
  //   }
  // }, []);
  return (

    <Routes>

      <Route path="/" element={<Home />} />
      {/* <Route path="/contact" element={<Contact/>} /> */}

      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/main' element={<Mainpage />}></Route>
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/admin/allproducts' element={<ProductsAdmin />} />
      <Route path='/admin/createproduct' element={<AddProduct />} />
      <Route path='/admin/updateproductbyid/:id' element={<UpdateProduct />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/users' element={<Users />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
    </Routes>

  )
}

export default App
