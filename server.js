"use strict";
require("dotenv").config();

const express = require("express");

const server = express();
const PORT = process.env.PORT || 3100;
const cors = require("cors"); //import cors

const weatherDATA = require("./data/weather.json");

server.use(cors());
/*
server.get("./", (req, res) => {
  res.status(200).send(data);
});*/

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

console.log(Forecast.objects);
server.get("/weather", (req, res) => {
  const { lat: reqLat, lon: reqLon, city_name: reqCity_name } = req.query;
  const selectedCity = weatherDATA.find((el) => {
    if (el.lat === reqLat && el.lon === reqLon && el.city_name === reqCity_name)
      return el;
  });
  const classifiedData =
    selectedCity?.data.map((data) => {
      return new Forecast(data.valid_date, data.weather.description);
    }) ?? "No city found";

  res.status(200).send(classifiedData);
});
server.get("*", (req, res) => {
  console.log("hi servers");
  res.status(404).send("Not found");
});
server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
