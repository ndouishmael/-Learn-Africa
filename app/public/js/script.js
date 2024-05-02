// Wait for the DOM to be fully loaded before executing any JavaScript
document.addEventListener("DOMContentLoaded", function() {
    // Get the welcome button element
    const welcomeButton = document.getElementById("welcome-button");

    // Add a click event listener to the welcome button
    welcomeButton.addEventListener("click", function() {
        // Perform any actions you want when the welcome button is clicked
        alert("Welcome button clicked!");
    });
});
