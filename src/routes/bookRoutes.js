const { Router } = require('express');
const controller = require('../controllers/bookController');

const router = Router();

router.route('/')
    .get(controller.getAll)
    .post(controller.create);

router.route('/:id')
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.remove)

module.exports = router;