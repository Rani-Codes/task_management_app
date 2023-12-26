//Storing all SQL queries for our database here
const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";

module.exports = {
    getUsers,
    getUserById,
};