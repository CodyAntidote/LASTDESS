document.addEventListener("DOMContentLoaded", () => {
    const volunteerList = document.getElementById("volunteers-list");
    const volunteerForm = document.getElementById("volunteer-form");
    const messageBox = document.getElementById("message");

    // Fetch and display volunteers
    fetch("https://localhost:7117/api/volunteers")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((volunteer) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${volunteer.id}</td>
                    <td>${volunteer.name}</td>
                    <td>${volunteer.contact}</td>
                    <td>${volunteer.availability}</td>
                `;
                volunteerList.appendChild(row);
            });
        })
        .catch((error) => console.error("Error fetching volunteers:", error));

    // Handle volunteer form submission
    volunteerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const contact = document.getElementById("contact").value;
        const availability = document.getElementById("availability").value;

        fetch("https://localhost:7117/api/volunteers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, contact, availability }),
        })
            .then((response) => {
                if (response.ok) {
                    messageBox.textContent = "Volunteer added successfully.";
                    messageBox.classList.remove("hidden");
                    messageBox.classList.add("success");
                    // Reload volunteers list
                    setTimeout(() => window.location.reload(), 1000);
                } else {
                    messageBox.textContent = "Failed to add volunteer.";
                    messageBox.classList.remove("hidden");
                    messageBox.classList.add("error");
                }
            })
            .catch((error) => console.error("Error adding volunteer:", error));
    });
});
