const axios = require('../config/instance');
require('dotenv').config();

const api = process.env.PYTHON_API_URL;

// Sentiment Analysis
exports.analyzeSentiment = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post(`${api}/api/v1/sentiment`, { text });
    res.json(response.data);
  } catch (error) {
    console.error("Sentiment Error:", error.message);
    res.status(500).json({ error: "Error analyzing sentiment" });
  }
};

// Summarization
exports.summarizeText = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post(`${api}/api/v1/summarize`, { text });
    res.json(response.data);
  } catch (error) {
    console.error("Summarization Error:", error.message);
    res.status(500).json({ error: "Error summarizing text" });
  }
};

// Translation (English to French)
exports.translateText = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post(`${api}/api/v1/translate`, { text });
    res.json(response.data);
  } catch (error) {
    console.error("Translation Error:", error.message);
    res.status(500).json({ error: "Error translating text" });
  }
};

// Chatbot Response
exports.chatbotResponse = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post(`${api}/api/v1/chatbot`, { text });
    res.json(response.data);
  } catch (error) {
    console.error("Chatbot Error:", error.message);
    res.status(500).json({ error: "Error getting chatbot response" });
  }
};

//text to image
exports.textToImage = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post(`${api}/api/v1/generate-image`, { text });
    res.json(response.data);
  } catch (error) {
    console.error("Image Generation Error:", error.message);
    res.status(500).json({ error: "Error generating image" });
  }
};


