


import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SentimentAnalysisPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleAnalyze = async () => {
  const trimmed = text.trim();
  if (!trimmed) return;

  try {
    const lowerText = trimmed.toLowerCase();

  // Define positive keywords
  const positiveKeywords = ["good", "excited", "happy","love","great","amazing","incredible","fantastic","brilliant","beautiful","positive"];
  const negativeKeywords = ["bad", "sad", "angry", "upset", "worried", "anxious", "depressed", "unhappy","bad","terrible"];

  // Check if any positive keyword is present
  const isPositive = positiveKeywords.some(keyword => lowerText.includes(keyword));
  const isNegative = negativeKeywords.some(word => lowerText.includes(word));

  let sentiment = "😐 Neutral";

  if (isPositive) sentiment = "😊 Positive";
  else if (isNegative) sentiment = "😞 Negative";

  setResult(sentiment);

    const response = await fetch("http://localhost:4000/api/v1/sentiment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: trimmed }),
    });

    if (!response.ok) throw new Error("Failed to analyze sentiment");

    const data = await response.json();
    setResult(data.sentiment || "😐 Neutral");
  } catch (error) {
    console.error("Error analyzing sentiment:", error.message);
    // toast.error("Failed to analyze sentiment.");
  }
};


  const resultDescription = (sentiment) => {
    if (sentiment.includes("Positive")) return "The overall feeling is positive and happy.";
    if (sentiment.includes("Negative")) return "The overall feeling is negative or unpleasant.";
    return "The overall feeling is neutral or mixed.";
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast.success("Result copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sentiment-result.txt";
    link.click();
    toast.success("Download started!");
  };

  const handleRefresh = () => {
    setText("");
    setResult("");
  };

  return (
    <div className="min-h-screen bg-white text-blue-800">
      <Toaster position="top-center" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Analyze Sentiment Instantly</h1>
        <p className="text-lg mb-6">Discover the emotions behind any text using our AI-powered sentiment analysis tool.</p>
        <button
          className="px-6 py-2 bg-white text-blue-800 font-semibold rounded-full hover:bg-blue-100 transition"
          onClick={() => document.getElementById("sentiment-analysis-section")?.scrollIntoView({ behavior: "smooth" })}
        >
          Start Analysis
        </button>
      </section>

      {/* Main Section */}
      <section id="sentiment-analysis-section" className="min-h-screen bg-gray-50 p-8 mt-[75px]">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Input Section */}
          <div className="w-full md:w-1/2 space-y-4">
            <label className="block font-semibold text-gray-700">Enter Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your text for sentiment analysis..."
              className="border rounded-lg p-4 h-60 resize-none shadow-md focus:outline-blue-400 w-full"
            ></textarea>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAnalyze}
                disabled={!text.trim()}
                className={`w-full py-2 rounded text-white font-semibold shadow transition ${
                  !text.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
                }`}
              >
                Analyze Sentiment
              </button>

              <button
                onClick={handleRefresh}
                className="w-full py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow transition"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Result Section */}
          <div className="w-full md:w-1/2 flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Analysis Result</h2>
            </div>

            <div className="border rounded-lg p-4 h-60 overflow-auto shadow-md bg-white flex items-center justify-center">
              {result ? (
                <div className="text-center space-y-2 transition-opacity duration-500 animate-fadeIn">
                  <h3
                    className={`text-2xl font-bold flex items-center justify-center gap-2 ${
                      result.includes("Positive")
                        ? "text-green-600"
                        : result.includes("Negative")
                        ? "text-red-600"
                        : "text-black"
                    }`}
                  >
                    {result.includes("Positive") && "😊"}
                    {result.includes("Negative") && "😠"}
                    {result.includes("Neutral") && "😐"}
                    <span>{result}</span>
                  </h3>
                  <p className="text-gray-600">{resultDescription(result)}</p>
                </div>
              ) : (
                <p className="text-gray-400 italic text-center">Your sentiment result will appear here...</p>
              )}
            </div>

            {result && (
              <div className="flex flex-col sm:flex-row justify-end gap-4 text-sm text-gray-500">
                <button
                  onClick={handleCopy}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                >
                  Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                >
                  Download
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Extra Section */}
      <section className="py-12 bg-white px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">Why Use Sentiment Analysis?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Understand Emotions in Text", icon: "😊" },
            { title: "Make Data-Driven Decisions", icon: "📊" },
            { title: "Improve Customer Feedback", icon: "💡" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-blue-50 rounded-2xl shadow hover:shadow-lg transition-shadow p-6 flex flex-col items-center justify-center"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white text-center p-4 mt-10">
        &copy; {new Date().getFullYear()} InstaLingo – All rights reserved.
      </footer>
    </div>
  );
}
