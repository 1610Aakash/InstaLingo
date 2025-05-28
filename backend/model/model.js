const mongoose = require("mongoose");


// Define a Schema for text-based operations
const textSchema = new mongoose.Schema({
    text: {
         type: String,
         required: true 
        },
    operation: {
         type: String,
         enum: ["sentiment", "summarize", "translate", "chatbot"],
         required: true },
         createdAt: { type: Date, default: Date.now
        }
});

// Create a model
const TextModel = mongoose.model("Text", textSchema);

module.exports = TextModel;