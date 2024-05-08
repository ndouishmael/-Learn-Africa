// settings.js

// Function to update user settings on the server
async function updateSettings(username, newData) {
    try {
        const response = await fetch(`/settings/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });
        if (!response.ok) {
            throw new Error('Failed to update settings');
        }
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error(error);
    }
}

// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    // Update user settings
    const newData = { email, password }; // Include other fields as needed
    try {
        const message = await updateSettings(username, newData);
        alert(message);
    } catch (error) {
        console.error(error);
        alert('Failed to update settings. Please try again later.');
    }
}

// Main function to set up event listeners
function initializeSettingsPage() {
    // Get the settings form element
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        // Add event listener for form submission
        settingsForm.addEventListener('submit', handleSubmit);
    } else {
        console.error('Settings form not found');
    }
}

// Call the main function to initialize the settings page
initializeSettingsPage();
