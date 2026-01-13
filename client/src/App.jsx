import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Mainpage } from "./pages/Mainpage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ProductsAdmin } from "./pages/ProductsAdmin";
import { AddProduct } from "./pages/AddProduct";
import { UpdateProduct } from "./pages/UpdateProduct";
import Cart from "./pages/Cart";
import { Users } from "./pages/Users";
import ProductDetails from "./pages/ProductDetails";
import { UserProfile } from "./pages/UserProfile";
import { Logout } from "./pages/Logout";

import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Analytics />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Mainpage />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/allproducts" element={<ProductsAdmin />} />
        <Route path="/admin/createproduct" element={<AddProduct />} />
        <Route path="/admin/updateproductbyid/:id" element={<UpdateProduct />} />
        <Route path="/admin/users" element={<Users />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
