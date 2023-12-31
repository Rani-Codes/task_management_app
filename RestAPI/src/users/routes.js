//Where we'll store our users routes for the db

const { Router } = require('express');
const controller = require('./controller')

const router = Router();


//We will have all routes for this router prepend with /api/users
router.get('/', controller.getUsers);
router.post('/', controller.addUser);
router.get('/:id', controller.getUserById);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.removeUser);

module.exports = router;
