//Where we will store the business logic that is related to each route
const pool = require('../../db');

const getUsers = (req, res) => {
    pool.query("SELECT * FROM users", (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
};

module.exports = {
    getUsers,
};