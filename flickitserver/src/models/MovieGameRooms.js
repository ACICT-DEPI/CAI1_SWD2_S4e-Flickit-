//room id => automatic
//username
//highest level reached عدد الاجابات الصح
//level status

const mongoose = require('mongoose');
const { Schema } = mongoose;

const MovieGameRooms = new Schema({
  username: {
    type: String, 
    required: true,
  },
 Status: {
   type: String, 
    required: true,
  }, 
  CorrectAnswers: {
    type: Number, 
    required: true,
  },
  Score: {
    type: Number, 
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

const MovieRooms = mongoose.model('Movie_Game_Rooms', MovieGameRooms);

module.exports = MovieRooms;
