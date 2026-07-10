import axios from 'axios';

// Create an Axios instance with the base URL for the backend API
const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth', // Base URL for the backend API
    withCredentials: true, // Include credentials (cookies) in requests
})


// Function to register a new user
export async function registerUser({ username, email, password }){
    try {
        // Make a POST request to the backend API to register the user
        const response = await api.post("/register", { username, email, password });

        return response.data; // Return the response data from the backend
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export async function loginUser({ email, password }) {
    try {
        // Make a POST request to the backend API to log in the user
        const response = await api.post("/login", { email, password });
        return response.data; // Return the response data from the backend
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

export async function logoutUser() {
    try {
        // Make a POST request to the backend API to log out the user
        const response = await api.post("/logout", {});
        return response.data;
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
}

export async function getCurrentUser() {
    try {
        // Make a GET request to the backend API to get the current logged-in user
        const response = await api.get("/get-me");
        return response.data; // Return the response data from the backend
    } catch (error) {
        console.error("Error fetching current user:", error);
        throw error;
    }
}