import React, { useState } from "react";
import { Copy } from "lucide-react";

const ColorPicker = () => {
  const [color, setColor] = useState("#000");
  const [copied, setCopied] = useState(false);

  // Copy color to clipboard
  const copytClipBoard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center transition duration-500 ease-in-out transform hover:scale-105">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-white mb-6">
          🎨 Color Picker
        </h1>

        {/* Color Preview */}
        <div
          className="w-full h-48 rounded-lg mt-4 border-2 border-gray-600 shadow-lg transform hover:scale-105 transition-all duration-300"
          style={{ backgroundColor: color }}
        ></div>

        {/* Color Input */}
        <input
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          className="mt-6 w-36 h-16 cursor-pointer border-4 border-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105"
        />

        {/* Selected Color code & Copy Button */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <span className="text-lg font-semibold px-4 py-2 bg-gray-700 rounded-lg text-white">
            {color}
          </span>
          <button
            onClick={copytClipBoard}
            className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition duration-300 transform hover:scale-105"
          >
            <Copy size={18} />
          </button>
        </div>

        {/* Copy Confirmation Message */}
        {copied && (
          <p className="mt-4 text-green-400 text-sm font-medium animate-pulse">
            ✅ Color copied to clipboard!
          </p>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
