const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
});