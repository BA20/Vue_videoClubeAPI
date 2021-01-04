const express = require('express');
const router = express.Router();
const generosController = require('../controllers/generosController');

router.get('/', generosController.getAll)
router.post('/search', generosController.search);
router.post('/search/:id', generosController.getOne);
router.post('/add', generosController.add);
router.put('/update', generosController.update);
router.delete('/remove', generosController.remove);

module.exports = router
 