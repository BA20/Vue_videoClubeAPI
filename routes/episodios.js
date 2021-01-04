const express = require('express');
const router = express.Router();
const episodiosController = require('../controllers/episodiosController');

router.get('/', episodiosController.getAll)
router.post('/add/:idVideo', episodiosController.add);
router.get('/search/:id', episodiosController.getOne);
router.delete('/remove', episodiosController.remove);
router.put('/update', episodiosController.update);

module.exports = router
