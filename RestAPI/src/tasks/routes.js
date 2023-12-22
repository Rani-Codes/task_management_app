//Where we'll store our tasks and user routes for the db

const { Router } = require('express');
const controller = require('./controller')

const router = Router();

router.get('/', controller.getUsers);

module.exports = router;
