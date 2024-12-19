import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // For list (hamburger) and close icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white text-blue-600 shadow-md">
      <div className="flex justify-between items-center p-4">
        {/* Logo or Brand Name */}
        <h1 className="text-2xl font-bold">Volatic</h1>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="text-3xl focus:outline-none md:hidden"
          aria-label="Menu Toggle"
        >
          {isOpen ? <FaTimes /> : <FaBars />} {/* Show toggle icons */}
        </button>

        {/* Links (Hidden in Small Screens, Visible in Desktop) */}
        <ul className="hidden md:flex gap-8">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/gallery" className="hover:underline">
              Film Gallery
            </Link>
          </li>
          <li>
            <Link to="/projectGallery" className="hover:underline">
              Project Gallery
            </Link>
          </li>
        </ul>
      </div>

      {/* Dropdown Menu (Visible when isOpen is true) */}
      {isOpen && (
        <ul className="flex flex-col gap-4 p-4 bg-gray-100 md:hidden">
          <li>
            <Link to="/" className="hover:underline" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/gallery" className="hover:underline" onClick={toggleMenu}>
              Film Gallery
            </Link>
          </li>
          <li>
            <Link to="/projectGallery" className="hover:underline" onClick={toggleMenu}>
              Project Gallery
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
