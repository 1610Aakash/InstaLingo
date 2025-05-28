const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/routes");
const dbConnect = require("./config/database");
require("dotenv").config();

const port = process.env.PORT || 4000;

// Connect to database
dbConnect();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // allow requests from React app
  credentials: true // if you use cookies or auth headers
}));
app.use(express.json());

// Mounting routes
app.use("/api/v1", routes);

// Start server
app.listen(port, () => {
  console.log(`Server is running at port "${port}"`);
});





