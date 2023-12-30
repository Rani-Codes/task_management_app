//Storing all SQL queries for our database here
const getTasks = "SELECT * FROM tasks";
const getTaskById = "SELECT * FROM tasks WHERE id = $1";
const createTask = "INSERT INTO tasks (title, description, due_date, task_priority, completed, labels) VALUES ($1, $2, $3, $4, $5, $6)";
// const updateTask = "UPDATE tasks SET title = $1 WHERE id = $2";
// Above is an example of a updateTask query that would be here. It has been moved to the
// Controller file in this folder because I need it to be dynamic and having it in that file
// is just easier for me to manipulate what the SQL query outputs.


module.exports = {
    getTasks,
    getTaskById,
    createTask,
};