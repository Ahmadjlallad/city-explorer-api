"use strict";
require("dotenv").config();
const express = require("express");
const server = express();
const PORT = process.env.PORT || 3100;
const cors = require("cors"); //import cors
const getForecast = require("./Weather");
const getMovies = require("./Movies");

server.use(cors());
// * getMovies and getForecast are functions that handle promises and send back data to the client
server.get("/movies", (req, res) => {
  getMovies(req.query, res);
});

server.get("/weather.json", (req, res) => {
  getForecast(req.query, res);
});

server.get("*", (req, res) => {
  console.log("hi servers");
  res.status(404).send("try /movies or /weather.json");
});

server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
