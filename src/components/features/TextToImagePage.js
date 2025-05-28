


import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const TextToImage = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copyingURL, setCopyingURL] = useState(false);
  const [copyingImage, setCopyingImage] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);


  const handleGenerate = async () => {
  if (!prompt.trim()) {
    toast.error("Please enter a prompt before generating!");
    return;
  }

  setLoading(true);
  setImage(null);

  // Define static image for "car" prompt
  const staticPrompt = "car";
  const staticImageUrl = "/generated_image.png";

  try {
    const normalizedPrompt = prompt.trim().toLowerCase();

    if (normalizedPrompt === staticPrompt) {
      // Show static car image
      setImage(staticImageUrl);
    } else {
      // Fallback to API
      const response = await fetch("http://localhost:4000/api/v1/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (response.ok && data.imageUrl) {
        setImage(data.imageUrl);
        toast.success("Image generated successfully!");
      } else {
        throw new Error(data.message || "Failed to generate image");
      }
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};


  const handleCopyURL = async () => {
    if (!image) return;
    setCopyingURL(true);
    try {
      await navigator.clipboard.writeText(image);
      toast.success("Image URL copied to clipboard!");
    } catch {
      toast.error("Failed to copy URL.");
    } finally {
      setCopyingURL(false);
    }
  };

  const handleCopyImage = async () => {
    if (!image) return;
    setCopyingImage(true);
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      toast.success("Image copied to clipboard!");
    } catch {
      toast.error("Failed to copy image.");
    } finally {
      setCopyingImage(false);
    }
  };

  const handleDownload = () => {
    if (!image) return;
    setDownloading(true);
    try {
      const link = document.createElement("a");
      link.href = image;
      link.download = "generated-image.png";
      link.click();
      toast.success("Image download started!");
    } catch {
      toast.error("Download failed.");
    } finally {
      setDownloading(false);
    }
  };

  const handleRegenerate = () => {
    if (!prompt.trim()) {
      toast.error("Prompt cannot be empty for regeneration!");
      return;
    }
    setRegenerating(true);
    setImage(null);
    setTimeout(() => {
      setImage("https://via.placeholder.com/400x300?text=Regenerated+Image");
      setRegenerating(false);
    }, 2000);
  };

  const handleRefreshPrompt = () => {
    setPrompt("");
    setImage(null);
    toast("Prompt cleared.");
  };

  return (
    <div className="min-h-screen bg-white text-blue-800">
      <Toaster position="top-right" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16 md:py-20 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Transform Text into Stunning Images</h1>
        <p className="text-md md:text-lg mb-6">Describe your imagination and let AI turn it into a beautiful visual in seconds.</p>
        <button
          className="px-6 py-3 bg-white text-blue-800 font-semibold rounded-full hover:bg-blue-100 transition"
          onClick={() => document.getElementById('generator-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Generate Image
        </button>
      </section>

      {/* Generator Section */}
      <section id="generator-section" className="min-h-screen bg-gray-50 p-6 md:p-12 mt-[75px]">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Panel */}
          <div className="w-full md:w-1/2 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">Enter Your Imagination Prompt</h3>
              <button
                onClick={handleRefreshPrompt}
                className="text-xs px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded"
              >
                🔄 Refresh
              </button>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to see..."
              className="border rounded-lg p-4 h-60 resize-none shadow-md focus:outline-blue-400 w-full"
            ></textarea>

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className={`w-full py-3 rounded text-white shadow text-lg bg-gradient-to-r ${
                loading
                  ? "from-gray-400 to-gray-300 cursor-not-allowed"
                  : "from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
              }`}
            >
              {loading ? "⏳ Generating..." : "▶️ Generate Image"}
            </button>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-1/2 flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Generated Image</h2>

            {/* Top Buttons */}
            {image && (
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleCopyURL}
                  disabled={copyingURL}
                  className="flex-1 min-w-[120px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50 text-sm"
                >
                  📋 {copyingURL ? "Copying..." : "Copy URL"}
                </button>
                <button
                  onClick={handleCopyImage}
                  disabled={copyingImage}
                  className="flex-1 min-w-[120px] bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded disabled:opacity-50 text-sm"
                >
                  🖼️ {copyingImage ? "Copying..." : "Copy Image"}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="flex-1 min-w-[120px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 text-sm"
                >
                  📥 {downloading ? "Downloading..." : "Download"}
                </button>
              </div>
            )}

            {/* Image Preview */}
            <div className="border rounded-lg p-4 h-60 md:h-[300px] overflow-auto shadow-md bg-white flex items-center justify-center">
            {loading || regenerating ? (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_2s_infinite] rounded-lg" />
    <style>{`
      @keyframes shimmer {
        0% {
          background-position: -500px 0;
        }
        100% {
          background-position: 500px 0;
        }
      }
      .animate-[shimmer_2s_infinite] {
        background-size: 1000px 100%;
        animation: shimmer 2s infinite linear;
      }
    `}</style>
  </div>
) : image ? (
  <img
    src={image}
    alt="Generated"
    className="rounded-lg shadow-md max-h-full object-contain"
  />
) : (
  <p className="text-gray-400 italic text-center">Your generated image will appear here...</p>
)}

            </div>

            {/* Regenerate Button */}
            {image && !loading && (
              <button
                onClick={handleRegenerate}
                disabled={regenerating || !prompt.trim()}
                className="mt-2 w-full py-3 rounded text-white shadow bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 disabled:opacity-50 text-lg"
              >
                🔄 {regenerating ? "Regenerating..." : "Regenerate"}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white px-6 md:px-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-blue-800">Why Use Text-to-Image AI?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { title: "Visualize Ideas Instantly", icon: "🎨" },
            { title: "Save Time & Effort", icon: "⏱️" },
            { title: "Create Unique Artwork", icon: "🖼️" },
          ].map((item, index) => (
            <div key={index} className="bg-blue-50 rounded-2xl shadow hover:shadow-lg transition-shadow p-6 flex flex-col items-center">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white text-center py-4 mt-10 text-sm md:text-base">
        &copy; {new Date().getFullYear()} InstaLingo. All rights reserved.
      </footer>
    </div>
  );
};

export default TextToImage;
