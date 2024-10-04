import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Register from './pages/Register';
import Home  from './pages/Home';
import Login from './pages/Login';
import { Mainpage } from './pages/Mainpage';
import { AdminDashboard } from './pages/AdminDashboard';
function App() {

  return (
  
    <Routes>
  
      <Route path="/" element={<Home />} />
        {/* <Route path="/contact" element={<Contact/>} /> */}
      
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/main' element={<Mainpage></Mainpage>}></Route>
      <Route path='/admin' element={<AdminDashboard />} />

      
      </Routes>

  )
}

export default App
