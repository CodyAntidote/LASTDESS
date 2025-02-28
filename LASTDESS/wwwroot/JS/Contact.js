document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    // Fetch and display contacts
    fetch("https://localhost:7117/api/Contact")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((contact) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${contact.id}</td>
                    <td>${contact.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.message}</td>
                `;
                contactList.appendChild(row);
            });
        })
        .catch((error) => console.error("Error fetching contact:", error));

    // Submit the form
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission (prevents page reload)

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Data to send to the API
        fetch("https://localhost:7117/api/Contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
        })
            .then((response) => {
                if (response.ok) {
                    messageBox.textContent = "Contact added successfully.";
                    messageBox.classList.remove("hidden");
                    messageBox.classList.add("success");
                    // Reload contacts list
                    setTimeout(() => window.location.reload(), 1000);
                    setTimeout(() => {
                        window.location.href = "index.html"; // Change to your home page
                    }, 2000); // Redirect after 2 seconds
                } else {
                    messageBox.textContent = "Failed to add contact.";
                    messageBox.classList.remove("hidden");
                    messageBox.classList.add("error");
                }
            })
            .catch((error) => console.error("Error adding contact:", error))
    });
});
