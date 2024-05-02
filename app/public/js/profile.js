// Function to fetch user profile data from the backend
async function fetchUserProfile() {
    try {
        const response = await fetch('/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add authorization header with JWT token if needed
                // 'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        return data.userProfile; // Assuming the response contains user profile data
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        // Handle error, e.g., display an error message on the page
    }
}

// Function to display user profile data on the page
function displayUserProfile(userProfile) {
    // Select elements to display user profile data
    const usernameElement = document.getElementById('username');
    const emailElement = document.getElementById('email');

    // Update HTML content with user profile data
    usernameElement.textContent = userProfile.username;
    emailElement.textContent = userProfile.email;
}

// Function to initialize the profile page
async function initProfilePage() {
    try {
        // Fetch user profile data
        const userProfile = await fetchUserProfile();
        // Display user profile data on the page
        displayUserProfile(userProfile);
    } catch (error) {
        console.error('Error initializing profile page:', error.message);
        // Handle error, e.g., display an error message on the page
    }
}

// Call the initProfilePage function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initProfilePage);
