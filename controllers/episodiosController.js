const { Videos, Episodios } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function getDate(){
  var currentdate = new Date();      
  var date = currentdate.getFullYear()+'-'+(currentdate.getMonth()+1)+'-'+currentdate.getDate();     
  var time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();      
  return date+' '+time;           
}

module.exports = {
  add (req, res) {
    req.body.dataPostagem = getDate();
    Episodios.findOrCreate({ where: {idImdb: req.body.idImdb}, defaults: req.body}).then(([episodios, created]) => {
      console.log(created);
      if(created) { 
        var idVideo = req.params.idVideo;

          Videos.findByPk(idVideo).then(video => {
            video.addEpisodios(episodios).then(() => {
            })
          })

        res.send({ msg: "Registado com sucesso", status: created}); 
      }else{
        res.send({ msg: "Esse episódio já existe", status: created});
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Esse episódio já existe", status: false });
      }
      res.send({ msg: "Esse episódio já existe", status: false, error: err });
    })
  },
  remove (req, res) {
    Episodios.findByPk(req.body.idEpisodio).then(episodios => {
      if(!episodios){
        res.send({ msg: "Episódio não encontrado", status: false });
      }else{
        episodios.destroy({ force: true });
      }
    })
    .then(() => {
      res.send({ message: "Episódio apagado com sucesso", status: true });
    }).catch(err => {
      res.send({ error: err, msg: "Algum erro ocorreu", status: false });
    })
  },
  update (req, res) {
    Episodios.findByPk(req.body.idEpisodio).then(episodios => {
        episodios.update({ titulo: req.body.titulo, idImdb: req.body.idImdb, classImdb: req.body.classImdb, sinopse: req.body.sinopse, link: req.body.link,
           idImdb: req.body.idImdb, imagem: req.body.imagem, linkTrailer: req.body.linkTrailer, ano: req.body.ano, diretor: req.body.diretor, nrEpisodio: req.body.nrEpisodio,
           nrTemporada: req.body.nrTemporada }).then(episodioUp => {
          res.send({ Episodios: episodioUp, status: true });
        })
    })    
  },
  getAll (req, res) {
    Episodios.findAll().then(episodios => {
      if(episodios) {
        res.send({ episodio: episodios, status: true });
      }else{
        res.send({ msg: "Não existe resultados com essa pesquisa", status: false });
      }
    }).catch(err => {
      res.send( { msg: err, status: false } );
    });
  },
  getOne (req, res) {
    Videos.findByPk(req.params.idEpisodio).then(episodios => {
      if(episodios) {
        res.send({ episodio: episodios, status: true });
      }else{
        res.send({ msg: "Não existe resultados com essa pesquisa", status: false });
      }
    }).catch(err => {
      res.send( { msg: err, status: false } );
    });
  }
}
