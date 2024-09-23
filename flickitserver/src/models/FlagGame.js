const mongoose = require('mongoose');
const { Schema } = mongoose;

const flagSchema = new Schema({
  flagEmojis: {
    type: String, 
    required: true,
  },
  actualCountryName: {
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

flagSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Flag = mongoose.model('Flag', flagSchema);

module.exports = Flag;
