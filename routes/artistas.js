const express = require('express');
const router = express.Router();
const artistasController = require('../controllers/artistasController');

router.get('/', artistasController.getAll);
router.post('/search', artistasController.search);
router.get('/search/:id', artistasController.getOne);
router.post('/add', artistasController.add);
router.put('/update', artistasController.update);
router.delete('/remove', artistasController.remove);
 
module.exports = router
