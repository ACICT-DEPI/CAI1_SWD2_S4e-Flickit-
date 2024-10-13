const express = require("express");
const router = express.Router()
const flagController=require ('../controllers/flagGame.js')
const auth=require ('../middleware/auth.js')
 
router.post('/flag', async (req, res) => { 
    console.log("Request body:", req.body);  // Log the incoming request body for debugging

    try {
        // Use a mock user ID for testing purposes if createdById is not provided
        let createdById = req.body.createdById || 'mockUserId'; 

        let payload = {
            flagEmojis: req.body.flagEmojis,         // Ensure these properties match your model
            actualCountryName: req.body.actualCountryName,
            createdById: createdById,
        };

        console.log("Payload to create flag game:", payload); // Log the payload to check values

        // Call the createFlag method from the flagController
        const result = await flagController.createFlag(payload);
        
        if (result.value) {
            return res.status(201).send(result.value); // Send back created flag game with a 201 status
        }

        // Return an error response if result doesn't have a value
        res.status(result.statusCode).send({
            message: result.message,
        });
    } catch (error) {
        console.error("Error in /flag route:", error); // Log the error for debugging
        res.status(500).send({ 
            message: "Internal Server Error", 
            error: error.message // Optionally include the error message
        });
    }
});
router.get('/flag/:id', async (req, res) => {
    try {
        const flagId = req.params.id;
        const flag = await flagController.getFlagById(flagId); 

        if (!flag) {
            
            return res.status(404).send({ message: "flag not found" });
        }
        res.send(flag);
    } catch (error) {
        res.status(500).send({ message: "Error fetching flag", error });
    }
});
router.put('/flag/:id', async (req, res) => {
    const flagId = req.params.id;
    const updates = {
        flagEmojis: req.body.flagEmojis,
        actualCountryName: req.body.actualCountryName,
    };

    try {
        const updatedflag = await flagController.updateFlag(flagId, updates); 

        if (!updatedflag) {
            return res.status(404).send({ message: "flag not found" });
        }
        res.send(updatedflag);
    } catch (error) {
        res.status(500).send({ message: "Error updating flag", error });
    }
});
router.delete('/flag/:id', async (req, res) => {
    const flagId = req.params.id;

    try {
        const result = await flagController.deleteflag(flagId); 
        if (!result) {
            return res.status(404).send({ message: "flag not found" });
        }
        res.send({ message: "flag deleted successfully" });
    } catch (error) {
        console.log("error",error);
        res.status(500).send({ message: "Error deleting flag", error });
    }
});
router.get('/flags',  async (req, res) => {
    try {
        const flags = await flagController.getAllCountries(); 
        res.send(flags);
    } catch (error) {
        res.status(500).send({ message: "Error fetching flags", error });
    }
});
router.get('/flag/name/:flagName', async (req, res) => {
    try {
        const actualCountryName = req.params.actualCountryName;
        const result = await flagController.getFlagByName(actualCountryName);
        if (result.value) {
            return res.status(result.statusCode).send(result.value);
        }
        res.status(result.statusCode).send({ message: result.message });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
module.exports = router 

