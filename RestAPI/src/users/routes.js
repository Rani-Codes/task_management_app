//Where we'll store our users routes for the db

const { Router } = require('express');
const controller = require('./controller')

const router = Router();


//We will have all routes for this router prepend with /users
router.get('/', controller.getUsers);

module.exports = router;
