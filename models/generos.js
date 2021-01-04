module.exports = (sequelize, DataTypes) => {
  const Generos = sequelize.define('Generos', {
    idGenero: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(50),
      unique: true
    }
  },{
    timestamps: false
  });

  Generos.associate = models => {
    Generos.belongsToMany(models.Videos, { through: 'videosHasGeneros', timestamps: false });
  }

  return Generos
}
 