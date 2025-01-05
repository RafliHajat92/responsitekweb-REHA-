import React from "react";
import { Link } from "react-router-dom"; // Pastikan kamu menggunakan react-router-dom untuk navigasi

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">ReHa</Link>
      </div>
      <ul className="flex space-x-6">
        <li>
          <Link
            to="/dashboard"
            className="text-blue-600 hover:text-blue-800 transition duration-300"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/tambahjadwal"
            className="text-blue-600 hover:text-blue-800 transition duration-300"
          >
            Tambah Jadwal
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-blue-600 hover:text-blue-800 transition duration-300"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/Settings"
            className="text-blue-600 hover:text-blue-800 transition duration-300"
          >
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
