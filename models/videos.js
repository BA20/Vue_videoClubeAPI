module.exports = (sequelize, DataTypes) => {
  const Videos = sequelize.define('Videos', {
    idVideo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(50)
    },
    idImdb: {
      type: DataTypes.STRING(10), 
      unique: true
    },
    classImdb: {
      type: DataTypes.INTEGER(5)
    },
    sinopse: {
      type: DataTypes.TEXT
    },
    imagem: {
      type: DataTypes.STRING(200)
    },
    linkTrailer: {
      type: DataTypes.STRING(100)
    },
    ano: {
      type: DataTypes.INTEGER(5)
    },
    diretor: {
      type: DataTypes.STRING(50)
    },
    visualizacoes: {
      type: DataTypes.INTEGER 
    },
    destaques: {
      type: DataTypes.BOOLEAN
    }
  },{
    timestamps: false
  });

  Videos.associate = models => {
    Videos.belongsTo(models.TipoVideos);
    Videos.belongsToMany(models.Generos, { through: 'videosHasGeneros', timestamps: false });
    Videos.belongsToMany(models.Artistas, { through: 'videosHasArtistas', timestamps: false });
    Videos.belongsToMany(models.Episodios, { through: 'videosHasEpisodios', timestamps: false });
    Videos.belongsToMany(models.Utilizadores, { through: 'Favoritos', timestamps: false });
    Videos.belongsToMany(models.Utilizadores, { through: 'Seguir', timestamps: false });
  }

  return Videos
}
