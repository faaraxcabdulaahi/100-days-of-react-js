import React, { useEffect, useRef, useState } from "react";

const UseRef = () => {
  // useRef for auto-focusing the input field
  const nameInputRef = useRef(null);

  // useRef for scrolling to the profile section
  const profileRef = useRef(null);

  // useRef for image upload preview
  const imageUploadRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  // State for form inputs
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  // State for dark mode
  const [darkMode, setDarkMode] = useState(true);

  // State to control whether the profile details should be shown
  const [showProfile, setShowProfile] = useState(false);

  // Auto-focus the input field on component mount
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !bio.trim()) {
      setError("Please fill out all fields");
    } else {
      setError("");
      setShowProfile(true); // Show the profile details section
      scrollToProfile(); // Scroll to the profile details section
    }
  };

  // Scroll to the profile section
  const scrollToProfile = () => {
    if (profileRef.current) {
      profileRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      } transition-all duration-150 p-8`}
    >
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Interactive User Dashboard</h1>
        <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Learning useRef and React State Management
        </p>
        <button
          className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300"
          onClick={toggleDarkMode}
        >
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </header>

      {/* Form Section */}
      <section
        className={`max-w-md mx-auto p-8 rounded-lg shadow-xl ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        } border transition-all duration-150`}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            {/* Name */}
            <label
              htmlFor="name"
              className={`block font-semibold mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              ref={nameInputRef}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={`w-full px-4 py-2 border ${
                darkMode ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-white"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Enter your name"
            />
          </div>
          {/* Bio */}
          <div className="mb-6">
            <label
              htmlFor="bio"
              className={`block font-semibold mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Bio
            </label>
            <textarea
              name="bio"
              id="bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              maxLength={100}
              className={`w-full px-4 py-2 border ${
                darkMode ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-white"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Tell us about yourself"
            ></textarea>
            <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {bio.length}/100 characters
            </p>
          </div>
          {/* Upload Profile Picture */}
          <div className="mb-6">
            <label
              htmlFor="image"
              className={`block font-semibold mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Upload Profile Picture
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image"
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed ${
                  darkMode ? "border-gray-700 hover:border-indigo-500" : "border-gray-300 hover:border-indigo-500"
                } rounded-lg cursor-pointer transition-all duration-300`}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="size-28 rounded-full object-cover"
                  />
                ) : (
                  <div className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <span className="text-sm">Click to upload</span>
                  </div>
                )}
                <input
                  type="file"
                  id="image"
                  ref={imageUploadRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300"
          >
            Update Profile
          </button>
        </form>
      </section>

      {/* Scroll-to-Profile Button */}
      {showProfile && (
        <div className="text-center mt-8">
          <button
            onClick={scrollToProfile}
            className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-all duration-300"
          >
            Scroll to Profile Details
          </button>
        </div>
      )}

      {/* Profile Section */}
      {showProfile && (
        <section
          ref={profileRef}
          className={`mt-16 p-8 rounded-lg shadow-xl ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
          } border transition-all duration-150 max-w-md mx-auto`}
        >
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
            Profile Details
          </h2>
          {name && <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Name: {name}</p>}
          {bio && <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Bio: {bio}</p>}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile"
              className="mt-4 size-32 rounded-full object-cover"
            />
          )}
        </section>
      )}
    </div>
  );
};

export default UseRef;