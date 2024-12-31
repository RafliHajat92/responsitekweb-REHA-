import React from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, getDay } from "date-fns";
import { id as localeID } from "date-fns/locale";

const Kalender = ({ tanggalJadwal }) => {
  // Dapatkan tanggal bulan ini
  const tanggalSekarang = new Date();
  const awalBulan = startOfMonth(tanggalSekarang);
  const akhirBulan = endOfMonth(tanggalSekarang);

  // Buat array semua tanggal dalam bulan ini
  const semuaTanggal = eachDayOfInterval({
    start: awalBulan,
    end: akhirBulan,
  });

  // Fungsi untuk menambahkan jadwal pada tanggal tertentu
  const jadwal = [
    { tanggal: "2024-12-05", kegiatan: "Presentasi Tugas Akhir" },
    { tanggal: "2024-12-10", kegiatan: "UTS Matematika" },
    { tanggal: "2024-12-20", kegiatan: "Workshop AI" },
  ];

  const jadwalMap = jadwal.reduce((map, item) => {
    map[item.tanggal] = item.kegiatan;
    return map;
  }, {});

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-5">Kalender</h2>
      <div className="grid grid-cols-7 gap-4 text-center">
        {/* Header Hari */}
        {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((hari, index) => (
          <div key={index} className="font-semibold text-gray-700">
            {hari}
          </div>
        ))}

        {/* Placeholder sebelum tanggal pertama */}
        {Array.from({ length: getDay(awalBulan) }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {/* Tanggal Kalender */}
        {semuaTanggal.map((tanggal) => {
          const tanggalFormat = format(tanggal, "yyyy-MM-dd");
          const kegiatan = jadwalMap[tanggalFormat];
          return (
            <div
              key={tanggal}
              className={`border p-2 rounded ${
                kegiatan ? "bg-blue-100" : "bg-gray-50"
              }`}
            >
              <div className="font-bold">{format(tanggal, "d", { locale: localeID })}</div>
              {kegiatan && <div className="text-xs text-blue-600 mt-1">{kegiatan}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Kalender;
