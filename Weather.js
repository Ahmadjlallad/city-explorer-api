"use strict";
const { default: axios } = require("axios");
const { weatherHelperFunction } = require("./Helpers");
// * Forecast class and server fetch function + send response to client

class Forecast {
  constructor(date, high_temp, low_temp, description) {
    this.date = date;
    this.high_temp = high_temp;
    this.low_temp = low_temp;
    this.description = `Low of ${this.low_temp}, high of ${this.high_temp} with ${description}`;
  }
}
let myMemory = {};

function getForecast(query, ApiResponse) {
  const { lat: reqLat, lon: reqLon, city_name: reqCity_name, key } = query;
  if (myMemory[reqCity_name] !== undefined)
    ApiResponse.send(myMemory[reqCity_name]);
  else {
    axios
      .get(`https://api.weatherbit.io/v2.0/forecast/daily?`, {
        params: {
          key,
          lat: reqLat,
          lon: reqLon,
          city: reqCity_name,
        },
      })
      .then((response) => {
        ApiResponse.status(200).send(
          weatherHelperFunction(response.data.data, Forecast)
        );
        myMemory[reqCity_name] = weatherHelperFunction(
          response.data.data,
          Forecast
        );
      })
      .catch((err) => ApiResponse.send(err.message));
  }
}
module.exports = getForecast;
