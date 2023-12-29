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
    })}


module.exports = {
    getTasks,
    getTaskById,
}