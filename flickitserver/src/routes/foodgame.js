const express = require("express");
const router = express.Router()
const foodController=require ('../controllers/foodGame.js')
const auth=require ('../middleware/auth.js')
 
router.post('/food',auth,async(req,res)=>{
    let payload ={
        foodEmojis:req.body.foodEmojis,
        actualFoodName:req.body.actualFoodName,
         createdById:req.user._id, 
    }
    const result =await foodController.createFood(payload)
    if(result.value) {
        return res.send(result.value)
    }
    res.status(result.statusCode).send({
        message: result.message
    })
})
router.get('/food/:id', auth, async (req, res) => {
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
router.put('/food/:id', auth, async (req, res) => {
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
router.delete('/food/:id', auth, async (req, res) => {
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
router.get('/foods', auth, async (req, res) => {
    try {
        const foods = await foodController.getAllfood(); 
        res.send(foods);
    } catch (error) {
        res.status(500).send({ message: "Error fetching foods", error });
    }
});
router.get('/food/name/:foodName', auth, async (req, res) => {
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

