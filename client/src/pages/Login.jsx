import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Mainpage } from './Mainpage';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8888/api/auth/login', { email, password });
      // alert("done");
      

      if (response.data.token) {
        const { role } = response.data.user; // Assuming the response structure includes user data

        // Navigate based on user role
        if (role === 'admin') {
          navigate('/admin'); // Redirect to admin dashboard
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
    <form onSubmit={handleLogin} className="container mx-auto mt-10 max-w-lg p-4 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded mb-4" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded mb-4" />
      <button className="bg-sky-700 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
};

export default Login;
