// profile.js

// Function to fetch user profile data from the server
async function fetchUserProfile(username) {
    try {
        const response = await fetch(`/profile/${username}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error(error);
    }
}

// Function to display user profile information on the page
function displayUserProfile(user) {
    // Get HTML elements
    const usernameElement = document.getElementById('username');
    const emailElement = document.getElementById('email');

    // Update HTML elements with user data
    usernameElement.textContent = user.username;
    emailElement.textContent = user.email;
}

// Function to handle errors
function handleError(error) {
    console.error(error);
    // Display error message on the page
}

// Main function to fetch user profile data and display it
async function loadUserProfile() {
    try {
        // Get username from query parameter or local storage
        const username = localStorage.getItem('username');
        if (!username) {
            throw new Error('Username not found');
        }

        // Fetch user profile data
        const user = await fetchUserProfile(username);

        // Display user profile on the page
        displayUserProfile(user);
    } catch (error) {
        handleError(error);
    }
}

// Call the main function to load user profile when the page loads
window.onload = loadUserProfile;
