document.getElementById('user-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('location').value;

    // Create a user object
    const newUser = {
        name: name,
        email: email,
        location: location,
    };

    // Retrieve existing users from local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        // Show notification for existing user
        showNotification('User already exists!', true);
    } else {
        // Add new user to the list
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Show notification for successful addition
        showNotification('User added successfully!');

        // Redirect to AddRequest page
        setTimeout(() => {
            window.location.href = 'AddRequest.html';
        }, 2000); // Redirect after 2 seconds
    }
});

// Function to show notification
function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
    notification.style.color = isError ? 'red' : 'green';

    // Automatically hide the notification after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}
getLocationBtn.addEventListener('click', function () {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                locationInput.value = `Lat: ${latitude}, Lng: ${longitude}`; // Set the location in the input field

                showNotification("Location fetched successfully!", "success");
            },
            (error) => {
                let errorMessage = "Unable to fetch location. Please try again.";
                if (error.code === 1) {
                    errorMessage = "Permission denied. Please allow location access.";
                } else if (error.code === 2) {
                    errorMessage = "Location unavailable.";
                } else if (error.code === 3) {
                    errorMessage = "Request timed out. Try again.";
                }
                showNotification(errorMessage, "error");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    } else {
        showNotification("Geolocation is not supported by your device.", "error");
    }
});
// Handle form submission
userForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form reload

    // Collect data from the form
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        location: document.getElementById('location').value,
    };

    try {
        // Check if the user already exists
        const checkResponse = await fetch(`https://localhost:7117/api/users?email=${encodeURIComponent(formData.email)}`, {
            method: "GET",
        });

        if (checkResponse.ok) {
            const existingUser = await checkResponse.json();

            if (existingUser) {
                // Show error notification if user already exists
                showNotification("User already exists!", "error");
            } else {
                // If user does not exist, proceed to add the user
                const response = await fetch("https://localhost:7117/api/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData), // Convert form data to JSON
                });

                if (response.ok) {
                    showNotification("User added successfully!", "success");
                    alert("You have been added successfully!");
                    window.location.href = "AddRequest.html";
                } else {
                    showNotification("Error adding user. Please try again.", "error");
                }
            }
        } else {
            showNotification("Error checking user existence. Please try again.", "error");
        }
    } catch (error) {
        console.error("Error:", error);
        showNotification("Error submitting the form. Please check your network.", "error");
    }
});
});