import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from '../components/Header';
import img from '../assets/images/homepageMain.png';
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");



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




    <section className='h-screen flex flex-col'>
      <Header />
      <section className='hero  w-2/4 mx-auto my-10 flex gap-4  p-4'>
        <img className='w-2/4' src={img}></img>
        <div className='place-content-center'>
          <h1 className='text-4xl mb-3 font-normal'>Register to <span className='logo text-4xl block'>Blossom Boutique</span></h1>
        



          <form onSubmit={handleRegister}>
            <input className='input mb-2' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input className='input mb-2' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input className='input mb-2' type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
            <input className='input mb-2' type="string" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

            <button className="pri-btn px-9 py-1 text-center font-thin mx-auto block" type="submit">Register</button>

            {message && <p>{message}</p>}

          </form>
          
          <p className="text-xs text-center mt-2">Already have an account?<Link className='text-blue-600 underline ' to='/login'>Login here</Link></p>

        </div>

      </section>
    </section>



  )
}

export default Register;