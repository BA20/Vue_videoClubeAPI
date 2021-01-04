module.exports = (sequelize, DataTypes) => {
  const Utilizadores = sequelize.define('Utilizadores', {
    idUtilizador: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(50)
    },
    username: { 
      type: DataTypes.STRING(50),
      unique: true
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true
    },
    password: {
      type: DataTypes.STRING(100)
    },
    imagem: {
      type: DataTypes.STRING(50)
    },
    nivelAcesso: {
      type: DataTypes.INTEGER(5)
    },
    dataRegisto: {
      type: DataTypes.DATE
    },
    dataUltimoAcesso: {
      type: DataTypes.DATE
    },
    estado: {
      type: DataTypes.BOOLEAN
    }
  },{
    timestamps: false
  });

  Utilizadores.associate = models => {
    Utilizadores.belongsToMany(models.Episodios, { through: 'Visto', timestamps: false });
    Utilizadores.belongsToMany(models.Videos, { through: 'Favoritos', timestamps: false });
    Utilizadores.belongsToMany(models.Videos, { through: 'Seguir', timestamps: false });
  }

  return Utilizadores
}
