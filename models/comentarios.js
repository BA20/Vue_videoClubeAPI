module.exports = (sequelize, DataTypes) => {
  const Comentarios = sequelize.define('Comentarios', {
    idComentarios: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    texto: {
      type: DataTypes.TEXT
    },
    data: {
      type: DataTypes.DATE
    }
  },{
    timestamps: false
  });

  Comentarios.associate = models => {
    Comentarios.belongsTo(models.Utilizadores);
    Comentarios.belongsTo(models.Episodios);
  }

  return Comentarios
}
 