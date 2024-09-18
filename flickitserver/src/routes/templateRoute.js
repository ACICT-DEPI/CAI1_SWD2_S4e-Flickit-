const express = require("express");
const router = new express.Router();
const templateServices= require("./../services/templateServices")
router.get('/', (req, res) => {
  templateServices.getPortfolio()
    res.send("Opening Template Owner Portfolio....");
  });


  
module.exports = router