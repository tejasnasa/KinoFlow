const express = require("express");
const axios = require("axios");
const path = require("path");
const bodyParser = require("body-parser");
const { getTopRatedMovies, getPopularMovies, getMovieDetails, getMovieCredits, searchMovies, getRandomMovie, getSimilarMovies, getMoviesByGenre } = require('./tmdbApi');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Local data
const names = require("./seeds/names");
const reviews = require("./seeds/reviewset");

// Set static assets and view engine
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Utility: Render error view
const renderError = (res, message = "Error fetching data from API. Please try again.") => {
  console.log(message);
};

// Home Page Route
app.get("/", async (req, res) => {
  try {
    const [trenMovies, popMovies] = await Promise.all([getTopRatedMovies(), getPopularMovies()]);
    res.render("home", { trenMovies, popMovies });
  } catch (error) {
    console.error(error);
    renderError(res);
  }
});

// Movie Details Route
app.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await getMovieDetails(id);
    const movieCredits = await getMovieCredits(id);
    const director = movieCredits.crew.find(({ job }) => job === "Director")?.name || "Unknown";
    res.render("details", { movie, movieCredits, director, names, reviews });
  } catch (error) {
    console.error(error);
    renderError(res);
  }
});

// Search Movies Route
app.post("/search", async (req, res) => {
  const userInput = req.body.name;
  try {
    const movies = await searchMovies(userInput);
    const length = Math.min(movies.results.length, 18);
    res.render("search", { movies, userInput, length });
  } catch (error) {
    console.error(error);
    renderError(res);
  }
});

// Random Movie Route
app.get("/random", async (req, res) => {
  try {
    const movie = await getRandomMovie();
    res.render("details", movie);
  } catch (error) {
    console.error(error);
    renderError(res);
  }
});

// Movie Recommendations Route
app.post("/recommend/:id", async (req, res) => {
  const { id } = req.params;
  const movie = req.body.name1;
  try {
    const movies = await getSimilarMovies(id);
    res.render("search", { movies, movie });
  } catch (error) {
    console.error(error);
    renderError(res);
  }
});

// Genre Browsing Route
app.get("/genre/:gen", async (req, res) => {
  const genreMap = {
    action: "28",
    animation: "16",
    comedy: "35",
    crime: "80",
    drama: "18",
    romance: "10749",
    scifi: "878",
    mystery: "9648"
  };

  const genreId = genreMap[req.params.gen];
  if (!genreId) return renderError(res, "Invalid genre");

  try {
    const movies = await getMoviesByGenre(genreId);
    const length = Math.min(movies.results.length, 18);
    res.render("search", { movies, userInput: req.params.gen, length });
  } catch (error) {
    console.error(error);
    renderError(res);
  }
});

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
});
