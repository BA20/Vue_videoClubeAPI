const { Generos } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = {
  add (req, res) {
    Generos.findOrCreate({ where: {nome: req.body.nome}, defaults: req.body}).then(([generos, created]) => {
      console.log(created);
      if(created) {
        res.send({ msg: "Registado com sucesso", status: created});  
      }else{
        res.send({ msg: "Esse género já existe", status: created});  
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Esse género já existe", status: false });
      }
      res.send({ msg: "Esse género já existe", status: false, error: err });
    }) 
  },
  remove (req, res) {
    Generos.findByPk(req.body.idGenero)
    .then(generos => {
      if(!generos){
        res.send({ msg: "Género não encontrado", status: false });
      }else{
        generos.destroy({ force: true });
      }
    })
    .then(() => {
      res.send({ msg: "Género apagado com sucesso", status: true });
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Nenhum género encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  },
  search (req, res) {
    Generos.findAll({ where: { nome: { [Op.substring]:req.body.nome } } }).then(generos =>{
      if(!generos.length) {
        res.send({ msg: "Não foi encontrado nenhum género com esse nome", status: false });
      }else{
        res.send({ genero: generos, status: true });
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Nenhum género encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  },
  update (req, res) {
    Generos.findByPk(req.body.idGenero).then(generos => {
      if(!generos){
        res.send({msg: "Género não encontrado", status: false});
      }else{
        generos.update({ nome: req.body.nome }).then(generosUp => {
          res.send({ msg: "Género editado com sucesso", status: true });
        })
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Nenhum género encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  },
  getAll (req, res) {
    Generos.findAll().then(generos => {
      if(!generos.length){
        res.send({msg: "Géneros não encontrados", status: false});
      }else{
        res.send({ genero: generos, status: true });
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Nenhum género encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  },
  getOne (req, res) {
    Generos.findByPk(req.params.id).then(genero => {
      if(!genero){
        res.send({msg: "Género não encontrado", status: false});
      }else{
        res.send({ genero: genero, status: true });
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Nenhum género encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  }
}
