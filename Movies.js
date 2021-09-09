"use strict";
const { default: axios } = require("axios");
const { getFilms } = require("./Helpers");
// * Movies class and server fetch function + send response to client

let myMemory = {};
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
    this.image_url = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${image_url}`;
    this.popularity = popularity;
    this.released_on = released_on;
  }
}

function getMovies(query, ApiResponse) {
  const { key, name, page } = query;

  if (myMemory[name] !== undefined) ApiResponse.send(myMemory[name]);
  else {
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
        ApiResponse.send(getFilms(response.data.results, Movies));
        myMemory[name] = getFilms(response.data.results, Movies);
      })
      .catch((err) => {
        ApiResponse.send(err.message);
      });
  }
}
module.exports = getMovies;
