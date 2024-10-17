import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log("on site opening", user, "         user role:", user?.role);
  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem("token");
    setUser(null);
   
  }

  if (user === null) {
    return (
      <>

        <nav className='flex flex-wrap flex-row  basis-2/4  w-4/5 ' >
          <ul className='flex flex-wrap gap-5 justify-evenly basis-2/4 content-center'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/Products'>All Products</Link></li>

          </ul>
          <ul className='flex flex-wrap gap-5  justify-end basis-2/4 content-center'>
            <li><Link to='/cart'></Link></li>
            <li><Link to='/register'>Register</Link></li>
          </ul>
        </nav></>
    )
  }
  else if (user?.role === "user") {
    return (

      <>

        <nav className='flex flex-wrap flex-row  basis-2/4  w-4/5 ' >
          <ul className='flex flex-wrap gap-5 justify-evenly basis-2/4 content-center'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/Products'>All Products</Link></li>

          </ul>
          <ul className='flex flex-wrap gap-5  justify-end basis-2/4 content-center'>
            <li><Link to='/cart'>Cart</Link></li>
            <li><Link onClick={handleLogout}>Logout</Link></li>
          </ul>
        </nav></>
    )
  }


  else if (user?.role === "admin") {
    return(
    <>

      <nav className='flex flex-wrap flex-row  basis-2/4  w-4/5 ' >
        <ul className='flex flex-wrap gap-5 justify-evenly basis-2/4 content-center'>
          <li><Link to='/admin/dashboard'>DashBoard</Link></li>
          <li><Link to='/admin/allproducts'>All Products</Link></li>

        </ul>
        <ul className='flex flex-wrap gap-5  justify-end basis-2/4 content-center'>
          <li><Link to='/cart'></Link></li>
          <li><Link onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav></>)
  }
}