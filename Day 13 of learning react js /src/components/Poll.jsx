import React, { useState, useEffect } from "react";

const Poll = () => {
  // Poll title and options
  const [pollTitle, setPollTitle] = useState("");
  const [pollOptions, setPollOptions] = useState(["", "", ""]);
  const [isPollCreated, setIsPollCreated] = useState(false);

  // Retrieve votes from localStorage or initialize to zero
  const [votes, setVotes] = useState(() => {
    const storedVotes = localStorage.getItem("pollVotes");
    return storedVotes ? JSON.parse(storedVotes) : [0, 0, 0];
  });

  // Poll vote limit
  const [voteLimit, setVoteLimit] = useState(10); // Set the limit to 10 votes per option

  // Retrieve theme from localStorage or use system preference
  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  // Apply theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Calculate total votes
  const totalVotes = votes.reduce((sum, v) => sum + v, 0);

  // Save votes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("pollVotes", JSON.stringify(votes));
  }, [votes]);

  // Load poll title and options from localStorage on page reload
  useEffect(() => {
    const savedTitle = localStorage.getItem("pollTitle");
    const savedOptions = localStorage.getItem("pollOptions");
    if (savedTitle && savedOptions) {
      setPollTitle(savedTitle);
      setPollOptions(JSON.parse(savedOptions));
      setIsPollCreated(true);
    }
  }, []);

  // Function to handle voting
  const handleVote = (index) => {
    if (votes[index] < voteLimit) {
      const newVotes = [...votes];
      newVotes[index] += 1;
      setVotes(newVotes);
    }
  };

  // Check if poll is completed (one of the options has reached the vote limit)
  const isPollCompleted = votes.some((vote) => vote >= voteLimit);

  // Calculate winner option
  const getWinner = () => {
    const maxVotes = Math.max(...votes);
    const winnerIndex = votes.indexOf(maxVotes);
    return pollOptions[winnerIndex];
  };

  // Reset Poll
  const resetPoll = () => {
    setVotes([0, 0, 0]);
    localStorage.removeItem("pollVotes");
  };

  // Handle creating a new poll
  const handleCreatePoll = () => {
    if (pollTitle && pollOptions.every((option) => option.trim() !== "")) {
      setIsPollCreated(true);
      localStorage.setItem("pollTitle", pollTitle);
      localStorage.setItem("pollOptions", JSON.stringify(pollOptions));
      setVotes([0, 0, 0]); // Reset votes when a new poll is created
    } else {
      alert("Please provide a valid poll title and options.");
    }
  };

  // Handle going back to create poll
  const handleGoBack = () => {
    setIsPollCreated(false);
    setPollTitle("");
    setPollOptions(["", "", ""]);
    localStorage.removeItem("pollTitle");
    localStorage.removeItem("pollOptions");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } p-6 transition-all duration-300`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full transition hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Title */}
      <h1
        className={`text-4xl font-extrabold text-center ${
          darkMode ? "text-gray-100" : "text-gray-900"
        } mb-6`}
      >
        📊 Advanced Poll System
      </h1>

      {/* Poll Creation Form or Poll Display */}
      {!isPollCreated ? (
        <div
          className={`w-full max-w-lg ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
          } p-6 rounded-2xl shadow-lg mb-6 transition-all duration-500`}
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            Create a New Poll
          </h2>
          <div className="mb-4">
            <input
              type="text"
              value={pollTitle}
              onChange={(e) => setPollTitle(e.target.value)}
              placeholder="Poll Title"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            />
          </div>
          {pollOptions.map((option, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                value={pollOptions[index]}
                onChange={(e) => {
                  const newOptions = [...pollOptions];
                  newOptions[index] = e.target.value;
                  setPollOptions(newOptions);
                }}
                placeholder={`Option ${index + 1}`}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              />
            </div>
          ))}

          {/* Vote Limit Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Set Vote Limit</label>
            <input
              type="number"
              value={voteLimit}
              onChange={(e) => setVoteLimit(Number(e.target.value))}
              min="1"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            />
          </div>

          <button
            onClick={handleCreatePoll}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition"
          >
            Create Poll
          </button>
        </div>
      ) : (
        <div
          className={`w-full max-w-lg ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
          } p-6 rounded-2xl shadow-lg mb-6 transition-all duration-500`}
        >
          {/* Poll Title */}
          <h2 className="text-2xl font-bold text-center mb-4">{pollTitle}</h2>

          {/* Total Votes */}
          <p className="text-lg font-medium text-center mb-4">
            Total Votes:{" "}
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {totalVotes}
            </span>
          </p>

          {/* Poll Options */}
          {pollOptions.map((option, index) => {
            const percentage = totalVotes
              ? ((votes[index] / totalVotes) * 100).toFixed(1)
              : 0;
            return (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">{option}</span>
                  <span className="text-sm">
                    {votes[index]} votes ({percentage}%)
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                {/* Vote Button */}
                <button
                  onClick={() => handleVote(index)}
                  disabled={votes[index] >= voteLimit || isPollCompleted}
                  className={`mt-3 w-full ${
                    votes[index] >= voteLimit || isPollCompleted
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white font-bold py-2 rounded-lg transition`}
                >
                  Vote for {option}
                </button>
              </div>
            );
          })}

          {/* Poll Result */}
          {isPollCompleted && (
            <p className="text-center font-bold text-xl mt-4">
              The winning option is:{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {getWinner()}
              </span>
            </p>
          )}

          <button
            onClick={handleGoBack}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-2 rounded-lg mt-4 transition"
          >
            Back to Create Poll
          </button>

          {/* Reset Poll */}
          <button
            onClick={resetPoll}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg mt-4 transition"
          >
            Reset Poll
          </button>
        </div>
      )}
    </div>
  );
};

export default Poll;
