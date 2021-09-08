"use strict";
// * 2 helper functions
// * creat the class for the Movies and Forecast

const weatherHelperFunction = (data, Forecast) => {
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

const getFilms = (movies, Movies) => {
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
module.exports = { getFilms, weatherHelperFunction };
