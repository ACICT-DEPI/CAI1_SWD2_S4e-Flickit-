const error = require('../Utils/errorMessage');
const Movie = require('../models/Moviegame');

async function createMovie({ movieEmojis, actualMovieName, createdById }) {
    if (!createdById) {
        return error.generateErrorMessage(401, "Not Authorized");
    }
    
    if (!movieEmojis || !actualMovieName) {
        return error.generateErrorMessage(400, "Movie Emojis and Actual Movie Name are required.");
    }

    try {
        const existingMovie = await Movie.findOne({ actualMovieName }) || await Movie.findOne({ movieEmojis });

        if (existingMovie) {
            return error.generateErrorMessage(409, "This movie already exists in the database."); 
        }

        const game = await Movie.create({
            movieEmojis,
            actualMovieName,
            createdById
        });

        return {
            value: game,
            statusCode: 201 
        };
    } catch (err) {
        // More detailed error logging
        if (err.name === 'ValidationError') {
            console.error("Validation Error:", err); // Log validation errors for debugging
            return error.generateErrorMessage(400, "Validation Error: " + err.message);
        }
        
        console.error("Error creating game:", err); // Log the error for debugging
        return error.generateErrorMessage(500, "Failed to create the game. Please try again.");
    }
}



async function getMovieByName(name) {
    if (!name) {
        return error.generateErrorMessage(400,"Movie name is required.");
    }
    
    const movies = await Movie.find({ actualMovieName: { $regex: name, $options: 'i' } });
    return movies;
}
async function getMovieById(MovieId) {
    console.log("i am here");
    if (!MovieId) {
        console.log("i am here","1",MovieId);

        return error.generateErrorMessage(400,"Movie ID is required")
    }
    const movie = await Movie.findById(MovieId);
    if (!movie) {
       return error.generateErrorMessage(404,"Movie not found.");
    }
    return movie;
}
async function deleteMovie(movieId) {

    if (!movieId) {
        return error.generateErrorMessage(400,"Movie ID is required.");
    }
    const result = await Movie.findByIdAndDelete(movieId);
    if (!result) {
        return error.generateErrorMessage(404,"Movie not found.");
    }
    return result; 
}
async function updateMovie(gameId, updates) {
    if (!gameId) {
        return error.generateErrorMessage(400, "Game ID is required.");
    }
    if (!updates || Object.keys(updates).length === 0) {
        return error.generateErrorMessage(400, "No update data provided.");
    }
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(gameId, updates, { new: true });
        if (!updatedMovie) {
            return error.generateErrorMessage(404, "Game not found.");
        }
        return updatedMovie;
    } catch (err) {
        console.error("Error updating game:", err);
        return error.generateErrorMessage(500, "Failed to update the game. Please try again.");
    }
}

async function getAllMoviees() {
    try {
        const games = await Movie.find(); 
        return games;
    } catch (err) {
        console.error("Error fetching games:", err);
        return error.generateErrorMessage(500,"Failed to retrieve games. Please try again.");
    }
}
async function getMovieByName(movieName) {
    if (!movieName) {
        return error.generateErrorMessage(400,"Movie name is required.");
    }

    const result = await Movie.findOne({ actualMovieName: movieName });
    
    if (!result) {
        return error.generateErrorMessage(404, "Movie not found." );
    }

    return { statusCode: 200, value: result };
}

module.exports = {
    createMovie,deleteMovie,getMovieById,updateMovie,getAllMoviees,getMovieByName
};
