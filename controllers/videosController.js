const { Videos, Artistas, Generos, TipoVideos } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op; 

module.exports = {
  add (req, res) {
    Videos.findOrCreate({ where: {idImdb: req.body.idImdb}, defaults: req.body}).then(([videos, created]) => {
      console.log(created);
      if(created) {
        var idArtista = req.body.idArtista.split(','); 
        var idGenero = req.body.idGenero.split(',');

        for (let i = 0; i < idArtista.length; i++) {
          
          Artistas.findByPk(idArtista[i]).then(artista => {
            artista.addVideos(videos).then(() => {
            })
          })
        }

        for (let i = 0; i < idGenero.length; i++) {
          
          Generos.findByPk(idGenero[i]).then(generos => {
            generos.addVideos(videos).then(() => {
            })
          })
        }

          res.send({ idVideo: videos.idVideo, msg: "Registado com sucesso", status: created}); 
      }else{
        res.send({ msg: "Esse video já existe", status: created});
      }
    }).catch(err => {
      if(!err) {
        res.send({ msg: "Esse video já existe!", status: false });
      }
      res.send({ msg: "Esse video já existe!! ", status: false, error: err });
    })
  },
  remove (req, res) {
    Videos.findByPk(req.body.idVideo)
    .then(videos => {
      if(!videos){
        res.send({ msg: "Video não encontrado", status: false });
      }else{
        videos.destroy({ force: true });
      }
    })
    .then(() => {
      res.send({ msg: "Video apagado com sucesso", status: true });
    }).catch(err => {
      res.send({ error: err, msg: "Algum erro ocorreu", status: false });
    })
  },
  search (req, res) {
    console.log("1");
    var idTipoVideo = req.body.idTipoVideo;
    var search = req.body.search;
    var genero = req.body.genero;
    var ano = req.body.ano;
    var orderAno = req.body.orderAno; //boolean
    var orderVisto = req.body.orderVisto; //boolean
    var orderInseridos = req.body.orderInseridos; //boolean
    var numberPag = req.body.pag;
    var numberItens = req.body.itens;



    var colName = "idVideo";
    var ordem = "ASC";

    if(!search) {
      search = "";
    }
    if(!genero) {
      genero = "";
    }
    if(!ano) {
      ano = "";
    }
    if(orderAno){
      colName = "ano";
      ordem = "DESC";
    }
    if(orderVisto){
      colName = "visualizacoes";
      ordem = "DESC";
    }
    if(orderInseridos){
      colName = "idVideo";
      ordem = "DESC";
    }
    var numberStart = 0;
    var numberEnd = 0;
    numberStart = (Number(numberPag) - 1) * Number(numberItens);
    numberEnd = Number(numberStart) + Number(numberItens);

    Videos.findAll({ include: [{ model: Artistas }, { model: Generos, where: { nome:  { [Op.substring]: genero } } } ], 
      where: { [Op.and]: [{ titulo: { [Op.substring]: search } }, { ano: { [Op.substring]: ano } }  ] }}).then(videos =>{
      if(!videos.length) {
        res.send({ msg: "Não foi encontrado nenhum video", status: false });
      }else{
        res.send({ videos: videos, status: true });
      }
    })
  },
  update (req, res) {
    Videos.findByPk(req.body.idVideo).then(video => {
      if(!video){
        res.send({msg: "Video não encontrado", status: false});
      }else{
        video.update({ titulo: req.body.titulo, idImdb: req.body.idImdb, classImdb: req.body.classImdb, sinopse: req.body.sinopse, imagem: req.body.imagem, linkTrailer: req.body.linkTrailer, ano: req.body.ano, diretor: req.body.diretor, TipoVideoIdTipoVideos: req.body.TipoVideoIdTipoVideos}).then(videosUp => {
          

          if(req.body.idArtista.toString().indexOf(",") > -1) {
            var idArtista = req.body.idArtista.split(','); 
            Artistas.findAll().then(artista => {
              for (let i = 0; i < artista.length; i++) {
                try {
                  artista[i].removeVideos(videosUp).then(() => {
                  })
                } catch (error) {
                  console.log(error);
                }
              }
            })
            for (let i = 0; i < idArtista.length; i++) {
            
              Artistas.findByPk(idArtista[i]).then(artista => {
                artista.addVideos(videosUp).then(() => {
                })
              })
            }
          }else{
            Artistas.findAll().then(artista => {
              for (let i = 0; i < artista.length; i++) {
                try {
                  artista[i].removeVideos(videosUp).then(() => {
                  })
                } catch (error) {
                  console.log(error);
                }
              }
            })
            Artistas.findByPk(req.body.idArtista).then(artista => {
              artista.addVideos(videosUp).then(() => {
              })
            })
          }

          if(req.body.idGenero.toString().indexOf(",") > -1) {
            var idGenero = req.body.idGenero.split(',');
            
            Generos.findAll().then(generos => {
              for (let i = 0; i < generos.length; i++) {
                try {
                  generos[i].removeVideos(videosUp).then(() => {
                  })
                } catch (error) {
                  console.log(error);
                }
              }
            })
            for (let i = 0; i < idGenero.length; i++) {
            
              Generos.findByPk(idGenero[i]).then(generos => {
                generos.addVideos(videosUp).then(() => {
                })
              })
            }
          }else{
            Generos.findAll().then(generos => {
              for (let i = 0; i < generos.length; i++) {
                try {
                  generos[i].removeVideos(videosUp).then(() => {
                  })
                } catch (error) {
                  console.log(error);
                }
              }
            })
            Generos.findByPk(req.body.idGenero).then(generos => {
              generos.addVideos(videosUp).then(() => {
              })
            })
          }
          
          res.send({ Videos: videosUp, msg: "Video editado com sucesso", status: true });
        })
      }
    })
  },
  getAll (req, res) {
    Videos.findAll({include: [{model: Artistas }, { model: Generos }, { model: TipoVideos, required: true} ]}).then(videos => {
      var newVideos = new Array();
      
      for (let i = 0; i < videos.length; i++) {
        var tempVideos = new Object();
       tempVideos.idVideo = videos[i].idVideo,
       tempVideos.titulo = videos[i].titulo,
       tempVideos.idImdb = videos[i].idImdb,
       tempVideos.classImdb = videos[i].classImdb,
       tempVideos.sinopse = videos[i].sinopse,
       tempVideos.linkTrailer = videos[i].linkTrailer,
       tempVideos.imagem = videos[i].imagem,
       tempVideos.ano = videos[i].ano,
       tempVideos.diretor = videos[i].diretor
        var newArtistas = new Array();
        for (let k = 0; k < videos[i].Artistas.length; k++) {
          var tempArtista = new Object();  
          tempArtista.idArtista = videos[i].Artistas[k].idArtista, 
          tempArtista.nome = videos[i].Artistas[k].nome, 
          tempArtista.idImdb = videos[i].Artistas[k].idImdb
          
          newArtistas[k] = tempArtista;
        }
      tempVideos.Artistas = newArtistas;
      
      var newGeneros = new Array();
      for (let k = 0; k < videos[i].Generos.length; k++) {
        var tempGenero = new Object();  
        tempGenero.idGenero = videos[i].Generos[k].idGenero, 
        tempGenero.nome = videos[i].Generos[k].nome
        
        newGeneros[k] = tempGenero;
      }
      tempVideos.Generos = newGeneros;

      newTipoVideos = new Object();
      newTipoVideos.idTipoVideos = videos[i].TipoVideo.idTipoVideos;
      newTipoVideos.nome = videos[i].TipoVideo.nome;
      tempVideos.TipoVideos = newTipoVideos;

      newVideos[i] = tempVideos;
      }
      if(newVideos) {
        res.send({ videos: newVideos, status: true });
      }else{
        res.send({ msg: "Não existe resultados com essa pesquisa", status: false });
      }
    }).catch(err => {
      res.send( { msg: err, status: false } );
    });
  },
  getAllType (req, res) { 
    Videos.findAll({ include: [{ model: Artistas }, { model: Generos }, { model: TipoVideos, where: { idTipoVideos: req.params.id }, required: true  } ]}).then(videos => {
      var newVideos = new Array();
      console.log("2");
      for (let i = 0; i < videos.length; i++) {
        var tempVideos = new Object();
        tempVideos.idVideo = videos[i].idVideo,
        tempVideos.titulo = videos[i].titulo,
        tempVideos.idImdb = videos[i].idImdb,
        tempVideos.classImdb = videos[i].classImdb,
        tempVideos.sinopse = videos[i].sinopse,
        tempVideos.linkTrailer = videos[i].linkTrailer,
        tempVideos.imagem = videos[i].imagem,
        tempVideos.ano = videos[i].ano,
        tempVideos.diretor = videos[i].diretor
        var newArtistas = new Array();
        for (let k = 0; k < videos[i].Artistas.length; k++) {
          var tempArtista = new Object();  
          tempArtista.idArtista = videos[i].Artistas[k].idArtista, 
          tempArtista.nome = videos[i].Artistas[k].nome, 
          tempArtista.idImdb = videos[i].Artistas[k].idImdb
          
          newArtistas[k] = tempArtista;
        }
      tempVideos.Artistas = newArtistas;
      
      var newGeneros = new Array();
      for (let k = 0; k < videos[i].Generos.length; k++) {
        var tempGenero = new Object();  
        tempGenero.idArtista = videos[i].Generos[k].idGenero, 
        tempGenero.nome = videos[i].Generos[k].nome
        
        newGeneros[k] = tempGenero;
      }
      tempVideos.Generos = newGeneros;

      newTipoVideos = new Object();
      newTipoVideos.idTipoVideos = videos[i].TipoVideo.idTipoVideos;
      newTipoVideos.nome = videos[i].TipoVideo.nome;
      tempVideos.TipoVideos = newTipoVideos;

      newVideos[i] = tempVideos;
      }
      if(newVideos.length > 0) {
        res.send({ videos: newVideos, status: true });
      }else{
        res.send({ msg: "Não existe resultados com essa pesquisa", status: false });
      }
    }).catch(err => {
      res.send( { msg: err, status: false } );
    });
  },
  getOne (req, res) { 
    Videos.findAll({ include: [{ model: Artistas }, { model: Generos }, { model: TipoVideos, required: true  } ], where: {idVideo: req.params.id}}).then(videos => {
      var newVideos = new Array();
      console.log("2");
      for (let i = 0; i < videos.length; i++) {
        var tempVideos = new Object();
        tempVideos.idVideo = videos[i].idVideo,
        tempVideos.titulo = videos[i].titulo,
        tempVideos.idImdb = videos[i].idImdb,
        tempVideos.classImdb = videos[i].classImdb,
        tempVideos.sinopse = videos[i].sinopse,
        tempVideos.linkTrailer = videos[i].linkTrailer,
        tempVideos.imagem = videos[i].imagem,
        tempVideos.ano = videos[i].ano,
        tempVideos.diretor = videos[i].diretor
        var newArtistas = new Array();
        for (let k = 0; k < videos[i].Artistas.length; k++) {
          var tempArtista = new Object();  
          tempArtista.idArtista = videos[i].Artistas[k].idArtista, 
          tempArtista.nome = videos[i].Artistas[k].nome, 
          tempArtista.idImdb = videos[i].Artistas[k].idImdb
          
          newArtistas[k] = tempArtista;
        }
      tempVideos.Artistas = newArtistas;
      
      var newGeneros = new Array();
      for (let k = 0; k < videos[i].Generos.length; k++) {
        var tempGenero = new Object();  
        tempGenero.idArtista = videos[i].Generos[k].idGenero, 
        tempGenero.nome = videos[i].Generos[k].nome
        
        newGeneros[k] = tempGenero;
      }
      tempVideos.Generos = newGeneros;

      newTipoVideos = new Object();
      newTipoVideos.idTipoVideos = videos[i].TipoVideo.idTipoVideos;
      newTipoVideos.nome = videos[i].TipoVideo.nome;
      tempVideos.TipoVideos = newTipoVideos;

      newVideos[i] = tempVideos;
      }
      if(newVideos.length > 0) {
        res.send({ videos: newVideos, status: true });
      }else{
        res.send({ msg: "Não existe resultados com essa pesquisa", status: false });
      }
    }).catch(err => {
      res.send( { msg: err, status: false } );
    });
  }
}


//, { model: TipoVideos, where: { idTipoVideos: idTipoVideo }, required: true  }