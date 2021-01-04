const { Pedidos } = require('../models');




module.exports = {
  getAll (req, res) {
    Pedidos.findAll().then(pedidos => {
      res.send(pedidos);
    });
  }
}
