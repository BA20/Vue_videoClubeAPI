const express = require('express');
const router = express.Router();
const comentariosController = require('../controllers/comentariosController');

router.get('/', comentariosController.getAll)

module.exports = router
