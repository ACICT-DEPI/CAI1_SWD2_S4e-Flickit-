//room id => automatic
//username
//highest level reached عدد الاجابات الصح
//level status

const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodGameRooms = new Schema({
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

const FoodRooms = mongoose.model('Food_Game_Rooms', FoodGameRooms);

module.exports = FoodRooms;
