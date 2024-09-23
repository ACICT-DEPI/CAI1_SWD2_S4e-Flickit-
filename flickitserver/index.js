
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const moviegameRoute=require('./src/routes/moviegame')
const user=require('./src/routes/user.js')
const port= process.env.PORT
const dbConnection=require ('./src/Utils/dbConnection.js')

dbConnection()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Routers
app.use(moviegameRoute)
app.use(user)

app.listen(port, ()=>{
    console.log("server is running on port " + port)
})
