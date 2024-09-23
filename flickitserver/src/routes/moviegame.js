const express = require("express");
const router = express.Router()
const gameController=require ('../controllers/game')
const auth=require ('../middleware/auth.js')
 
router.post('/game',auth,async(req,res)=>{
    let payload ={
        movieEmojis:req.body.movieEmojis,
        actualMovieName:req.body.actualMovieName,
         createdById:req.user._id, 
    }
    const result =await gameController.createMovie(payload)
    if(result.value) {
        return res.send(result.value)
    }
    res.status(result.statusCode).send({
        message: result.message
    })
})
router.get('/game/:id', auth, async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await gameController.getMovieById(movieId); 

        if (!movie) {
            
            return res.status(404).send({ message: "Movie not found" });
        }
        res.send(movie);
    } catch (error) {
        res.status(500).send({ message: "Error fetching movie", error });
    }
});
router.put('/movie/:id', auth, async (req, res) => {
    const gameId = req.params.id;
    const updates = {
        movieEmojis: req.body.movieEmojis,
        actualMovieName: req.body.actualMovieName,
    };

    try {
        const updatedGame = await gameController.updateMovie(gameId, updates); 

        if (!updatedGame) {
            return res.status(404).send({ message: "Game not found" });
        }
        res.send(updatedGame);
    } catch (error) {
        res.status(500).send({ message: "Error updating game", error });
    }
});
router.delete('/game/:id', auth, async (req, res) => {
    const gameId = req.params.id;

    try {
        const result = await gameController.deleteMovie(gameId); 
        if (!result) {
            return res.status(404).send({ message: "Game not found" });
        }
        res.send({ message: "Game deleted successfully" });
    } catch (error) {
        console.log("error",error);
        res.status(500).send({ message: "Error deleting game", error });
    }
});
router.get('/games', auth, async (req, res) => {
    try {
        const games = await gameController.getAllMoviees(); 
        res.send(games);
    } catch (error) {
        res.status(500).send({ message: "Error fetching games", error });
    }
});
router.get('/game/name/:movieName', auth, async (req, res) => {
    try {
        const movieName = req.params.movieName;
        const result = await gameController.getMovieByName(movieName);
        if (result.value) {
            return res.status(result.statusCode).send(result.value);
        }
        res.status(result.statusCode).send({ message: result.message });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
module.exports = router 

