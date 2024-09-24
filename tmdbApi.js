const axios = require("axios");

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiToken = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGNhYjAxOTkyYThiM2ZlOWU3MGE3Y2I4MzcxNTU3NiIsIm5iZiI6MTcyNTcxMjQ4NC45OTgwNTMsInN1YiI6IjY2ZDlkNTFmYjllOWEzODFlOTZkMDlkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uMnqTkdsj9-tuzPhKWIOJp1TviqUWt71rbn3dZ8drbU";

// Helper for making API requests
const makeApiRequest = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${apiBaseUrl}${endpoint}`, {
      headers: {
        accept: "application/json",
        Authorization: apiToken,
      },
      params: { language: "en-US", ...params },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching from TMDb API:", error.message);
    throw new Error("API request failed");
  }
};

// TMDb API functions
const getTopRatedMovies = () => makeApiRequest("/movie/top_rated", { page: 1 });
const getPopularMovies = () => makeApiRequest("/discover/movie", { sort_by: "popularity.desc", page: 1 });
const getMovieDetails = (id) => makeApiRequest(`/movie/${id}`);
const getMovieCredits = (id) => makeApiRequest(`/movie/${id}/credits`);
const searchMovies = (query) => makeApiRequest("/search/movie", { query });
const getSimilarMovies = (id) => makeApiRequest(`/movie/${id}/similar`);
const getMoviesByGenre = (genreId) => makeApiRequest("/discover/movie", { with_genres: genreId, sort_by: "popularity.desc", page: 1 });

module.exports = {
  getTopRatedMovies,
  getPopularMovies,
  getMovieDetails,
  getMovieCredits,
  searchMovies,
  getSimilarMovies,
  getMoviesByGenre,
};
