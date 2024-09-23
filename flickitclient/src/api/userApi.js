import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const createUser = async userData => {
    try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
    } catch (error) {
    console.log(`Error Creating User : ${error}`);
    throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
    } catch (error) {
    console.log(`Error Logging In: ${error}`);
    throw error;
    }
};

export const updatePassword = async ({ currentPassword, newPassword }) => {
    try {
    const response = await axios.put(`${API_URL}/update-password`, { currentPassword, newPassword });
    return response.data;
    } catch (error) {
    console.log(`Error Updating Password: ${error}`);
    throw error;
    }
};