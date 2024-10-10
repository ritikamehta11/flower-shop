import {useState, useContext } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { UserContext } from '../context/UserContext';


import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import img from '../assets/images/homepageMain.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post('http://localhost:8888/api/auth/login', { email, password });
      

      // alert("done");


      if (response.data.token) {
        const { user, token } = response.data;
        const { role } = response.data.user; // Assuming the response structure includes user data
        localStorage.setItem('token', response.data.token);
       
        console.log(token);
        setUser(user);
        // Navigate based on user role
        if (role === 'admin') {
          navigate('/admin/dashboard'); // Redirect to admin dashboard
        } else {
          navigate('/main'); // Redirect to user main page
        }

      }

      // Handle login success (e.g., save token, redirect, etc.)
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className='h-screen flex flex-col'>
      <Header />
      <section className='hero  w-2/4 mx-auto my-10 flex gap-4  p-4'>
        <img className='w-2/4' src={img}></img>
        <div className='place-content-center'>
          <h1 className='text-4xl mb-3 font-normal'>Login to <span className='logo text-4xl block'>Blossom Boutique</span></h1>



          <form onSubmit={handleLogin} >

            <input className='input mb-2' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className='input mb-2' />

            <button className="pri-btn px-9 py-1 text-center font-thin mx-auto block">Login</button>
          </form>

          <p className="text-xs text-center mt-2">Don’t have an account? <Link className='text-blue-600 underline ' to='/login'>Register here</Link></p>

        </div>
      </section>
    </section>
  );
};

export default Login;
