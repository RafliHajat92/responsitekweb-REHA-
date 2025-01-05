import React, { useState } from "react";

function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontStyle, setFontStyle] = useState("sans-serif");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleFontChange = (event) => {
    setFontStyle(event.target.value);
  };

  return (
    <div
      className={`min-h-screen p-8 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-4xl font-extrabold mb-10 text-center">Settings</h1>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label htmlFor="darkMode" className="text-lg font-medium">
            Dark Mode
          </label>
          <button
            onClick={toggleDarkMode}
            className={`py-2 px-4 rounded-lg ${
              isDarkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            } transition duration-300`}
          >
            {isDarkMode ? "Disable" : "Enable"}
          </button>
        </div>
        <div className="flex items-center justify-between">
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
  );
}

export default Settings;
