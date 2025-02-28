const form = document.getElementById("request-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value; // Fetch status value from form (if applicable)

    const newRequest = { title, description, status }; // Prepare the data to be sent

    try {
        // Send the data to the database via the API
        const response = await fetch("Api/requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRequest),
        });

        if (response.ok) {
            // Show success message
            alert("Help request added successfully!");

            // Redirect the user to helprequest.html
            window.location.href = "HelpRequest.html";
        } else {
            // Handle API error
            const errorText = await response.text();
            console.error("Error adding help request:", errorText);
            alert("Failed to add help request. Please try again.");
        }
    } catch (error) {
        // Handle network or other errors
        console.error("Network error:", error);
        alert("An error occurred while submitting the request. Please try again later.");
    }
});

// Optional: Automatically populate the helprequest.html list after adding
async function fetchHelpRequestsAndDisplay() {
    try {
        const response = await fetch("api/helprequests");
        const helpRequests = await response.json();

        const requestsList = document.getElementById("requests-list");
        if (requestsList) {
            requestsList.innerHTML = ""; // Clear existing list

            helpRequests.forEach((request) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${request.id}</td>
                    <td>${request.title}</td>
                    <td>${request.description}</td>
                    <td>${request.status}</td>
                `;
                requestsList.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Error fetching and displaying help requests:", error);
    }
}

// Ensure helprequest.html dynamically updates on load
if (window.location.pathname.includes("HelpRequest.html")) {
    fetchHelpRequestsAndDisplay();
}
