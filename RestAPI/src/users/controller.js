//Where we will store the business logic that is related to each route
const pool = require('../../db');
const queries = require('../users/queries')

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
};

const addUser = (req, res) => {
    const { username, email } = req.body;
    //Checking for unique, valid email
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.send("Email already exists.");
        }
        //If email doesn't exist then add user to db
        pool.query(queries.addUser, [username, email], (error, results) => {
            if(error) throw error;
            res.status(201).send("User created successfully");
        })
    })
}

const removeUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getUserById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound){
            res.send("User doesn't exist in the database");
        }

        pool.query(queries.removeUser, [id], (error, results) => {
            if(error) throw error;
            res.status(200).send("User removed successfully.");
        })
    })
}

//NOTE: I had a hard time figuring out a way to update username or email while leaving the option to have
// both be available to update as well. My solution was to check for the inputted values and update
// the query according. This left me relying on the query in this controller file so you will find 
// it moved to the method below.
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { username, email } = req.body;

    // Check to see if user exists
    pool.query(queries.getUserById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if (noUserFound) {
            res.status(404).send("User doesn't exist in the database");
        }

        // Construct the parameters based on provided values
        const updateParams = [];
        let updateQuery = 'UPDATE users SET';

        if (username !== undefined) {
            updateQuery += ' username = $1';
            updateParams.push(username);
        }

        if (email !== undefined) {
            if (updateParams.length > 0) {
                updateQuery += ',';
            }
            updateQuery += ' email = $' + (updateParams.length + 1);
            updateParams.push(email);
        }

        updateQuery += ' WHERE id = $' + (updateParams.length + 1);
        updateParams.push(id);

        pool.query(updateQuery, updateParams, (error, results) => {
            if (error) {
                console.error('Error updating user:', error);
                res.status(500).send("Error updating user");
            } else {
                res.status(200).send("User updated successfully");
            }
        });
    });
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    removeUser,
    updateUser,
};