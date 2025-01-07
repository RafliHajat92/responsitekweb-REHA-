import React, { useState, useEffect } from "react";
import Navbar from "./Navbar"; // Impor Navbar
import bg from "./assets/bg.png";
import Tambahjadwalfix from "./assets/Tambahjadwalfix.png";
import Lihatjadwalfix from "./assets/Lihatjadwalfix.png";
import Kalenderfix from "./assets/Kalenderfix.png";
import rehawomen from "./assets/rehawomen.png";
import logoreha from "./assets/logoreha.png";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      const schedulesCollection = collection(db, "schedules");
      const scheduleSnapshot = await getDocs(schedulesCollection);
      const scheduleList = scheduleSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSchedules(scheduleList);
      setLoading(false);
    };

    fetchSchedules();

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getNextSchedule = () => {
    const upcomingSchedules = schedules.filter((schedule) => {
      const scheduleTime = new Date(`${new Date().toDateString()} ${schedule.time}`);
      return scheduleTime > currentTime;
    });

    upcomingSchedules.sort((a, b) => {
      const aTime = new Date(`${new Date().toDateString()} ${a.time}`);
      const bTime = new Date(`${new Date().toDateString()} ${b.time}`);
      return aTime - bTime;
    });

    return upcomingSchedules[0];
  };

  const nextSchedule = getNextSchedule();

  return (
    <div className="w-screen h-screen overflow-auto">
      {/* Navbar */}
      <Navbar />

      {/* Bagian Atas */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute top-1/3 left-20 right-0 flex justify-between items-start p-12 space-x-16">
          <div className="flex flex-col w-2/3">
            <img
              src={logoreha}
              alt="Logo ReHa"
              className="w-64 h-auto mb-6 transform hover:scale-110 transition-all duration-300 ease-in-out"
            />
            <p className="text-2xl leading-relaxed text-white">
              RaHa adalah teman yang bantu kamu atur jadwal kuliah dengan mudah.
            </p>
            <p className="text-2xl leading-relaxed text-white">
              Cukup masukkan jadwal, dan kamu nggak akan khawatir lupa kuliah lagi.
            </p>
            <p className="text-2xl leading-relaxed text-white">
              Dengan tampilan yang sederhana, RaHa bikin kamu tetap terorganisir dan siap
              menghadapi setiap hari kuliah!
            </p>
            <p className="mt-6 text-3xl font-semibold text-white">Director by: Rafli Hajat</p>
          </div>

          <div className="flex flex-col items-start bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Jadwal Terdekat</h3>
            {loading ? (
              <p>Loading...</p>
            ) : nextSchedule ? (
              <div>
                <p className="font-semibold text-xl">{nextSchedule.name}</p>
                <p className="text-lg">{`${nextSchedule.day}, ${nextSchedule.time}`}</p>
                <p className="text-lg">{`Ruang: ${nextSchedule.room}`}</p>
              </div>
            ) : (
              <p className="text-gray-600 text-lg">Tidak ada jadwal yang terdekat saat ini.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bagian Konten Navigasi dan Highlight */}
      <div className="  bg-gradient-to-b from-cyan-950 via-cyan-900 to-cyan-700 py-20">
        <h2 className="text-center text-4xl font-bold text-white mb-16">
          Mau Pilih Apa nih?
        </h2>

        <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-16 px-16">
          <div className="flex flex-wrap justify-center items-center gap-16">
            <a
              href="/lihatjadwal"
              className="flex flex-col items-center transform hover:scale-110 transition-all duration-300"
            >
              <img
                src={Lihatjadwalfix}
                alt="Lihat Jadwal"
                className="w-72 h-auto rounded-md shadow-xl"
              />
              <p className="mt-4 text-white text-xl font-medium">Lihat Jadwal</p>
            </a>

            <a
              href="/tambahjadwal"
              className="flex flex-col items-center transform hover:scale-110 transition-all duration-300"
            >
              <img
                src={Tambahjadwalfix}
                alt="Tambah Jadwal"
                className="w-72 h-auto rounded-md shadow-xl"
              />
              <p className="mt-4 text-white text-xl font-medium">Tambah Jadwal</p>
            </a>

            <a
              href="/kalender"
              className="flex flex-col items-center transform hover:scale-110 transition-all duration-300"
            >
              <img
                src={Kalenderfix}
                alt="Kalender"
                className="w-72 h-auto rounded-md shadow-xl"
              />
              <p className="mt-4 text-white text-xl font-medium">Kalender</p>
            </a>
          </div>

          <div className="flex justify-center items-center">
            <img src={rehawomen} alt="ReHa Women" className="w-96 lg:w-96 h-auto" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-cyan-950 text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-8">
          {/* Informasi Hak Cipta */}
          <div className="space-y-4">
            <h3 className="font-semibold text-2xl mb-4">Alamat produksi</h3>
            <p className="text-lg">
            Jl. Ringroad Selatan, Kragilan, Tamanan, Kec. 
            Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55191
            </p>
            <p className="text-lg mt-2">
              Tugas Akhir Teknologi Web Semester 3
            </p>
          </div>

          {/* Navigasi */}
          <div className="space-y-4">
            <h3 className="font-semibold text-2xl mb-4">Kelebihan</h3>
            <ul className="space-y-3 text-lg">
              <li>Mempermudah Jadwaj</li>
              <li>Efesiensi waktu</li>
              <li>Pengingat Otomatis</li>
              <li>Teman Terdekat</li>
            </ul>
          </div>

          {/* Media Sosial */}
          <div className="space-y-4">
            <h3 className="font-semibold text-2xl mb-4">Ikuti Kami</h3>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-blue-300 text-lg">Facebook</a>
              <a href="#" className="hover:text-blue-300 text-lg">Twitter</a>
              <a href="#" className="hover:text-blue-300 text-lg">Instagram</a>
            </div>
            <h3 className="font-semibold text-2xl mt-6">Download App</h3>
            <div className="flex space-x-8 mt-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-14"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Download_on_the_App_Store_Badge.svg"
                alt="App Store"
                className="h-14"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
