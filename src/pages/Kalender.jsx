import React, { useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, getDay, addMonths, subMonths } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { toZonedTime } from 'date-fns-tz';
import Navbar from "./Navbar"; // Import Navbar

const Kalender = ({ tanggalJadwal }) => {
  // Dapatkan waktu lokal Indonesia (WIB)
  const timezone = "Asia/Jakarta";
  const localDate = toZonedTime(new Date(), timezone); // Ganti dari utcToZonedTime menjadi toZonedTime

  const [currentDate, setCurrentDate] = useState(localDate);

  // Fungsi untuk mendapatkan tanggal awal dan akhir bulan
  const getBulan = (date) => {
    const awalBulan = startOfMonth(date);
    const akhirBulan = endOfMonth(date);
    return { awalBulan, akhirBulan };
  };

  const { awalBulan, akhirBulan } = getBulan(currentDate);

  // Buat array semua tanggal dalam bulan ini
  const semuaTanggal = eachDayOfInterval({
    start: awalBulan,
    end: akhirBulan,
  });

  // Fungsi untuk menambahkan jadwal pada tanggal tertentu
  const jadwal = [];

  const jadwalMap = jadwal.reduce((map, item) => {
    map[item.tanggal] = item.kegiatan;
    return map;
  }, {});

  // Fungsi untuk mengubah bulan
  const ubahBulan = (jumlahBulan) => {
    setCurrentDate((prevDate) => (jumlahBulan > 0 ? addMonths(prevDate, 1) : subMonths(prevDate, 1)));
  };

  return (
    <div className="bg-gradient-to-br from-cyan-100 via-cyan-300 to-cyan-500 min-h-screen"> {/* Memberikan padding-top */}
      <Navbar /> {/* Menampilkan Navbar */}

      <div className="p-8 bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto mt-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-800">Kalender</h2>

        {/* Navigasi Bulan */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => ubahBulan(-1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
          >
            <MdArrowBack size={20} />
          </button>
          <div className="text-2xl font-semibold text-indigo-700 mx-4">
            {format(currentDate, "MMMM yyyy", { locale: localeID })}
          </div>
          <button
            onClick={() => ubahBulan(1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
          >
            <MdArrowForward size={20} />
          </button>
        </div>

        {/* Kalender Grid */}
        <div className="grid grid-cols-7 gap-4 text-center">
          {/* Header Hari */}
          {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((hari, index) => (
            <div key={index} className="font-semibold text-gray-700">{hari}</div>
          ))}

          {/* Placeholder sebelum tanggal pertama */}
          {Array.from({ length: getDay(awalBulan) }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {/* Tanggal Kalender */}
          {semuaTanggal.map((tanggal) => {
            const tanggalFormat = format(tanggal, "yyyy-MM-dd");
            const kegiatan = jadwalMap[tanggalFormat];
            const isToday = format(tanggal, "yyyy-MM-dd") === format(localDate, "yyyy-MM-dd");
            return (
              <div
                key={tanggal}
                className={`relative border p-4 rounded-lg transition-all duration-300 ease-in-out transform ${
                  kegiatan
                    ? "bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 text-white hover:scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } ${isToday ? "border-4 border-indigo-600 scale-110" : "border-gray-300"} hover:shadow-lg`}
              >
                <div className={`font-bold text-lg ${isToday ? "text-indigo-800" : ""}`}>
                  {format(tanggal, "d", { locale: localeID })}
                </div>
                {kegiatan && (
                  <div className="absolute bottom-2 left-2 text-xs text-white font-semibold">
                    {kegiatan}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Kalender;
