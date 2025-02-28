import { useEffect, useState } from "react";

const UserFinder = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false); 

  // UseEffect to handle initial data fetch
  useEffect(() => {
    const fetchingGithubUsers = async () => {
      if (!triggerSearch || !username) return;

      setUserData(null);
      setError(null);
      setLoading(true);

      try {
        const apiResponse = await fetch(
          `https://api.github.com/users/${username}`
        );

        // Check if the request was successful
        if (!apiResponse.ok) {
          throw new Error("An error occurred while fetching data");
        }

        const apiData = await apiResponse.json();
        setUserData(apiData);
      } catch (error) {
        console.error("The error is", error.message);
        setError(error.message); // Display the error message
      } finally {
        setLoading(false);
        setTriggerSearch(false); // Reset triggerSearch after the fetch
      }
    };

    fetchingGithubUsers();
  }, [triggerSearch, username]);

  const handleClick = () => {
    if (username.trim()) {
      setTriggerSearch(true); // Trigger search if username is valid
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`max-w-md w-full p-6 rounded-lg shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          {darkMode ? "🌙" : "☀️"}
        </button>

        <h2
          className={`text-2xl font-semibold text-center mb-6 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Github User Finder
        </h2>
        <div className="flex mb-4">
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className={`w-full p-2 border-2 rounded-md focus:outline-none ${
              darkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-800"
            }`}
            placeholder="Enter Github Username"
          />
          <button
            onClick={handleClick}
            className={`ml-3 px-4 py-2 rounded-md focus:outline-none font-semibold ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Search
          </button>
        </div>

        {loading && (
          <p
            className={`text-center ${
              darkMode ? "text-blue-400" : "text-blue-500"
            }`}
          >
            Loading....
          </p>
        )}
        {error && (
          <p className={`text-center ${darkMode ? "text-red-400" : "text-red-500"}`}>
            {error}
          </p>
        )}

        {userData && (
          <div className="text-center mt-6">
            <img
              src={userData.avatar_url}
              alt={`${userData.login} avatar`}
              className="mx-auto rounded-full w-32 h-32 object-cover mb-4"
            />
            <h4
              className={`text-xl font-semibold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {userData.name}
            </h4>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-500"} mt-2`}>
              {userData.bio}
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <p
                className={`text-sm p-2 rounded-md font-semibold ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                Followers: {userData.followers}
              </p>
              <p
                className={`text-sm p-2 rounded-md font-semibold ${
                  darkMode
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                Following: {userData.following}
              </p>
              <p
                className={`text-sm p-2 rounded-md font-semibold ${
                  darkMode
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                Public Repos: {userData.public_repos}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFinder;