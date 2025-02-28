const BASE_URL = "https://localhost:7117/api"; // Update to match your API URL

// Helper function to handle responses and throw errors
async function handleResponse(response) {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }
    try {
        return await response.json(); // Attempt to parse JSON if response is valid
    } catch (error) {
        return response.text(); // Return plain text if JSON parsing fails
    }
}

// Function to send GET requests
export async function getRequest(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        return await handleResponse(response);
    } catch (error) {
        console.error("GET request error:", error);
        throw error;
    }
}

// Function to send POST requests
export async function postRequest(endpoint, data) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Ensure the content type is JSON
            },
            body: JSON.stringify(data), // Convert data to JSON string
        });

        return await handleResponse(response); // Return parsed JSON response
    } catch (error) {
        console.error("POST request error:", error);
        throw error;  // Re-throw error for higher-level handling
    }
}

// Function to send PUT requests
export async function putRequest(endpoint, data) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("PUT request error:", error);
        throw error;
    }
}

// Function to send DELETE requests
export async function deleteRequest(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "DELETE",
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("DELETE request error:", error);
        throw error;
    }
}
