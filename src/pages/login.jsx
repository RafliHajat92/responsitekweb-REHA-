import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Import auth dari konfigurasi Firebase
import loginBg from "./assets/login.png"; // Import gambar bg

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, username, password);
      alert("Login berhasil!");
      navigate("/Dashboard");
    } catch (error) {
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setMessage("Username atau password salah!");
      } else {
        setMessage("Terjadi kesalahan. Coba lagi.");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "contain",
        backgroundPosition: "right center", // Geser latar belakang ke kiri
        backgroundRepeat: "no-repeat",
      }}
    >
      
      <div className="w-full max-w-3xl bg-white p-20 rounded-xl mr-40">
        <h1 className="text-5xl font-bold text-center mb-8 font-poppins">
          Login ReHa
        </h1>
        <div className="mb-6">
          <input
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 font-poppins"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-8">
          <input
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 font-poppins"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button
          onClick={handleLogin}
          type="button"
          className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-lg text-lg py-4 text-center mb-4 font-poppins"
        >Login
        </button>

        {message && <p className="text-red-500 text-center mt-6">{message}</p>}
        <p className="text-center mt-6 font-poppins text-lg">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-500">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
