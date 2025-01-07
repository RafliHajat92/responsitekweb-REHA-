import React from "react";
import Navbar from "./Navbar"; // Import Navbar

function AboutUs() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Konten About Us */}
      <div className="pt-20 p-8 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
            Tentang ReHa
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            <span className="font-bold text-blue-600">ReHa</span> (Reminder for Class Schedule)
            adalah aplikasi yang dirancang khusus untuk membantu mahasiswa dalam 
            mengelola dan mengingat jadwal perkuliahan. Dengan fitur-fitur seperti 
            pengelolaan jadwal, pengingat otomatis, dan navigasi yang mudah digunakan, 
            ReHa bertujuan untuk meningkatkan produktivitas dan membantu pengguna 
            mengatur waktu mereka dengan lebih baik.
          </p>
          <div className="mt-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Kenapa ReHa Dibuat?</h2>
            <p className="text-gray-600 leading-relaxed">
              Sebagai mahasiswa, terkadang sulit untuk mengingat semua jadwal kuliah 
              terutama saat jadwal tersebut sering berubah. ReHa hadir untuk memberikan 
              solusi dengan menyediakan alat yang dapat diakses kapan saja dan di mana saja.
            </p>
            <h2 className="text-2xl font-bold text-gray-800">Fitur Utama</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Pencatatan dan pengelolaan jadwal kuliah.</li>
              <li>Tampilan yang sederhana namun fungsional.</li>
              <li>Integrasi kalender untuk mempermudah perencanaan.</li>
            </ul>
          </div>
          <div className="mt-8 text-center">
            <h3 className="text-lg font-bold text-gray-800">Dibuat oleh:</h3>
            <p className="text-gray-600">
              Mohammad Rafli Hajat Negara (<span className="font-bold">RaHa</span>)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;  // Perbaiki di sini
