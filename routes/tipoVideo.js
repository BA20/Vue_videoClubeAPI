const express = require('express');
const router = express.Router();
const tipoVideoController = require('../controllers/tipoVideoController');

router.get('/', tipoVideoController.getAll);
router.get('/search', tipoVideoController.search);
router.post('/add', tipoVideoController.add);
router.put('/update', tipoVideoController.update);
router.delete('/remove', tipoVideoController.remove);

module.exports = router
