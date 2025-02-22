
require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose");
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const moviegameRoute=require('./src/routes/moviegame')
const flaggameRoute=require('./src/routes/flaggame')
const foodgameRoute=require('./src/routes/foodGame')

const MovieRoomsRoute=require('./src/routes/MovieRoomsRoute')
const FlagRoomsRoute=require('./src/routes/FlagsRoomsRoute')
const FoodRoomsRoute=require('./src/routes/FoodRoomsRoute')

const authRoutes = require("./src/routes/authRoutes");
const user=require('./src/routes/authRoutes')
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
// const dbConnection=require ('./src/Utils/dbConnection.js')

// dbConnection()
app.use(express.json())
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: "http://localhost:5173"}));
//app.use(cors());

// Routers
app.use(moviegameRoute)
app.use(flaggameRoute)
app.use(foodgameRoute)

app.use(MovieRoomsRoute)
app.use(FoodRoomsRoute)
app.use(FlagRoomsRoute)

app.use(user)


mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.use(express.json());
app.use("/api", authRoutes)
