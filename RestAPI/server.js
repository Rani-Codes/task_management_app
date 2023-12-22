// Import dependencies
const express = require("express");
const dbRoutes = require('./src/tasks/routes');

// Create an express app
const app = express();
const port = 3000;

//Helps us get and use json from our endpoints
app.use(express.json());

//Routing 
app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api/v1/tasks", dbRoutes);

// Start our server
app.listen(port, () => console.log(`app listening on port ${port}`));