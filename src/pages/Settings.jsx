import React, { useState } from "react";
import Navbar from "./Navbar"; // Import Navbar untuk ditampilkan di halaman Settings

function Settings() {
  const [fontStyle, setFontStyle] = useState("sans-serif");

  const handleFontChange = (event) => {
    setFontStyle(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900" style={{ fontFamily: fontStyle }}>
      <Navbar /> {/* Tambahkan Navbar di bagian atas */}
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-extrabold mb-10 text-center">Settings</h1>
        <div className="space-y-8">
          {/* Font Style Setting */}
          <div className="flex items-center justify-between bg-white rounded-lg shadow p-4">
            <label htmlFor="fontStyle" className="text-lg font-medium">
              Font Style
            </label>
            <select
              id="fontStyle"
              value={fontStyle}
              onChange={handleFontChange}
              className="border border-gray-300 rounded-lg py-2 px-4 focus:ring focus:ring-blue-300"
            >
              <option value="sans-serif">Sans Serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
