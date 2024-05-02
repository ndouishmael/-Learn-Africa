class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Method to validate the user's password
    validatePassword(password) {
        return this.password === password;
    }
}

module.exports = User;
