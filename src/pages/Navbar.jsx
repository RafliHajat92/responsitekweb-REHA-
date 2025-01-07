import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "./darkmode"; // Import Context
import { FaMoon, FaSun } from "react-icons/fa"; // Import icons from react-icons

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Gunakan context

  return (
    <nav className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">
        <Link to="/">ReHa</Link>
      </div>
      <ul className="flex space-x-6">
        <li>
          <Link
            to="/dashboard"
            className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-400 transition duration-300"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/tambahjadwal"
            className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-400 transition duration-300"
          >
            Tambah Jadwal
          </Link>
        </li>
        <li>
          <Link
            to="/lihatjadwal" 
            className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-400 transition duration-300"
          >
            Lihat Jadwal
          </Link>
        </li>
        <li>
          <Link
            to="/AboutUs"
            className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-400 transition duration-300"
          >
            About Us
          </Link>
        </li>
        <li>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg transition duration-300"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />} {/* Ganti dengan ikon */}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
