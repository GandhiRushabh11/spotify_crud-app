const express = require("express");
const app = require("./app"); // Import your existing Express app
const serverless = require("serverless-http");

module.exports = serverless(app);
