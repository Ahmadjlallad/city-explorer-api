"use strict";
require("dotenv").config();
// const axios = require("axios");
const express = require("express");

const server = express();
const PORT = process.env.PORT || 3100;
const cors = require("cors"); //import cors

const { default: axios } = require("axios");

server.use(cors());
/*
server.get("./", (req, res) => {
  res.status(200).send(data);
});*/

class Forecast {
  constructor(date, high_temp, low_temp, description) {
    this.date = date;
    this.high_temp = high_temp;
    this.low_temp = low_temp;
    this.description = `Low of ${this.low_temp}, high of ${this.high_temp} with ${description}`;
  }
}

class Movies {
  constructor(
    title,
    overview,
    average_votes,
    total_votes,
    image_url,
    popularity,
    released_on
  ) {
    this.title = title;
    this.overview = overview;
    this.average_votes = average_votes;
    this.total_votes = total_votes;
    this.image_url = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${image_url}`;
    this.popularity = popularity;
    this.released_on = released_on;
  }
}

const weatherHelperFunction = (data) => {
  return (
    data.map((data) => {
      return new Forecast(
        data.valid_date,
        data.high_temp,
        data.low_temp,
        data.weather.description
      );
    }) ?? new Error("No data")
  );
};

const getFilms = (movies) => {
  console.log(movies);
  return movies.length === 0
    ? { message: "We did not find Your movie", status: 404 }
    : movies.map(
        (movie) =>
          new Movies(
            movie.title,
            movie.overview,
            movie.vote_average,
            movie.vote_count,
            movie.poster_path,
            movie.popularity,
            movie.release_date
          )
      );
};
server.get("/movies", (req, res) => {
  const { key, name, page } = req.query;
  axios
    .get(`https://api.themoviedb.org/3/search/movie?`, {
      params: {
        api_key: key,
        language: `en-US`,
        page,
        include_adult: false,
        query: name,
      },
    })
    .then((response) => {
      console.log(response.data);
      res.send(getFilms(response.data.results));
    })
    .catch((err) => res.send(err.message));
});

server.get("/weather.json", (req, res) => {
  const { lat: reqLat, lon: reqLon, city_name: reqCity_name, key } = req.query;
  const as = axios
    .get(`https://api.weatherbit.io/v2.0/forecast/daily?`, {
      params: {
        key,
        lat: reqLat,
        lon: reqLon,
        city: reqCity_name,
      },
    })
    .then((response) => {
      res.status(200).send(weatherHelperFunction(response.data.data));
      console.log(weatherHelperFunction(response.data.data));
    })
    .catch((err) => res.send(err.message));
  console.log(as);
});
server.get("*", (req, res) => {
  console.log("hi servers");
  res.status(404).send("Not found");
});
server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
