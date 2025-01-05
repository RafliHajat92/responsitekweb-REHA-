import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore dari Firebase
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore"; // Impor Firestore methods
import Navbar from "../pages/Navbar"; // Import komponen Navbar

function TambahJadwal() {
  const [form, setForm] = useState({ name: "", room: "", time: "", day: "" });
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState([]); // State untuk menyimpan jadwal

  // Fungsi untuk mengambil data dari Firestore
  const fetchSchedules = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "schedules"));
      const schedulesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSchedules(schedulesData); // Update state schedules dengan data dari Firestore
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  // Ambil data jadwal ketika komponen pertama kali dimuat
  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Menambahkan jadwal ke Firestore
      const docRef = await addDoc(collection(db, "schedules"), form);

      // Menambahkan jadwal ke state lokal setelah berhasil disimpan ke Firestore
      setSchedules([...schedules, { ...form, id: docRef.id }]);

      setForm({ name: "", room: "", time: "", day: "" });

      alert("Jadwal berhasil ditambahkan!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Terjadi kesalahan saat menambahkan jadwal.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (index) => {
    const scheduleToDelete = schedules[index];
    try {
      // Menghapus jadwal dari Firestore berdasarkan ID
      const scheduleDocRef = doc(db, "schedules", scheduleToDelete.id);
      await deleteDoc(scheduleDocRef);

      // Menghapus jadwal dari state lokal setelah berhasil dihapus dari Firestore
      const updatedSchedules = schedules.filter((_, i) => i !== index);
      setSchedules(updatedSchedules);

      alert("Jadwal berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Terjadi kesalahan saat menghapus jadwal.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Konten Tambah Jadwal */}
      <div className="flex flex-col justify-center items-center p-6 flex-grow">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Daftar Mata Kuliah</h1>
          <form onSubmit={handleAdd} className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">Tambah Jadwal Kuliah</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Nama Mata Kuliah"
                value={form.name}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                required
              />
              <input
                type="text"
                name="room"
                placeholder="Ruang Kelas"
                value={form.room}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                required
              />
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                required
              />
              <input
                type="text"
                name="day"
                placeholder="Hari Kuliah"
                value={form.day}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Menambahkan..." : "Tambah Jadwal"}
            </button>
          </form>

          <ul className="mt-8 space-y-4">
            {schedules.map((schedule, index) => (
              <li
                key={schedule.id}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition-all duration-500 ease-in-out transform hover:scale-105"
              >
                <div>
                  <p className="font-semibold text-gray-800">{schedule.name}</p>
                  <p className="text-gray-600">{`${schedule.day}, ${schedule.time}`}</p>
                  <p className="text-gray-600">{`Ruang: ${schedule.room}`}</p>
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 ease-in-out"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TambahJadwal;
