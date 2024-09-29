const error = require('../Utils/errorMessage');
const Flag = require('../models/FlagGame');

async function createFlag({ flagEmojis, actualCountryName, createdById }) {
    if (!createdById) {
        return error.generateErrorMessage(401, "Not Authorized");
    }

    if (!flagEmojis || !actualCountryName) {
        return error.generateErrorMessage(400, "Flag Emojis and Actual Country Name are required.");
    }

    try {
        const existingFlag = await Flag.findOne({ actualCountryName }) || await Flag.findOne({ flagEmojis });

        if (existingFlag) {
            return error.generateErrorMessage(409, "This flag already exists in the database."); 
        }

        const flag = await Flag.create({
            flagEmojis,
            actualCountryName,
            createdById
        });

        return {
            value: flag,
            statusCode: 201 
        };

    } catch (err) {
        console.error("Error creating flag:", err);
        return error.generateErrorMessage(500, "Failed to create the flag. Please try again.");
    }
}

async function getFlagByName(name) {
    if (!name) {
        return error.generateErrorMessage(400, "Country name is required.");
    }
    
    const flags = await Flag.find({ actualCountryName: { $regex: name, $options: 'i' } });
    return flags;
}

async function getFlagById(flagId) {
    if (!flagId) {
        return error.generateErrorMessage(400, "Flag ID is required");
    }

    const flag = await Flag.findById(flagId);
    if (!flag) {
        return error.generateErrorMessage(404, "Flag not found.");
    }
    return { flag };
}

async function deleteFlag(flagId) {
    if (!flagId) {
        return error.generateErrorMessage(400, "Flag ID is required.");
    }

    const result = await Flag.findByIdAndDelete(flagId);
    if (!result) {
        return error.generateErrorMessage(404, "Flag not found.");
    }
    return result; 
}

async function updateFlag(flagId, updates) {
    if (!flagId) {
        return error.generateErrorMessage(400, "Flag ID is required.");
    }
    if (!updates || Object.keys(updates).length === 0) {
        return error.generateErrorMessage(400, "No update data provided.");
    }
    try {
        const updatedFlag = await Flag.findByIdAndUpdate(flagId, updates, { new: true });
        if (!updatedFlag) {
            return error.generateErrorMessage(404, "Flag not found.");
        }
        return updatedFlag;
    } catch (err) {
        console.error("Error updating flag:", err);
        return error.generateErrorMessage(500, "Failed to update the flag. Please try again.");
    }
}

async function getAllCountries() {
    try {
        const flags = await Flag.find(); 
        return flags;
    } catch (err) {
        console.error("Error fetching flags:", err);
        return error.generateErrorMessage(500, "Failed to retrieve flags. Please try again.");
    }
}

module.exports = {
    createFlag,
    deleteFlag,
    getFlagByName,
    getFlagById,
    getAllCountries,
    updateFlag
};
