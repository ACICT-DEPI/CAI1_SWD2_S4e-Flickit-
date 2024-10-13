const express = require("express");
const router = express.Router();
const movieRoom = require('../models/MovieGameRooms'); 
router.post('/movieroom', async(req,res)=>{
  const { Level, win, username,score } = req.body;
  try {
    console.log("zehe2t");
    console.log(username,Level,win,score);
    const CorrectAnswers=Level;
    const Score=score;
    const Status=(win)? "Win":"Lose";
    const movieroom= await movieRoom.create({username,Status,CorrectAnswers,Score});
    res.status(201).json({ message: 'Room saved' });
    return {value: movieroom, statusCode: 201};
  } catch (error) {
    console.error('Room not saved',error);
  }
});
router.get('/movierooms', async(req,res)=>{
  try {
   const mRooms = await movieRoom.find();
   res.send(mRooms);
  } catch (error) {
    console.error('Rooms not found');
  }
});
module.exports = router;