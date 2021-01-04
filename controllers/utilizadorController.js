const { Utilizadores } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, "worldflix", {
    expiresIn: ONE_WEEK
  });
}

function getDate(){
  var currentdate = new Date();      
  var date = currentdate.getFullYear()+'-'+(currentdate.getMonth()+1)+'-'+currentdate.getDate();     
  var time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();      
  return date+' '+time;           
}

module.exports = {
  register (req, res) {
    req.body.dataRegisto = getDate();
    // eslint-disable-next-line handle-callback-err
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          res.send({ msg: "Serviço indisponivel, tente mais tarde", status: false });
        }
        req.body.password = hash;

          Utilizadores.findOrCreate({where: {username: req.body.username,email: req.body.email}, defaults: req.body}).then(([Utilizadores, created]) => {
            console.log(created);
            if(created) {
              res.send({ msg: "Registado com sucesso", status: created});  
            }else{
              res.send({ msg: "Username ou e-mail já existe", status: created});  
            }
          }).catch(err => {
            if(!err){
              res.send({ msg: "Username ou e-mail já existe", status: false });
            }
            res.send({ msg: "Username ou e-mail já existe", status: false, error: err });
          })
      })
    )
  },
  login (req, res) {
    const { username, password } = req.body;
    Utilizadores.findOne({ where: { username } }).then(utilizadores => {
      if (!utilizadores) {
        return res.send({ msg: "Utilizador não existe", status: false });
      }
      bcrypt.compare(password, utilizadores.password, (err, isMatch) => {
        if (err) {
          res.send({ msg: "Serviço indisponivel, tente mais tarde", status: false, error: err });
        }
        if (isMatch) {
          console.log(username);
          console.log(getDate());
          utilizadores.update({ dataUltimoAcesso: getDate(), estado: true }).then(utilizadoresUp => {
            res.send({ utilizadores: utilizadoresUp.toJSON(), token: jwtSignUser(utilizadoresUp.toJSON()), msg: "Utilizador encontrado", status: true });
          })
          .catch(err => {
            res.send({ msg: "Serviço indisponivel, tente mais tarde", status: false, error: err });
          })
        } else {
          res.send({ msg: "Password incorreta", status: false });
        }
      })
    })
  },
  search (req, res){
    var nome = req.body.nome;
    var estado = req.body.status;

    if(!nome){
      nome = "";
    }
    if(!estado){
      estado = "";
    }

    Utilizadores.findAll({ where: { [Op.or]: [{ username: { [Op.substring]: nome } }, { nome: { [Op.substring]: nome } }  ] } }).then(utilizadores =>{
      if(!utilizadores.length){
        res.send({ msg: "Utilizadores não encontrados", status: true});
      }else{
        res.send({ utilizadores: utilizadores, msg: "Utilizadores encontrados", status: true});
      }
    }).catch(err => {
      if(!err){s
        res.send({msg: "Parametros incorretos", status: false});
      }else{
        res.send({msg: "Serviço indisponivel, tente mais tarde", status: false, error: err});
      }
    })
  },
  getAll (req, res) {
    Utilizadores.findAll().then(utilizadores => {
      if(!utilizadores.length){
        res.send({msg: "Utilizador não encontrado", status: false});
      }else{
        res.send({ utilizadores: utilizadores, status: true });
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Nenhum utilizador encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  },
  getOne (req, res) {
    Utilizadores.findByPk(req.params.id).then(utilizadores => {
      if(!utilizadores){
        res.send({msg: "Utilizador não encontrado", status: false});
      }else{
        res.send({ utilizadores: utilizadores, status: true });
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Nenhum utilizador encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  },
  update (req, res) {
    Utilizadores.findByPk(req.body.idUtilizador).then(utilizador => {
      if(!utilizador){
        res.send({msg: "Utilizador não encontrado", status: false});
      }else{
        utilizador.update({ nivelAcesso: req.body.nivelAcesso }).then(utilizadorUp => {
          res.send({ utilizadores: utilizadorUp, msg: "Utilizador editado com sucesso", status: true });
        })
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Utilizador não encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  },
  remove (req, res) {
    Utilizadores.findByPk(req.body.idUtilizador)
    .then(utilizadores => {
      if(!utilizadores){
        res.send({ msg: "Utilizador não encontrado", status: false });
      }else{
        utilizadores.destroy({ force: true });
      }
    })
    .then(() => {
      res.send({ msg: "Utilizador apagado com sucesso", status: true });
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Nenhum utilizador encontrado", status: false });
      }
      res.send({ msg: "Algum erro ocorreu", status: false, error: err });
    })
  }
}

//CRIAR DELETE USERS
//nome: req.body.nome, username: req.body.username, email: req.body.email, password: req.body.password, imagem: req.body.imagem, 
/*

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              res.send({ msg: "Serviço indisponivel, tente mais tarde", status: false });
            }
            req.body.password = hash;
  */

  //{ estado: { [Op.substring]: estado } }