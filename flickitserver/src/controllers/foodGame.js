const error = require('../Utils/errorMessage');
const Food = require('../models/foodGame');

async function createFood({ foodEmojis, actualFoodName,createdById }) {
     if (!createdById) {
        return error.generateErrorMessage(401, "Not Authorized");
    } 

    if (!foodEmojis || !actualFoodName) {
        return error.generateErrorMessage(400, "Food Emojis and Actual Food Name are required.");
    }

    try {
        const existingFood = (await Food.findOne({ actualFoodName })|| await Food.findOne({ foodEmojis }));

        if (existingFood) {
            return error.generateErrorMessage(409, "This food already exists in the database."); 
        }

        const game = await Food.create({
            foodEmojis,
            actualFoodName,
            createdById
        });

        return {
            value: game,
            statusCode: 201 
        };

    } catch (err) {
        console.error("Error creating game:", err);
        return error.generateErrorMessage(500, "Failed to create the game. Please try again.");
    }
}
async function getFoodByName(name) {
    if (!name) {
        return error.generateErrorMessage(400,"Food name is required.");
    }
    
    const food = await Food.find({ actualFoodName: { $regex: name, $options: 'i' } });
    return food;
}
async function getFoodById(FoodId) {
    if (!FoodId) {

        return error.generateErrorMessage(400,"Food ID is required")
    }
    const food = await Food.findById(FoodId);
    if (!food) {
       return error.generateErrorMessage(404,"Food not found.");
    }
    return {food};
}
async function deleteFood(FoodId) {

    if (!FoodId) {
        return error.generateErrorMessage(400,"Food ID is required.");
    }
    const result = await Food.findByIdAndDelete(FoodId);
    if (!result) {
        return error.generateErrorMessage(404,"Food not found.");
    }
    return result; 
}
async function updateFood(gameId, updates) {
    if (!gameId) {
        return error.generateErrorMessage(400,"Game ID is required.");
    }
    if (!updates || Object.keys(updates).length === 0) {
        return error.generateErrorMessage(400,"No update data provided.");
    }
    try {
        const updatedFood = await Food.findByIdAndUpdate(gameId, updates, { new: true });
        if (!updatedFood) {
            return error.generateErrorMessage(404,"Game not found.");
        }
        return updatedFood;
    } catch (err) {
        console.error("Error updating game:", err);
        return error.generateErrorMessage(500,"Failed to update the game. Please try again.");
    }
}
async function getAllfood() {
    try {
        const games = await Food.find(); 
        return games;
    } catch (err) {
        console.error("Error fetching games:", err);
        return error.generateErrorMessage(500,"Failed to retrieve games. Please try again.");
    }
}
async function getFoodByName(foodName) {
    if (!foodName) {
        return error.generateErrorMessage(400,"Food name is required.");
    }

    const result = await Food.findOne({ actualFoodName: foodName });
    
    if (!result) {
        return error.generateErrorMessage(404, "Food not found." );
    }

    return { statusCode: 200, value: result };
}

module.exports = {
    createFood,deleteFood,getAllfood,getFoodById,updateFood,getFoodByName
};
