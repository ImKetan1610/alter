import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get the user's name and extract initials
  const fullName = localStorage.getItem("displayName") || "User 007";
  const initials = fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("email");
    localStorage.removeItem("displayName");
    navigate("/");
  };

  return (
    <header className="p-4 bg-gray-100  flex justify-between items-center">
      {/* Avatar and Name Section */}
      <div className="flex items-center"onClick={()=>navigate("/profile")}>
        {/* Circle Avatar */}
        <div className="w-10 h-10 flex items-center justify-center bg-gray-600 rounded-full text-lg font-bold text-white mr-3">
          {initials}
        </div>
        {/* Welcome Back and Name */}
        <div>
          <p className="text-sm text-gray-400">Welcome back,</p>
          <p className="text-lg font-semibold">{fullName}</p>
        </div>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="relative md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="focus:outline-none"
        >
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 bg-gray-700 text-white rounded shadow-lg">
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Logout Button for Larger Screens */}
      <button
        onClick={handleLogout}
        className="hidden md:block bg-red-500 px-3 py-1 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
