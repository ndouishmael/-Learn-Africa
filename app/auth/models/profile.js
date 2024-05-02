class Profile {
    constructor(username, email, firstName, lastName, bio, avatarUrl) {
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.bio = bio;
        this.avatarUrl = avatarUrl;
    }

    // Getter methods
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    // Other methods related to profile functionality can be added here
}

// Export the Profile class to make it accessible from other modules
module.exports = Profile;
