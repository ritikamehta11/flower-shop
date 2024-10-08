import Header from '@/components/Header';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';


export const AdminDashboard = () => {

  // const [admins, setAdmins] = useState([]);
const { user } = useContext(UserContext);
  // useEffect(() => {
  //   const getAdmins = async () => {
  //     const response = await axios.get("http://localhost:8888/api/auth/users");

  //     setAdmins(response.data);

  //   };
  //   getAdmins();
  // }, []);
  const token = localStorage.getItem('token');
  console.log(token);
  return (
    <section className='h-screen flex flex-col'>
      <Header/>
      
      <section className='hero  w-3/4 mx-auto my-10 flex flex-col gap-4  p-4'>
        <h1 className='logo'>Hello {user.name}
          {console.log(user.name)}
          {/* {admins.map((admin) => (admin.role === "admin" ? admin.name : ""))} */}
          , </h1>
        <div className='flex flex-row flex-wrap mb-8 gap-5' >
          <div className='dashboardLinks '><Link to='/admin/allproducts'>All Products</Link></div>
          {/* <div className='dashboardLinks '><Link to='/'>All Gifts</Link></div> */}
          <div className='dashboardLinks '><Link to='/'>All orders</Link></div>
          <div className='dashboardLinks '><Link to='/'>All transactions</Link></div>
          <div className='dashboardLinks '><Link to='/'>All Customers</Link></div>
          <div className='dashboardLinks '><Link to='/'>Inventory</Link></div>


      </div>
      </section>
    </section>
  )
}
