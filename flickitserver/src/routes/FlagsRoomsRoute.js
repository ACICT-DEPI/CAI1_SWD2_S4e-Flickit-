const express = require("express");
const router = express.Router();
const flagRoom = require('../models/FlagGameRooms'); 
router.post('/Flagroom', async(req,res)=>{
  const { Level, win, username,score } = req.body;
  try {
    console.log(username,Level,win,score);
    const CorrectAnswers=Level;
    const Score=score;
    const Status=(win)? "Win":"Lose";
    const flagroom= await flagRoom.create({username,Status,CorrectAnswers,Score});
    res.status(201).json({ message: 'Room saved' });
    return {value: flagroom, statusCode: 201};
  } catch (error) {
    console.error('Room not saved',error);
  }
});
router.get('/flagrooms', async(req,res)=>{
  try {
   const fRooms = await flagRoom.find();
   res.send(fRooms);
  } catch (error) {
    console.error('Rooms not found');
  }
});
module.exports = router;