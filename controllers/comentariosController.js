const { Comentarios } = require('../models');


module.exports = {
  getAll (req, res) {
    Comentarios.findAll().then(comentarios => {
      res.send(comentarios);
    });
  }
}
