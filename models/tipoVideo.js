module.exports = (sequelize, DataTypes) => {
  const TipoVideos = sequelize.define('TipoVideos', {
    idTipoVideos: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(50),
      unique: true
    },
    episodio: {
      type: DataTypes.BOOLEAN
    }
  },{
    timestamps: false
  });
 
  return TipoVideos
} 
