// Function to fetch courses for a specific category from the server
async function fetchCourses(category) {
    try {
        const response = await fetch(`/courses/${category}`);
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        return data.courses;
    } catch (error) {
        console.error(error);
    }
}

// Function to display courses for a specific category on the page
function displayCourses(courses) {
    // Get HTML element to display courses
    const courseListElement = document.getElementById('course-list');

    // Clear previous courses, if any
    courseListElement.innerHTML = '';

    // Iterate over each course and create HTML elements to display them
    courses.forEach(course => {
        const listItem = document.createElement('li');
        listItem.textContent = course.name;
        courseListElement.appendChild(listItem);
    });
}

// Function to handle errors
function handleError(error) {
    console.error(error);
    // Display error message on the page
}

// Main function to fetch and display courses when the page loads
async function loadCourses() {
    try {
        // Get category from query parameter or local storage
        const category = localStorage.getItem('category');
        if (!category) {
            throw new Error('Category not found');
        }

        // Fetch courses for the specified category
        const courses = await fetchCourses(category);

        // Display courses on the page
        displayCourses(courses);
    } catch (error) {
        handleError(error);
    }
}

// Call the main function to load courses when the page loads
window.onload = loadCourses;
