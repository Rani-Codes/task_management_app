//Storing all SQL queries for our database here
const getTasks = "SELECT * FROM tasks";
const getTaskById = "SELECT * FROM tasks WHERE id = $1";


module.exports = {
    getTasks,
    getTaskById,
};