const express = require("express");
const router = express.Router();
const foodRoom = require('../models/FoodGameRooms'); 
router.post('/foodroom', async(req,res)=>{
  const { Level, win, username,score } = req.body;
  try {
    console.log(username,Level,win,score);
    const CorrectAnswers=Level;
    const Score=score;
    const Status=(win)? "Win":"Lose";
    const foodroom= await foodRoom.create({username,Status,CorrectAnswers,Score});
    res.status(201).json({ message: 'Room saved' });
    return {value: foodroom, statusCode: 201};
  } catch (error) {
    console.error('Room not saved',error);
  }
});
router.get('/foodrooms', async(req,res)=>{
  try {
   const foRooms = await foodRoom.find();
   res.send(foRooms);
  } catch (error) {
    console.error('Rooms not found');
  }
});
module.exports = router;