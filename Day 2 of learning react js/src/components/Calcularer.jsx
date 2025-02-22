import React, { useState } from "react";

const Calcularer = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClickButton = (value) => {
    if (value === "=") {
      try {
        setResult(eval(input).toString());
      } catch (error) {
        console.log(error);
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };
  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-900 items-center">
      {/* Calculater Container */}
      <div className="bg-gray-800 p-6 shadow-2xl rounded-lg">
        {/* Display Input */}
        <div className="mb-4">
          <input
            type="text"
            value={input}
            readOnly
            className="w-full text-right p-4 rounded-lg text-white bg-gray-700 focus:outline-none text-3xl font-semibold"
          />
        </div>
        {/* Display Result */}
        <div className="mb-6">
          <input
            type="text"
            value={result}
            readOnly
            className="w-full text-right p-4 rounded-lg text-white bg-gray-700 focus:outline-none text-3xl font-semibold"
          />
        </div>
        {/* Calculater Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {[
            "7",
            "8",
            "9",
            "/",
            "4",
            "5",
            "6",
            "*",
            "1",
            "2",
            "3",
            "-",
            "0",
            ".",
            "=",
            "+",
            "C",
          ].map((button) => (
            <button
              key={button}
              onClick={() => handleClickButton(button)}
              className={`p-6  text-2xl font-semibold rounded-lg transition-colors ${
                button === "="
                  ? "col-span-2 bg-blue-600 hover:bg-blue-700"
                  : button === "C"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calcularer;
