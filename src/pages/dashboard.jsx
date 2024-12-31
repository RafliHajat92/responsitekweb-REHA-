import React, { useState, useEffect } from "react";
import bg from "./assets/bg.png";
import Tambahjadwalfix from "./assets/Tambahjadwalfix.png";
import Lihatjadwalfix from "./assets/Lihatjadwalfix.png";
import Kalenderfix from "./assets/Kalenderfix.png";
import rehawomen from "./assets/rehawomen.png";
import logoreha from "./assets/logoreha.png";
import { db } from "../firebase"; // Impor Firestore dari Firebase
import { collection, getDocs } from "firebase/firestore"; // Impor Firestore methods

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  // Fetch data jadwal dari Firestore
  useEffect(() => {
    const fetchSchedules = async () => {
      const schedulesCollection = collection(db, "schedules");
      const scheduleSnapshot = await getDocs(schedulesCollection);
      const scheduleList = scheduleSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSchedules(scheduleList);
      setLoading(false); // Set loading ke false setelah data diterima
    };

    fetchSchedules();

    // Update waktu setiap detik
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Membersihkan interval saat komponen unmount
    return () => clearInterval(intervalId);
  }, []);

  // Fungsi untuk mencari jadwal terdekat
  const getNextSchedule = () => {
    const upcomingSchedules = schedules.filter((schedule) => {
      const scheduleTime = new Date(`${new Date().toDateString()} ${schedule.time}`);
      return scheduleTime > currentTime; // Filter jadwal yang lebih besar dari waktu sekarang
    });

    upcomingSchedules.sort((a, b) => {
      const aTime = new Date(`${new Date().toDateString()} ${a.time}`);
      const bTime = new Date(`${new Date().toDateString()} ${b.time}`);
      return aTime - bTime; // Urutkan berdasarkan waktu yang lebih dekat
    });

    return upcomingSchedules[0]; // Ambil jadwal terdekat
  };

  const nextSchedule = getNextSchedule();

  return (
    <div className="w-screen h-screen overflow-auto">
      {/* Bagian Atas */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute top-1/3 left-20 right-0 flex justify-between items-start p-6 space-x-12">
          {/* Logo dan Deskripsi */}
          <div className="flex flex-col w-2/3">
            <img
              src={logoreha}
              alt="Logo ReHa"
              className="w-48 h-auto mb-5 transform hover:scale-110 transition-all duration-300 ease-in-out"
            />
            <p className="text-lg leading-relaxed transform hover:translate-x-1 transition-all duration-300 ease-in-out text-white">
              RaHa adalah teman yang bantu kamu atur jadwal kuliah dengan mudah.
            </p>
            <p className="text-lg leading-relaxed transform hover:translate-x-1 transition-all duration-300 ease-in-out text-white">
              Cukup masukkan jadwal, dan kamu nggak akan khawatir lupa kuliah lagi. Dengan tampilan
            </p>
            <p className="text-lg leading-relaxed transform hover:translate-x-1 transition-all duration-300 ease-in-out text-white">
              yang sederhana, RaHa bikin kamu tetap terorganisir dan siap menghadapi setiap hari kuliah!
            </p>
            <p className="mt-4 text-xl font-semibold transform hover:translate-x-1 transition-all duration-300 ease-in-out text-white">
              Director by: Rafli Hajat
            </p>
          </div>

          {/* Jadwal Terdekat */}
          <div className="flex flex-col items-start bg-white p-4 rounded-lg shadow-md max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Jadwal Terdekat</h3>
            {loading ? (
              <p>Loading...</p> // Indikator loading
            ) : nextSchedule ? (
              <div>
                <p className="font-semibold">{nextSchedule.name}</p>
                <p>{`${nextSchedule.day}, ${nextSchedule.time}`}</p>
                <p>{`Ruang: ${nextSchedule.room}`}</p>
              </div>
            ) : (
              <p className="text-gray-600">Tidak ada jadwal yang terdekat saat ini.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bagian Konten Navigasi dan Highlight */}
      <div className="bg-gray-50 py-16">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">
          Fitur Navigasi
        </h2>

        {/* Layout Grid: Navigasi + Highlight */}
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-12 px-10">
          {/* Navigasi */}
          <div className="flex flex-wrap justify-center items-center gap-12">
            <a
              href="/tambahjadwal"
              className="flex flex-col items-center transform hover:scale-110 hover:translate-y-2 transition-all duration-300 ease-in-out"
            >
              <img
                src={Tambahjadwalfix}
                alt="Tambah Jadwal"
                className="w-56 h-auto rounded-md shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
              />
              <p className="mt-3 text-gray-600 text-lg font-medium transform hover:translate-x-1 transition-all duration-300 ease-in-out">
                Tambah Jadwal
              </p>
            </a>

            <a
              href="/lihatjadwal"
              className="flex flex-col items-center transform hover:scale-110 hover:translate-y-2 transition-all duration-300 ease-in-out"
            >
              <img
                src={Lihatjadwalfix}
                alt="Lihat Jadwal"
                className="w-56 h-auto rounded-md shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
              />
              <p className="mt-3 text-gray-600 text-lg font-medium transform hover:translate-x-1 transition-all duration-300 ease-in-out">
                Lihat Jadwal
              </p>
            </a>

            <a
              href="/kalender"
              className="flex flex-col items-center transform hover:scale-110 hover:translate-y-2 transition-all duration-300 ease-in-out"
            >
              <img
                src={Kalenderfix}
                alt="Kalender"
                className="w-56 h-auto rounded-md shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
              />
              <p className="mt-3 text-gray-600 text-lg font-medium transform hover:translate-x-1 transition-all duration-300 ease-in-out">
                Kalender
              </p>
            </a>
          </div>

          {/* Highlight Gambar Wanita */}
          <div className="flex justify-center items-center">
            <img
              src={rehawomen}
              alt="ReHa Women"
              className="w-96 lg:w-96 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
