import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import {
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(prev => !prev);

  /* ---------------- LINKS CONFIG ---------------- */

  const commonLinks = [
    { to: "/", label: "Home" },
    { to: "/contact", label: "Contact Us" },
    { to: "/about", label: "About" },
    { to: "/main", label: "All Products" },
  ];

  const guestLinks = [
    { to: "/register", label: "Register" },
  ];

  const userLinks = [
    {
      to: "/cart",
      label: "Cart",
      icon: <FiShoppingCart size={20} />,
    },
    {
      to: "/user/profile",
      label: "Profile",
      icon: <FiUser size={20} />,
    },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/allproducts", label: "All Products" },
  ];

  const rightLinks =
    !user
      ? guestLinks
      : user.role === "admin"
        ? adminLinks
        : userLinks;

  /* ---------------- RENDER ---------------- */

  return (
    <header className="relative w-full border-b bg-white">
      {/* Desktop Navbar */}
      <nav className="hidden md:flex w-4/5 mx-auto py-4 justify-between items-center">
        <ul className="flex gap-6">
          {commonLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className=" transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex gap-6 items-center">
          {rightLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="flex items-center gap-2  transition"
                aria-label={link.label}
                title={link.label}
              >
                {link.icon && link.icon}
                <span className="sr-only">{link.label}</span>
              </Link>
            </li>
          ))}

          {user && (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
                aria-label="Logout"
                title="Logout"
              >
                <FiLogOut size={20} />
                <span className="sr-only">Logout</span>
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-3 m-3 rounded-md bg-black text-white"
        aria-label="Toggle navigation menu"
      >
        <FiMenu size={22} />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden absolute right-3 top-16 bg-white shadow-lg rounded-xl p-4 flex flex-col gap-4 z-10 w-48">
          {commonLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={toggleMenu}
                className="hover:text-indigo-600 transition"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {rightLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={toggleMenu}
                className="flex items-center gap-3 hover:text-indigo-600 transition"
                aria-label={link.label}
              >
                {link.icon && link.icon}
                <span>{link.label}</span>
              </Link>
            </li>
          ))}

          {user && (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="flex items-center gap-3 text-red-500 hover:text-red-600 transition"
                aria-label="Logout"
              >
                <FiLogOut size={20} />
                <span>Logout</span>
              </button>
            </li>
          )}
        </ul>
      )}
    </header>
  );
}
