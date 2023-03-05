const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log(" UNCAUGHT Exception! Shutting down ...");
  process.exit(1);
});

const app = require("./app");

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const { promisify } = require("util");
