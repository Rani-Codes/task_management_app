//Storing all SQL queries for our database here
const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const addUser = "INSERT INTO users (username, email) VALUES ($1, $2)";
const removeUser = "DELETE FROM users WHERE id = $1";
//updateUser variable is in the controller file because i needed it there so i could have it change dynamically
//according to the inputs of the client to determine which attributes of the users table to change

module.exports = {
    getUsers,
    getUserById,
    checkEmailExists,
    addUser,
    removeUser,
};