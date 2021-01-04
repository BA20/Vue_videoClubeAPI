const express = require('express');
const router = express.Router();
const videosController = require('../controllers/videosController');

router.get('/', videosController.getAll);
router.get('/search/:id', videosController.getAllType);
router.get('/getOne/:id', videosController.getOne);
router.post('/search', videosController.search);
router.post('/add', videosController.add);
router.delete('/remove', videosController.remove);
router.put('/update', videosController.update);

module.exports = router
