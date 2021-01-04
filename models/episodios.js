module.exports = (sequelize, DataTypes) => {
  const Episodios = sequelize.define('Episodios', {
    idEpisodio: {
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
    link: {
      type: DataTypes.STRING(150)
    },
    imagem: {
      type: DataTypes.STRING(200)
    },
    linkTrailer: {
      type: DataTypes.STRING(150)
    },
    ano: {
      type: DataTypes.INTEGER(5)
    },
    diretor: {
      type: DataTypes.STRING(50)
    },
    nrEpisodio: {
      type: DataTypes.INTEGER
    },
    nrTemporada: {
      type: DataTypes.INTEGER
    },
    dataPostagem: {
      type: DataTypes.DATE
    }
  },{
    timestamps: false
  });

  Episodios.associate = models => {
    Episodios.belongsToMany(models.Utilizadores, { through: 'Visto', timestamps: false });
  }

  return Episodios
}
