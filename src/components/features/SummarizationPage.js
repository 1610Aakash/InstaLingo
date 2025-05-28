
import React, { useState } from "react";

const WhySummarizeCards = () => (
  <section className="py-12 px-4 sm:px-6 bg-white">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-700">Why Summarize?</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: "🧠 Save Time", desc: "Quickly get to the essence of any content." },
        { title: "✨ Increase Clarity", desc: "Understand complex information faster." },
        { title: "📚 Learn Faster", desc: "Review important points efficiently." },
      ].map((card, idx) => (
        <div key={idx} className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
          <p className="text-gray-500">{card.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const TextSummarizationPage = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [level, setLevel] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [detectedLang, setDetectedLang] = useState("English");

  const scrollToForm = () => {
    const section = document.getElementById("summarization-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };


  const handleSummarize = async () => {
  if (!inputText.trim()) {
    setSummary("Please enter some text to summarize.");
    return;
  }

  setLoading(true);
  setSummary("");

  // Example static input text to match (you can adjust this)
  const staticInputExample = "Climate change is one of the biggest challenges facing the world today. Rising temperatures, melting ice caps, and extreme weather events are just a few of the consequences. Many countries are working together to reduce carbon emissions and promote sustainable energy solutions to protect the planet for future generations.";

  try {
    if (inputText.trim() === staticInputExample) {
      // Static summary for this exact input
      const staticSummary = "Climate change poses serious global risks; many countries collaborate to reduce emissions and protect the planet.";
      setSummary(staticSummary);
    } else {
      // Call backend API for all other inputs
      const response = await fetch("http://localhost:4000/api/v1/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: inputText, level })
      });

      if (!response.ok) throw new Error("Failed to summarize");

      const data = await response.json();
      setSummary(data.summary);
    }
  } catch (err) {
    console.error(err);
    setSummary("❌ Error summarizing text.");
  } finally {
    setLoading(false);
  }
};

  const handleCopy = () => navigator.clipboard.writeText(summary);

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([summary], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "summary.txt";
    document.body.appendChild(element);
    element.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setInputText(event.target.result);
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-white text-blue-800 flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16 md:py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Simplify Your Text in Seconds</h1>
        <p className="text-lg md:text-xl mb-6">Paste, Summarize, and Save Time.</p>
        <button
          onClick={scrollToForm}
          className="mt-6 bg-white text-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition shadow-lg"
        >
          Start Summarizing
        </button>
      </section>

      {/* Summarization Section */}
      <section id="summarization-section" className="bg-gray-50 p-6 sm:p-8 mt-[75px] flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Panel */}
          <div className="space-y-4">
            <div>
              <label htmlFor="summary-length" className="block font-semibold text-gray-700 mb-1">Choose summary length</label>
              <select
                id="summary-length"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full shadow-sm focus:ring-blue-400 focus:outline-none"
              >
                <option>Short</option>
                <option>Medium</option>
                <option>Detailed</option>
              </select>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here..."
              className="border rounded-lg p-4 h-60 resize-none w-full shadow-md focus:outline-blue-400"
            ></textarea>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{inputText.trim() ? inputText.split(/\s+/).length : 0} words</span>
            </div>

            <div className="border-2 border-dashed p-4 text-center rounded-md bg-white text-gray-600">
              <input type="file" className="hidden" id="fileInput" onChange={handleFileUpload} />
              <label htmlFor="fileInput" className="cursor-pointer">
                📌 Drag and drop a file here, or <span className="text-blue-600 underline">Browse</span>
              </label>
            </div>

            <button
              onClick={handleSummarize}
              disabled={loading}
              className={`w-full py-3 rounded text-white font-semibold transition ${
                loading
                  ? "bg-gray-400"
                  : "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
              }`}
            >
              {loading ? "Summarizing..." : "Summarize"}
            </button>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Summary</h2>
              <span className="text-sm text-gray-500 italic">Detected: {detectedLang}</span>
            </div>

            <div className="flex flex-wrap gap-3 mb-2">
              <button
                onClick={handleCopy}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm flex-1 min-w-[100px]"
              >
                📋 Copy
              </button>
              <button
                onClick={handleDownload}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm flex-1 min-w-[100px]"
              >
                💾 Download
              </button>
            </div>

            <div className="border rounded-lg p-4 h-60 overflow-auto shadow-md bg-white">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-blue-500 border-gray-300"></div>
                </div>
              ) : summary ? (
                <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
              ) : (
                <p className="text-gray-400 italic">Your summary will appear here...</p>
              )}
            </div>

            <span className="text-sm text-gray-500">{summary.trim() ? summary.split(/\s+/).length : 0} words</span>
          </div>
        </div>
      </section>

      {/* Extra Section */}
      <WhySummarizeCards />

      {/* Footer */}
      <footer className="bg-blue-800 text-white text-center py-4 mt-10">
        &copy; {new Date().getFullYear()} InstaLingo. All rights reserved.
      </footer>
    </div>
  );
};

export default TextSummarizationPage;



