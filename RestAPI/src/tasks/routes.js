//Where we'll store our tasks routes for the db

const { Router } = require('express');
const controller = require('../tasks/controller')

const router = Router();

//We will have all routes for this router prepend with /api/users
router.get('/', controller.getTasks);
router.get('/:id', controller.getTaskById);
router.post('/', controller.addTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
