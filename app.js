const express = require("express");
const math = require("mathjs");
const axios = require("axios");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Review = require("./models/review");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

mongoose.connect("mongodb://localhost:27017/kinoflow");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Database connected");
});

// for login page
app.get("/", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGNhYjAxOTkyYThiM2ZlOWU3MGE3Y2I4MzcxNTU3NiIsIm5iZiI6MTcyNTcxMjQ4NC45OTgwNTMsInN1YiI6IjY2ZDlkNTFmYjllOWEzODFlOTZkMDlkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uMnqTkdsj9-tuzPhKWIOJp1TviqUWt71rbn3dZ8drbU",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      movies = response.data.results;
      res.render("login", movies);
    })
    .catch(function (error) {
      console.error(error);
    });
});

// for home page
app.get("/home", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/top_rated",
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGNhYjAxOTkyYThiM2ZlOWU3MGE3Y2I4MzcxNTU3NiIsIm5iZiI6MTcyNTcxMjQ4NC45OTgwNTMsInN1YiI6IjY2ZDlkNTFmYjllOWEzODFlOTZkMDlkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uMnqTkdsj9-tuzPhKWIOJp1TviqUWt71rbn3dZ8drbU",
    },
  };

  const options2 = {
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie",
    params: {
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      page: "1",
      sort_by: "popularity.desc",
    },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGNhYjAxOTkyYThiM2ZlOWU3MGE3Y2I4MzcxNTU3NiIsIm5iZiI6MTcyNTcxMjQ4NC45OTgwNTMsInN1YiI6IjY2ZDlkNTFmYjllOWEzODFlOTZkMDlkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uMnqTkdsj9-tuzPhKWIOJp1TviqUWt71rbn3dZ8drbU",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      trenmovies = response.data.results;
      axios
        .request(options2)
        .then(function (response) {
          popmovies = response.data.results;
          res.render("home", popmovies);
        })
        .catch(function (error) {
          console.error(error);
        });
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/id/:id", (req, res) => {
  const { id } = req.params;
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGNhYjAxOTkyYThiM2ZlOWU3MGE3Y2I4MzcxNTU3NiIsIm5iZiI6MTcyNTcxMjQ4NC45OTgwNTMsInN1YiI6IjY2ZDlkNTFmYjllOWEzODFlOTZkMDlkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uMnqTkdsj9-tuzPhKWIOJp1TviqUWt71rbn3dZ8drbU",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      movie = response.data;
      res.render("details", movie);
    })
    .catch(function (error) {
      console.error(error);
    });
});

// for search page
app.post("/search", async (req, res) => {
  const userInput = req.body.name;
  console.log("Received name:", userInput);
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${userInput}`,
      {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGNhYjAxOTkyYThiM2ZlOWU3MGE3Y2I4MzcxNTU3NiIsIm5iZiI6MTcyNTcxMjQ4NC45OTgwNTMsInN1YiI6IjY2ZDlkNTFmYjllOWEzODFlOTZkMDlkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uMnqTkdsj9-tuzPhKWIOJp1TviqUWt71rbn3dZ8drbU",
        },
      }
    );
    const movies = response.data.results;

    res.render("search", { movies, userInput });
  } catch (error) {
    console.error(error);
    res.render("result", {
      result: "Error fetching data from API. Please try again.",
    });
  }
  // You can now use the `name` value for further processing
  // Redirect back to the home page
});

app.get("/random", (req, res) => {
  let flag = 0;
  while (flag === 0) {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        page: Math.floor(Math.random() * 500),
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGNhYjAxOTkyYThiM2ZlOWU3MGE3Y2I4MzcxNTU3NiIsIm5iZiI6MTcyNTcxMjQ4NC45OTgwNTMsInN1YiI6IjY2ZDlkNTFmYjllOWEzODFlOTZkMDlkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uMnqTkdsj9-tuzPhKWIOJp1TviqUWt71rbn3dZ8drbU",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        movie = response.data.results[0];
        res.render("details", movie);
        if (response.data.success === true) {
          flag = 1;
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
