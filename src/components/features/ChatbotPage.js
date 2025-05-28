import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Scroll to the bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load dark mode setting
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) setDarkMode(savedMode === "true");
  }, []);

  // Save dark mode setting
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);


  const handleSend = async () => {
  if (!input.trim() || loading) return;

  const userMessage = input.trim().toLowerCase();
  setMessages(prev => [...prev, { from: "user", text: input.trim() }]);
  setInput("");
  setLoading(true);

  try {
    // Static responses based on input
    let botReply = "";

    if (userMessage === "hello") {
      botReply = "Hi, how are you?";
    } else if (userMessage.includes("what is this website about")) {
      botReply = "This website is about Instalingo — a platform that offers summarization, sentiment analysis, translation, chatbot, and text-to-image features.";
    } else if (userMessage === "thank you" || userMessage === "thankyou" || userMessage ==="thanks") {
      botReply = "You're welcome.";
    } else if (userMessage.includes("what services do you provide")) {
      botReply = "we provide a variety of services like text summarization, sentiment analysis, grammar check, language translator and many more.";
    } else {
      // For any other input, call backend
      const response = await axios.post("http://localhost:4000/api/v1/chatbot", {
        text: userMessage,
      });
      botReply = response.data.reply || "Sorry, I didn't get that.";
    }

    setMessages(prev => [...prev, { from: "bot", text: botReply }]);
  } catch (error) {
    console.error("Error talking to chatbot:", error);
    setMessages(prev => [
      ...prev,
      { from: "bot", text: "Oops! Server error. Please try again later." },
    ]);
  } finally {
    setLoading(false);
  }
};

  const handleSuggestion = (text) => {
    setInput(text);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-blue-800"} min-h-screen transition-colors duration-300`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Chat with AI Instantly</h1>
        <p className="text-lg md:text-xl mb-6">Get instant answers, support, or creative help from your smart assistant.</p>
        <button
          className="px-6 py-2 bg-white text-blue-800 font-semibold rounded-full hover:bg-blue-100 transition"
          onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Start Chatting
        </button>
      </section>

      {/* Chat Section */}
      <section id="chat-section" className="min-h-screen p-6 md:p-10 mt-[75px] grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50">
        {/* Left Panel */}
        <div className={`md:col-span-2 flex flex-col shadow-md rounded-2xl p-6 ${darkMode ? "bg-gray-800" : "bg-white"} transition`}>
          {/* Control Bar */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              Dark Mode
            </label>
          </div>

          {/* Chat Box */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-6 p-2 max-h-[60vh] scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`max-w-[80%] px-4 py-3 rounded-2xl break-words ${
                  msg.from === "user"
                    ? "bg-gradient-to-r from-blue-500 to-blue-400 self-end ml-auto text-right text-white"
                    : "bg-gray-100 text-left text-black"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-blue-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white rounded-lg shadow-md disabled:opacity-50"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className={`space-y-6 shadow-md rounded-2xl p-6 h-fit ${darkMode ? "bg-gray-800" : "bg-white"} transition`}>
          <h2 className="text-lg md:text-xl font-semibold mb-4">Smart Suggestions</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "How this website works",
              "What features do we provide",
              "What plans do we offer"
            ].map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSuggestion(suggestion)}
                className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section */}
      <section className="py-12 bg-white px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Why Use Chatbot?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "24/7 Instant Help", icon: "⚡" },
            { title: "Ask Anything Freely", icon: "💬" },
            { title: "Creative Writing Support", icon: "✍️" }
          ].map((item, i) => (
            <div key={i} className="bg-blue-50 rounded-2xl shadow hover:shadow-lg p-6 flex flex-col items-center transition">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white text-center p-4 mt-10">
        &copy; 2025 InstaLingo – All rights reserved
      </footer>
    </div>
  );
}



// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// export default function ChatbotPage() {
//   const [messages, setMessages] = useState([
//     { from: "bot", text: "Hi there! How can I help you today?" }
//   ]);
//   const [input, setInput] = useState("");
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const savedMode = localStorage.getItem("darkMode");
//     if (savedMode) setDarkMode(savedMode === "true");
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("darkMode", darkMode.toString());
//   }, [darkMode]);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = input;
//     setMessages(prev => [...prev, { from: "user", text: userMessage }]);
//     setInput("");

//     try {
//       const response = await axios.post("http://localhost:3000/chatbot", {
//         text: userMessage,
//       });

//       const botReply = response.data.reply || "Sorry, I didn't get that.";
//       setMessages(prev => [...prev, { from: "bot", text: botReply }]);
//     } catch (error) {
//       console.error("Error talking to chatbot:", error);
//       setMessages(prev => [
//         ...prev,
//         { from: "bot", text: "Oops! Server error. Please try again later." },
//       ]);
//     }
//   };

//   const handleSuggestion = (text) => {
//     setInput(text);
//   };

//   return (
//     <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-blue-800"} min-h-screen transition-colors duration-300`}>
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 text-center px-6">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">Chat with AI Instantly</h1>
//         <p className="text-lg md:text-xl mb-6">Get instant answers, support, or creative help from your smart assistant.</p>
//         <button
//           className="px-6 py-2 bg-white text-blue-800 font-semibold rounded-full hover:bg-blue-100 transition"
//           onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
//         >
//           Start Chatting
//         </button>
//       </section>

//       {/* Chat Section */}
//       <section id="chat-section" className="min-h-screen p-6 md:p-10 mt-[75px] grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50">
//         {/* Left Panel */}
//         <div className={`md:col-span-2 flex flex-col shadow-md rounded-2xl p-6 ${darkMode ? "bg-gray-800" : "bg-white"} transition`}>
//           {/* Control Bar */}
//           <div className="flex items-center justify-between mb-4">
//             <label className="flex items-center gap-2 text-sm">
//               <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
//               Dark Mode
//             </label>
//           </div>

//           {/* Chat Box */}
//           <div className="flex-1 overflow-y-auto space-y-4 mb-6 p-2 max-h-[60vh] scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
//             {messages.map((msg, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className={`max-w-[80%] px-4 py-3 rounded-2xl break-words ${
//                   msg.from === "user"
//                     ? "bg-gradient-to-r from-blue-500 to-blue-400 self-end ml-auto text-right text-white"
//                     : "bg-gray-100 text-left text-black"
//                 }`}
//               >
//                 {msg.text}
//               </motion.div>
//             ))}
//           </div>

//           {/* Input Box */}
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="Type your message..."
//               className="flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-blue-400"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button
//               onClick={handleSend}
//               className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white rounded-lg shadow-md"
//             >
//               Send
//             </button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className={`space-y-6 shadow-md rounded-2xl p-6 h-fit ${darkMode ? "bg-gray-800" : "bg-white"} transition`}>
//           <h2 className="text-lg md:text-xl font-semibold mb-4">Smart Suggestions</h2>
//           <div className="flex flex-wrap gap-3">
//             {[
//               "How this website works",
//               "What features do we provide",
//               "What plans do we offer"
//             ].map((suggestion, i) => (
//               <button
//                 key={i}
//                 onClick={() => handleSuggestion(suggestion)}
//                 className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm transition"
//               >
//                 {suggestion}
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Extra Section */}
//       <section className="py-12 bg-white px-6 text-center">
//         <h2 className="text-2xl md:text-3xl font-bold mb-8">Why Use Chatbot?</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {[
//             { title: "24/7 Instant Help", icon: "⚡" },
//             { title: "Ask Anything Freely", icon: "💬" },
//             { title: "Creative Writing Support", icon: "✍️" }
//           ].map((item, i) => (
//             <div key={i} className="bg-blue-50 rounded-2xl shadow hover:shadow-lg p-6 flex flex-col items-center transition">
//               <div className="text-4xl mb-4">{item.icon}</div>
//               <h3 className="font-semibold text-lg">{item.title}</h3>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-blue-800 text-white text-center p-4 mt-10">
//         &copy; 2025 InstaLingo – All rights reserved
//       </footer>
//     </div>
//   );
// }



