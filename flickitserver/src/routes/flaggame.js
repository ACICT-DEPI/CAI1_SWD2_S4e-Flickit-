const express = require("express");
const router = express.Router()
const flagController=require ('../controllers/flagGame.js')
const auth=require ('../middleware/auth.js')
 
router.post('/flag',auth,async(req,res)=>{
    let payload ={
        flagEmojis:req.body.flagEmojis,
        actualCountryName:req.body.actualCountryName,
         createdById:req.user._id, 
    }
    const result =await flagController.createFlag(payload)
    if(result.value) {
        return res.send(result.value)
    }
    res.status(result.statusCode).send({
        message: result.message
    })
})
router.get('/flag/:id', auth, async (req, res) => {
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
router.put('/flag/:id', auth, async (req, res) => {
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
router.delete('/flag/:id', auth, async (req, res) => {
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
router.get('/flags', auth, async (req, res) => {
    try {
        const flags = await flagController.getAllCountries(); 
        res.send(flags);
    } catch (error) {
        res.status(500).send({ message: "Error fetching flags", error });
    }
});
router.get('/flag/name/:flagName', auth, async (req, res) => {
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

