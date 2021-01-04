const { Artistas } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 

module.exports = {
  add (req, res) {
    Artistas.findOrCreate({ where: {idImdb: req.body.idImdb}, defaults: req.body}).then(([artistas, created]) => {
      console.log(created);
      if(created) {
        res.send({ msg: "Registado com sucesso", status: created});  
      }else{
        res.send({ msg: "Esse artista já existe1", status: created});
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Esse artista já existe2", status: false });
      }
      res.send({ msg: "Esse artista já existe3", status: false, error: err });
    })
  },
  remove (req, res) {
    Artistas.findByPk(req.body.idArtista)
    .then(artistas => {
      if(!artistas){
        res.send({ msg: "Artista não encontrado", status: false });
      }else{
        artistas.destroy({ force: true });
      }
    })
    .then(() => {
      res.send({ msg: "Artista apagado com sucesso", status: true });
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Artista não encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  },
  search (req, res) {
    Artistas.findAll({ where: { nome: { [Op.substring]:req.body.nome } } }).then(artistas =>{
      if(!artistas.length) {
        res.send({ msg: "Não foi encontrado nenhum artista com esse nome", status: false });
      }else{
        res.send({ artistas: artistas, status: true });
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Artista não encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  },
  update (req, res) {
    Artistas.findByPk(req.body.idArtista).then(artistas => {
      if(!artistas){
        res.send({msg: "Artistas não encontrado", status: false});
      }else{
        artistas.update({ nome: req.body.nome, idImdb: req.body.idImdb, descricao: req.body.descricao, imagem: req.body.imagem, dataNascimento: req.body.dataNascimento }).then(artistasUp => {
          res.send({ Artistas: artistasUp, msg: "Editado com sucesso", status: true });
        })
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Artista não encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  },
  getAll (req, res) {
    Artistas.findAll().then(artistas => {
      if(!artistas.length){
        res.send({msg: "Artistas não encontrado", status: false});
      }else{
        res.send({ artistas: artistas, status: true });
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Nenhum artista encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  },
  getOne (req, res) {
    Artistas.findByPk(req.params.id).then(artista => {
      if(!artista){
        res.send({msg: "Artista não encontrado", status: false});
      }else{
        res.send({ artista: artista, status: true });
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Nenhum artista encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  }
}
 