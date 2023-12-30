//Storing all SQL queries for our database here
const getTasks = "SELECT * FROM tasks";
const getTaskById = "SELECT * FROM tasks WHERE id = $1";
const createTask = "INSERT INTO tasks (title, description, due_date, task_priority, completed, labels) VALUES ($1, $2, $3, $4, $5, $6)";


module.exports = {
    getTasks,
    getTaskById,
    createTask,
};