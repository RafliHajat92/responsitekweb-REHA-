import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import TambahJadwal from "./pages/TambahJadwal";
import LihatJadwal from "./pages/Lihatjadwal";
import Dashboard from "./pages/dashboard";
import Kalender from "./pages/Kalender";

function App() {
  const [schedules, setSchedules] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/tambahjadwal"
          element={<TambahJadwal schedules={schedules} setSchedules={setSchedules} />}
        />
        <Route
          path="/lihatjadwal"
          element={<LihatJadwal jadwal={schedules} />}
        />
        <Route path="/kalender" element={<Kalender />} />
      </Routes>
    </Router>
  );
}

export default App;
