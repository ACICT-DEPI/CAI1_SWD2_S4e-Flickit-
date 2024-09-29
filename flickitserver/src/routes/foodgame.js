const express = require("express");
const router = express.Router()
const foodController=require ('../controllers/foodGame.js')
const auth=require ('../middleware/auth.js')
 
router.post('/food', async (req, res) => {
    console.log("Request body:", req.body);  // Log the incoming request body for debugging

    try {
        // Use a mock user ID for testing purposes if createdById is not provided
        let createdById = req.body.createdById || 'mockUserId'; 

        let payload = {
            foodEmojis: req.body.foodEmojis,        // Assuming these properties are relevant for the food game
            actualFoodName: req.body.actualFoodName, // Assuming this is the correct property name
            createdById: createdById,
        };

        console.log("Payload to create food game:", payload); // Log the payload to check values

        // Call the createFood method from the foodController
        const result = await foodController.createFood(payload);
        
        if (result.value) {
            return res.status(201).send(result.value); // Send back created food game with a 201 status
        }

        // Return an error response if result doesn't have a value
        res.status(result.statusCode).send({
            message: result.message,
        });
    } catch (error) {
        console.error("Error in /food-game route:", error); // Log the error for debugging
        res.status(500).send({ 
            message: "Internal Server Error", 
            error: error.message // Optionally include the error message
        });
    }
});

router.get('/food/:id',  async (req, res) => {
    try {
        const foodId = req.params.id;
        const food = await foodController.getFoodById(foodId); 

        if (!food) {
            
            return res.status(404).send({ message: "food not found" });
        }
        res.send(food);
    } catch (error) {
        res.status(500).send({ message: "Error fetching food", error });
    }
});
router.put('/food/:id',  async (req, res) => {
    const foodId = req.params.id;
    const updates = {
        foodEmojis: req.body.foodEmojis,
        actualFoodName: req.body.actualFoodName,
    };

    try {
        const updatedfood = await foodController.updateFood(foodId, updates); 

        if (!updatedfood) {
            return res.status(404).send({ message: "food not found" });
        }
        res.send(updatedfood);
    } catch (error) {
        res.status(500).send({ message: "Error updating food", error });
    }
});
router.delete('/food/:id', async (req, res) => {
    const foodId = req.params.id;

    try {
        const result = await foodController.deleteFood(foodId); 
        if (!result) {
            return res.status(404).send({ message: "food not found" });
        }
        res.send({ message: "food deleted successfully" });
    } catch (error) {
        console.log("error",error);
        res.status(500).send({ message: "Error deleting food", error });
    }
});
router.get('/foods', async (req, res) => {
    try {
        const foods = await foodController.getAllfood(); 
        res.send(foods);
    } catch (error) {
        res.status(500).send({ message: "Error fetching foods", error });
    }
});

router.get('/food/name/:foodName',  async (req, res) => {
    try {
        const foodName = req.params.foodName;
        const result = await foodController.getFoodByName(foodName);
        if (result.value) {
            return res.status(result.statusCode).send(result.value);
        }
        res.status(result.statusCode).send({ message: result.message });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
module.exports = router 

