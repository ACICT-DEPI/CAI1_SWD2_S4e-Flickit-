const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodSchema = new Schema({
  foodEmojis: {
    type: String, 
    required: true,
  },
  actualFoodName: {
    type: String, 
    required: true,
  },
createdById: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

foodSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
