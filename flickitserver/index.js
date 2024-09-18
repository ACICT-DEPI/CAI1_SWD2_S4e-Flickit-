require('dotenv').config()
const express = require('express')
const templateroute=require("./src/routes/templateRoute.js")
const app = express()
const port= process.env.PORT


app.use(templateroute)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
