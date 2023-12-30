//Where we will store the business logic that is related to each route
const pool = require('../../db');
const queries = require('../tasks/queries')

const getTasks = (req, res) => {
    pool.query(queries.getTasks, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
};

const getTaskById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getTaskById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
};

const addTask = (req, res) => {
    const { title, description, due_date, task_priority, completed, labels } = req.body;
    pool.query(queries.createTask, [title, description, due_date, task_priority, completed, labels], (error, results) => {
        if(error) throw error;
        res.status(201).send("Task created successfully!");
    })
};

const updateTask = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, due_date, task_priority, completed, labels } = req.body;

    // Check to see if task exists
    pool.query(queries.getTaskById, [id], (error, results) => {
        const noTaskFound = !results.rows.length;
        if (noTaskFound) {
            res.status(404).send("Task doesn't exist in the database");
        }

        // pool.query(queries.updateTaskTitle, [title, id], (error, results) => {
        //     if(error) throw error;
        //     res.status(200).send('Task updated successfully');
        // })

        // Construct the parameters based on provided values
        const updateParams = [];
        let updateQuery = 'UPDATE tasks SET';

        if (title !== undefined) {
            updateQuery += ' title = $1';
            updateParams.push(title);
        }

        if (description !== undefined) {
            if (updateParams.length > 0) {
                updateQuery += ',';
            }
            updateQuery += ' description = $' + (updateParams.length + 1);
            updateParams.push(description);
        }

        if (due_date !== undefined) {
            if (updateParams.length > 0) {
                updateQuery += ',';
            }
            updateQuery += ' due_date = $' + (updateParams.length + 1);
            updateParams.push(due_date);
        }

        if (task_priority !== undefined) {
            if (updateParams.length > 0) {
                updateQuery += ',';
            }
            updateQuery += ' task_priority = $' + (updateParams.length + 1);
            updateParams.push(task_priority);
        }

        if (completed !== undefined) {
            if (updateParams.length > 0) {
                updateQuery += ',';
            }
            updateQuery += ' completed = $' + (updateParams.length + 1);
            updateParams.push(completed);
        }

        if (labels !== undefined) {
            if (updateParams.length > 0) {
                updateQuery += ',';
            }
            updateQuery += ' labels = $' + (updateParams.length + 1);
            updateParams.push(labels);
        }

        updateQuery += ' WHERE id = $' + (updateParams.length + 1);
        updateParams.push(id);

        pool.query(updateQuery, updateParams, (error, results) => {
            if (error) {
                console.error('Error updating task:', error);
                res.status(500).send("Error updating task");
            } else {
                res.status(200).send("Task updated successfully");
            }
        });
    });
};


module.exports = {
    getTasks,
    getTaskById,
    addTask,
    updateTask,
}