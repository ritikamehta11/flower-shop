import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../components/Header';
import img from '../assets/images/homepageMain.png';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Helper function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUser = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(email)) newErrors.email = "Enter a valid email address";

    if (!phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d+$/.test(phone)) newErrors.phone = "Phone number must be numeric";
    else if (phone.length < 10 || phone.length > 15)
      newErrors.phone = "Phone number must be between 10 and 15 digits";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length <= 6)
      newErrors.password = "Password should be more than 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateUser()) {
      return;
    }

    try {
      const response = await axios.post(
        "https://flower-shop-5nkta0tai-ritika-mehtas-projects.vercel.app/api/auth/register",
        { name, email, phone, password }
      );

      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <section className="h-screen flex flex-col">
      <Header />
      <section className="hero w-2/4 mx-auto my-10 flex gap-4 p-4">
        <img className="w-2/4" src={img} alt="Register" />
        <div className="place-content-center">
          <h1 className="text-4xl mb-3 font-normal">
            Register to{" "}
            <span className="logo text-4xl block">Blossom Boutique</span>
          </h1>

          <form onSubmit={handleRegister}>
            <input
              className="input mb-2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

            <input
              className="input mb-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

            <input
              className="input mb-2"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

            <input
              className="input mb-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

            <button
              className="pri-btn px-9 py-1 text-center font-thin mx-auto block"
              type="submit"
            >
              Register
            </button>

            {message && <p className="mt-3 text-green-500 text-sm">{message}</p>}
          </form>

          <p className="text-xs text-center mt-2">
            Already have an account?
            <Link className="text-blue-600 underline" to="/login">
              Login here
            </Link>
          </p>
        </div>
      </section>
    </section>
  );
};

export default Register;
