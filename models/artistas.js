module.exports = (sequelize, DataTypes) => {
  const Artistas = sequelize.define('Artistas', {
    idArtista: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(50)
    },
    idImdb: {
      type: DataTypes.STRING(10),
      unique: true
    },
    descricao: {
      type: DataTypes.TEXT
    },
    imagem: { 
      type: DataTypes.STRING(200)
    },
    dataNascimento: {
      type: DataTypes.DATE
    }
  },{
    timestamps: false
  });

  Artistas.associate = models => {
    Artistas.belongsToMany(models.Videos, { through: 'videosHasArtistas', timestamps: false });
  }

  return Artistas
}
