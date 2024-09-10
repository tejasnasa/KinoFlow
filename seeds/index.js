const mongoose = require('mongoose')
const names = require('./names')
const reviews = require('./reviewset')
const Review = require('../models/review');

mongoose.connect('mongodb://localhost:27017/kinoflow');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Review.deleteMany({});
    for (let i = 0; i < 150; i++){
        const random70 = Math.floor(Math.random() * 70);
        const random25 = Math.floor(Math.random() * 25);
        const rev = new Review({
            author: `${names[random70]}`,
            content: `${reviews[random25].review}`,
            rating: reviews[random25].rating
        })

        await rev.save();
    }
}

seedDB().then(() =>{
    mongoose.connection.close();
});