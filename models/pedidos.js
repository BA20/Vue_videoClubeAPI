module.exports = (sequelize, DataTypes) => {
  const Pedidos = sequelize.define('Pedidos', {
    idPedido: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idImdb: {
      type: DataTypes.STRING(10),
      unique: true
    },
    nrPedidos: {
      type: DataTypes.INTEGER
    }
  },{
    timestamps: false
  });

  Pedidos.associate = models => {
    Pedidos.belongsTo(models.Utilizadores);
  }
  
  return Pedidos
}
