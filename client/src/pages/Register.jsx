import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage]=useState("");
  


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8888/api/auth/register', { name, email, phone, password });

      setMessage(response.data.message);
    }
    catch (error) {
      setMessage(error.response?.data?.message || 'An error occured');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
      <input type="string" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
     
      <button className="bg-sky-700 border-stone-950" type="submit">Submit</button>

      {message && <p>{message}</p>}
    </form>
  )
}

export default Register;