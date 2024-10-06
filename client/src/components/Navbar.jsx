import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className='flex flex-wrap flex-row  basis-2/4  w-4/5 ' >
      <ul className='flex flex-wrap gap-5 justify-evenly basis-2/4 content-center'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/contact'>Contact Us</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/Products'>All Products</Link></li>

      </ul>
      <ul className='flex flex-wrap gap-5  justify-end basis-2/4 content-center'>
        <li><Link to='/cart'>Cart</Link></li>
        <li><Link to='/register'>Register</Link></li>
      </ul>
    </nav>
  )
}