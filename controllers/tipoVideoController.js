const { TipoVideos } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  add (req, res) {
    TipoVideos.findOrCreate({ where: {nome: req.body.nome}, defaults: req.body}).then(([tipoVideos, created]) => {
      console.log(created);
      if(created) {
        res.send({ msg: "Registado com sucesso", status: created});  
      }else{
        res.send({ msg: "Esse tipo de video já existe", status: created});  
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Esse tipo de video já existe", status: false });
      }
      res.send({ msg: "Esse tipo de video já existe", status: false, error: err });
    })
  },
  remove (req, res) {
    TipoVideos.findByPk(req.body.idTipoVideos)
    .then(tipoVideos => {
      if(!tipoVideos){
        res.send({ msg: "Tipo de video não encontrado", status: false });
      }else{
        tipoVideos.destroy({ force: true });
      }
    })
    .then(() => {
      res.send({ msg: "Tipo de video apagado com sucesso", status: true });
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Tipo de video não encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  },
  search (req, res) {
    var nome = req.body.nome;
    var episodio = req.body.episodio;
    console.log(nome);
    console.log(episodio);

    if(!nome) {
      nome = "";
    }

    if(!episodio) {
      episodio = "";
    }

    TipoVideos.findAll({ where: { [Op.and]: [{ nome: { [Op.substring]: nome } }, { episodio: { [Op.substring]: episodio } }  ] } }).then(tipoVideo =>{
      if(!tipoVideo.length) {
        res.send({ msg: "Não foi encontrado nenhum tipo de video com esse nome", status: false });
      }else{
        res.send({ TipoVideos: tipoVideo, status: true });
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Tipo de video não encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  },
  update (req, res) {
    TipoVideos.findByPk(req.body.idTipoVideos).then(tipoVideo => {
      if(!tipoVideo){
        res.send({msg: "Tipo de video não encontrado", status: false});
      }else{
        tipoVideo.update({ nome: req.body.nome, episodio: req.body.episodio }).then(tipoVideoUp => {
          res.send({ tipoVideo: tipoVideoUp, status: true });
        })
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Tipo de video não encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  },
  getAll (req, res) {
    TipoVideos.findAll().then(tipoVideos => {
      res.send({TipoVideos: tipoVideos, status: true});
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Nenhum tipo de video encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  }
} 
