import React, { useEffect, useState } from "react";

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "senujT75MUvC3xjRxcaLpQ==l4u6e7lDwAQyCnhi";
  const API_LINK = "https://api.api-ninjas.com/v1/quotes";

  // Function to fetch a new quote
  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_LINK, {
        method: "GET",
        headers: {
          "X-Api-Key": API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }

      const data = await response.json();
      if (data.length > 0) {
        setQuote(data[0].quote);
        setAuthor(data[0].author);
      } else {
        setQuote("No quote found.");
        setAuthor("Unknown");
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Failed to fetch quote. Please try again.");
      setAuthor("Unknown");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a quote when the component mounts
  useEffect(() => {
    fetchQuote();
  }, []);

  // Function to share the quote on Twitter
  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 p-6">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Random Quote Generator
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div>
            {quote && (
              <>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  "{quote}"
                </p>
                <h2 className="text-md font-semibold text-gray-600 dark:text-gray-400">
                  - {author}
                </h2>
              </>
            )}

            <div className="flex justify-center gap-4 mt-6">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                onClick={fetchQuote}
              >
                New Quote
              </button>
              <button
                onClick={tweetQuote}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
              >
                Tweet
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quotes;
