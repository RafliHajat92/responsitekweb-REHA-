import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function LihatJadwal() {
  const [schedules, setSchedules] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchSchedules = async () => {
      const schedulesCollection = collection(db, "schedules");
      const scheduleSnapshot = await getDocs(schedulesCollection);
      const scheduleList = scheduleSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSchedules(scheduleList);
    };

    fetchSchedules();
  }, []);

  const handleDelete = async (id) => {
    const scheduleDoc = doc(db, "schedules", id);
    await deleteDoc(scheduleDoc);
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const startEditing = (schedule) => {
    setIsEditing(schedule.id);
    setEditData(schedule);
  };

  const handleEdit = async () => {
    const scheduleDoc = doc(db, "schedules", editData.id);
    await updateDoc(scheduleDoc, editData);
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === editData.id ? editData : schedule
      )
    );
    setIsEditing(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
        Daftar Mata Kuliah
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
          >
            {isEditing === schedule.id ? (
              <div className="space-y-4">
                <input
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-300"
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  placeholder="Nama Mata Kuliah"
                />
                <input
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-300"
                  type="text"
                  name="day"
                  value={editData.day}
                  onChange={handleChange}
                  placeholder="Hari"
                />
                <input
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-300"
                  type="text"
                  name="time"
                  value={editData.time}
                  onChange={handleChange}
                  placeholder="Jam"
                />
                <input
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-300"
                  type="text"
                  name="room"
                  value={editData.room}
                  onChange={handleChange}
                  placeholder="Ruang"
                />
                <button
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                  onClick={handleEdit}
                >
                  Simpan
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xl font-bold text-gray-800">{schedule.name}</p>
                <p className="text-gray-600">{`${schedule.day}, ${schedule.time}`}</p>
                <p className="text-gray-600">{`Ruang: ${schedule.room}`}</p>
              </div>
            )}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="text-blue-500 hover:text-blue-700 transition"
                onClick={() => startEditing(schedule)}
              >
                <AiFillEdit size={28} />
              </button>
              <button
                className="text-red-500 hover:text-red-700 transition"
                onClick={() => handleDelete(schedule.id)}
              >
                <AiFillDelete size={28} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LihatJadwal;
