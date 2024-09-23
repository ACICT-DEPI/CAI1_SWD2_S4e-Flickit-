const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
  movieEmojis: {
    type: String, 
    required: true,
  },
  actualMovieName: {
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

movieSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
