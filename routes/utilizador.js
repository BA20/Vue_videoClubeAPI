const express = require('express');
const router = express.Router();
const utilizadorController = require('../controllers/utilizadorController');

router.post('/register', utilizadorController.register);
router.post('/login', utilizadorController.login);

router.post('/search', utilizadorController.search);
router.get('/', utilizadorController.getAll);
router.get('/:id', utilizadorController.getOne);
router.delete('/remove', utilizadorController.remove);
router.put('/update', utilizadorController.update);

module.exports = router
