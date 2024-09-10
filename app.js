const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const names = require('./seeds/names')
const reviews = require('./seeds/reviewset')

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

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
/*fetch(`https://api.themoviedb.org/3/movie/<<movieID>>/credits?api_key=<<your_api_key>>`)
            .then(response => response.json())
            .then((jsonData)=>jsonData.crew.filter(({job})=> job ==='Director'))
            
            https://api.themoviedb.org/3/movie/157336?api_key=f0cab01992a8b3fe9e70a7cb83715576&append_to_response=videos,images

            */
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

  const options2 = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}/credits`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGNhYjAxOTkyYThiM2ZlOWU3MGE3Y2I4MzcxNTU3NiIsIm5iZiI6MTcyNTk3ODUzOC4zMzQ2NTYsInN1YiI6IjY2ZDlkNTFmYjllOWEzODFlOTZkMDlkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jecx62oxOBjA-6_WXZmoSBUaHBaFH1LWfIybi9_q1hw",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      movie = response.data;
      console.log(movie);

      axios
        .request(options2)
        .then(function (response) {
          movie2 = response.data;
          let dirfilt = ({ job }) => job === "Director";
          let director = movie2.crew.filter(dirfilt)[0].name;
          console.log(movie2.cast[0]);
          res.render("details", { movie, movie2, director, names, reviews });
        })
        .catch(function (error) {
          console.error(error);
        });
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
    if (movies.length >= 18) {
      length = 18;
    } else {
      length = movies.length;
    }

    res.render("search", { movies, userInput, length });
  } catch (error) {
    console.error(error);
    res.render("result", {
      result: "Error fetching data from API. Please try again.",
    });
  }
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

app.post("/recommend/:id", async (req, res) => {
  const { id } = req.params;
  const movie = req.body.name1;
  console.log("Received name:", userInput);
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar`,
      {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGNhYjAxOTkyYThiM2ZlOWU3MGE3Y2I4MzcxNTU3NiIsIm5iZiI6MTcyNTcxMjQ4NC45OTgwNTMsInN1YiI6IjY2ZDlkNTFmYjllOWEzODFlOTZkMDlkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uMnqTkdsj9-tuzPhKWIOJp1TviqUWt71rbn3dZ8drbU",
        },
      }
    );
    const movies = response.data.results;

    res.render("search", { movies, movie });
  } catch (error) {
    console.error(error);
    res.render("result", {
      result: "Error fetching data from API. Please try again.",
    });
  }
});

app.get("/genre/:gen", (req, res) => {
  const { gen } = req.params;
  if (gen === "action") {
    x = "28";
  } else if (gen === "animation") {
    x = "16";
  } else if (gen === "comedy") {
    x = "35";
  } else if (gen === "crime") {
    x = "80";
  } else if (gen === "drama") {
    x = "18";
  } else if (gen === "romance") {
    x = "10749";
  } else if (gen === "scifi") {
    x = "878";
  } else if (gen === "mystery") {
    x = "9648";
  }
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie",
    params: {
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      page: "1",
      sort_by: "popularity.desc",
      with_genres: x,
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
      movies = response.data.results;
      userInput = gen;
      if (movies.length >= 18) {
        length = 18;
      } else {
        length = movies.length;
      }
      res.render("search", { movies, userInput, length });
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
