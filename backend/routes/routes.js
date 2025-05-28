const express = require("express");
const router = express.Router();

const {analyzeSentiment, summarizeText, translateText, chatbotResponse, textToImage} = require("../controllers/services");
const { login, signup } = require("../controllers/auth");


router.post("/sentiment", analyzeSentiment)
router.post("/summarize", summarizeText);
router.post("/translate", translateText);
router.post("/chatbot", chatbotResponse);
router.post("/generate-image", textToImage);
router.post("/signup", signup);
router.post("/login", login);


module.exports = router;