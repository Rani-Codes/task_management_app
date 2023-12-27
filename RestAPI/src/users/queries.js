//Storing all SQL queries for our database here
const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const addUser = "INSERT INTO users (username, email) VALUES ($1, $2)";
const removeUser = "DELETE FROM users WHERE id = $1";
const updateUser = 'UPDATE users SET username = $1 WHERE id = $2';

module.exports = {
    getUsers,
    getUserById,
    checkEmailExists,
    addUser,
    removeUser,
    updateUser,
};