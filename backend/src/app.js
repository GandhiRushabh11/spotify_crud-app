//Libarry Import
const express = require("express");
const cors = require("cors");

//Middlewares & routes
const errorHandler = require("./middlewares/errorHandler");
const authRouter = require("./routes/authRoute");
const playlistRouter = require("./routes/playlistRoute");
//Loading Env variables
const dotenv = require("dotenv").config({ path: "./src/config/config.env" });

//For Database connention
const connectToDatabase = require("./config/connectToDatabase");

//Try to Connect With Db
connectToDatabase();

const app = new express();

//Body Parser
app.use(express.json());

//cors
const corsOptions = {
  origin: [process.env.frontEnd_Link],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Router Mounting
app.get("/", (req, res) => {
  res.send("Welcome to Backend API");
});
app.use("/api/v1", authRouter);
app.use("/api/v1/playlist", playlistRouter);
//Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

module.exports = app;
