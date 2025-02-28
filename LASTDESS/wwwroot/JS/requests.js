document.addEventListener("DOMContentLoaded", () => {
    const requestList = document.getElementById("requests-list");
    const requestForm = document.getElementById("request-form");
    const messageBox = document.getElementById("message");


    fetch("https://localhost:7117/api/requests")
        .then((response) => response.json())
        .then((data) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                    <td>${requests.id}</td>
                    <td>${requests.Title}</td>
                    <td>${requests.Description}</td>
                    <td>${requests.Status}</td>
                `;
            requestList.appendChild(row);
        });
})
    .catch((error) => console.error("Error fetching requests:", error));

// Handle volunteer form submission
requestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("title").value;
    const contact = document.getElementById("description").value;
    const availability = document.getElementById("status").value;

    fetch("https://localhost:7117/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status }),
    })
        .then((response) => {
            if (response.ok) {
                messageBox.textContent = "request added successfully.";
                messageBox.classList.remove("hidden");
                messageBox.classList.add("success");
                // Reload volunteers list
                setTimeout(() => window.location.reload(), 1000);
            } else {
                messageBox.textContent = "Failed to add request.";
                messageBox.classList.remove("hidden");
                messageBox.classList.add("error");
            }
        })
        .catch((error) => console.error("Error adding request:", error));
});
});



















 catch (error) {
        console.error("Error loading help requests:", error);
    }
}

// Delete a help request
async function deleteHelpRequest(id) {
    try {
        await deleteRequest(`helprequests/${id}`); // Send a DELETE request to the API
        loadRequests(); // Refresh the request list after deletion
    } catch (error) {
        console.error(`Error deleting request with ID ${id}:`, error);
    }
}

// Load help requests on page load
loadRequests();
