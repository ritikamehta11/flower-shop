import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import img from "../assets/images/homepageMain.png";
import API from "@/api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(""); // State for server error message
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const validateUser = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length <= 6) newErrors.password = "Password should be more than 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError(""); // Clear any previous server errors

    if (!validateUser()) {
      return;
    }

      API.post("api/auth/login", {
        email,
        password,
      }).then((response) => {
        if (response.data.token) {
          const { user, token } = response.data;
          const { role } = user; 
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          // Navigate based on user role
          if (role === "admin") {
            navigate("/admin/dashboard"); // Redirect to admin dashboard
          } else {
            navigate("/main"); // Redirect to user main page
          }
        }
      }).catch((error) => {
        // Display error message from server response if available
        if (error.response && error.response.data && error.response.data.message) {
          setServerError(error.response.data.message);
        } else {
          setServerError("An error occurred. Please try again.");
        }
      });
    

    //   const response = await axios.post("https://flower-shop-ochre.vercel.app/api/auth/login", {
    //     email,
    //     password,
    //   },{withCredentials:true});

    //   if (response.data.token) {
    //     const { user, token } = response.data;
    //     const { role } = user; // Assuming the response structure includes user data
    //     localStorage.setItem("token", token);
    //     localStorage.setItem("user", JSON.stringify(user));
    //     setUser(user);

    //     // Navigate based on user role
    //     if (role === "admin") {
    //       navigate("/admin/dashboard"); // Redirect to admin dashboard
    //     } else {
    //       navigate("/main"); // Redirect to user main page
    //     }
    //   }
    // } catch (error) {
    //   // Display error message from server response if available
    //   if (error.response && error.response.data && error.response.data.message) {
    //     setServerError(error.response.data.message);
    //   } else {
    //     setServerError("An error occurred. Please try again.");
      // }
    // }
  };

  return (
    <section className="h-screen flex flex-col">
      <Header />
      <section className="hero w-2/4 mx-auto my-10 flex gap-4 p-4">
        <img className="w-2/4" src={img} alt="Blossom Boutique" />
        <div className="place-content-center">
          <h1 className="text-4xl mb-3 font-normal">
            Login to <span className="logo text-4xl block">Blossom Boutique</span>
          </h1>

          <form onSubmit={handleLogin}>
            <input
              className="input mb-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input mb-2"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

            {/* Server error message */}
            {serverError && <p className="text-red-500 text-xs">{serverError}</p>}

            <button className="pri-btn px-9 py-1 text-center font-thin mx-auto block">Login</button>
          </form>

          <p className="text-xs text-center mt-2">
            Don’t have an account?{" "}
            <Link className="text-blue-600 underline" to="/register">
              Register here
            </Link>
          </p>
        </div>
      </section>
    </section>
  );
};

export default Login;
