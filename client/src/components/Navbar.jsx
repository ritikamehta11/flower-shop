import { UserContext } from "@/context/UserContext";
import { useContext ,useEffect,useState} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log("on site opening", user, "         user role:", user?.role);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate('/login');
  }
  
    const [menuOpen, setMenuOpen] = useState(false);
  function isMenuOpen()  {
    setMenuOpen(!menuOpen);
    console.log(menuOpen)
  };

  if (user === null) {
    return (
      <>

        <nav className='md:flex flex-wrap flex-row  basis-2/4  w-4/5  hidden' >
          <ul className='flex flex-wrap gap-5 justify-evenly basis-2/4 content-center '>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/'>All Products</Link></li>

          </ul>
          <ul className='flex flex-wrap gap-5  justify-end basis-2/4 content-center'>
            <li><Link to='/cart'></Link></li>
            <li><Link to='/register'>Register</Link></li>
          </ul>
        </nav>
      
        
    
        <nav>
          <button className="w-3 h-3 bg-black md:hidden" onClick={isMenuOpen} >
          </button>
          <ul className={`flex-wrap flex-col gap-5 justify-evenly basis-2/4 content-center md:hidden  ${menuOpen ? 'flex' : 'hidden'} bg-white shadow-md z-10 absolute p-3`}>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/contact'>Contact Us</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/'>All Products</Link></li>

        </ul></nav>
      </>
      
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
            <li><Link to='/main'>All Products</Link></li>
       

          </ul>
          <ul className='flex flex-wrap gap-5  justify-end basis-2/4 content-center'>
            <li><Link to='/cart'>Cart</Link></li>
            <li><Link to='/user/profile'>Profile</Link></li>
            <li onClick={handleLogout}>Logout</li>
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