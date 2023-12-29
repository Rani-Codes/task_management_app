// Import dependencies
const express = require("express");
const userRoutes = require('./src/users/routes');
const taskRoutes = require('./src/tasks/routes')

// Create an express app
const app = express();
const port = 3000;

//Helps us get and use json from our endpoints
app.use(express.json());

//Routing for default page, users, and tasks
app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api/users", userRoutes);

app.use("/api/tasks", taskRoutes);

// Start our server
app.listen(port, () => console.log(`app listening on port ${port}`));