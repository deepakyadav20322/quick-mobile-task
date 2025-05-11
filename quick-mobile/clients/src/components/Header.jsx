import React from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useUser } from "../../context/context";

const Header = () => {
  const { email, setEmail } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setEmail("");
 
    toast.success("Logged out successfully");
    navigate("/login"); 
  };

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <img
          src="/Header.png" 
          alt="Logo"
          className="h-15 w-auto"
        />
      </div>

      {email ? (
        <button
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <Link 
          to="/login"
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;