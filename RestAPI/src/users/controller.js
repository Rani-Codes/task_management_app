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

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { username } = req.body;

    //Check to see if user exists
    pool.query(queries.getUserById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound){
            res.send("User doesn't exist in the database");
        }

        pool.query(queries.updateUser, [username, id], (error, results) => {
            if(error) throw error;
            res.status(200).send("User updated successfully");
        })
    })
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    removeUser,
    updateUser,
};