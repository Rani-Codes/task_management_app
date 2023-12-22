// Importing dependencies
const Pool = require("pg").Pool;


const pool = new Pool({
    host: "localhost",
    user: "rani",
    port: 5432,
    database: "task_management"
})

module.exports = pool;

