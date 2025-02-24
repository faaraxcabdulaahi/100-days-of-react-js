import React, { useEffect, useState } from "react";

const EmojiFinder = () => {
  const [search, setSearch] = useState("");
  const [emojis, setEmojis] = useState([]);
  const [error, setError] = useState(null);
  const [filteredEmojis, setFilteredEmojis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedEmoji, setCopiedEmoji] = useState(null);

  useEffect(() => {
    const fetchEmojis = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://emojihub.yurace.pro/api/all");
        if (!response.ok) {
          throw new Error("Failed to fetch emojis");
        }
        const data = await response.json();
        setEmojis(data);
        setFilteredEmojis(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmojis();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredEmojis(emojis);
    } else {
      const filtered = emojis.filter((emoji) =>
        emoji.name?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredEmojis(filtered);
    }
  }, [search, emojis]);

  const copyClipboard = (emoji) => {
    navigator.clipboard.writeText(emoji);
    setCopiedEmoji(emoji);
    setTimeout(() => setCopiedEmoji(null), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Emoji Finder
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Search and copy your favorite emojis instantly!
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-6 max-w-lg mx-auto">
          <input
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            type="text"
            placeholder="🔍 Search emoji..."
            onChange={(event) => setSearch(event.target.value)}
            value={search}
          />
          {search && (
            <button
              className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition"
              onClick={() => setSearch("")}
            >
              ✖
            </button>
          )}
        </div>

        {/* Loading and Error Messages */}
        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading emojis...
          </p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Emoji Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredEmojis.map((emoji, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => copyClipboard(emoji.htmlCode[0])}
              >
                <span
                  className="text-5xl md:text-6xl mb-2"
                  dangerouslySetInnerHTML={{ __html: emoji.htmlCode[0] }}
                />
                <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                  {emoji.name}
                </p>
                {/* Copy Button */}
                <button className="mt-2 px-4 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  {copiedEmoji === emoji.htmlCode[0] ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* No Result Message */}
        {!loading && !error && filteredEmojis.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            No emojis found. Try a different search!
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiFinder;
