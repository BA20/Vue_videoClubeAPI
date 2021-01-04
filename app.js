const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'static')));


//Routes
app.use('/utilizadores', require('./routes/utilizador'));
app.use('/artistas', require('./routes/artistas'));
app.use('/episodios', require('./routes/episodios'));
app.use('/generos', require('./routes/generos'));
app.use('/pedidos', require('./routes/pedidos'));
app.use('/tipoVideo', require('./routes/tipoVideo'));
app.use('/videos', require('./routes/videos'));

app.get('/', function (req, res) {
    res.send('Hello World!')
  })


// { force: true }

sequelize.sync().then(() => {
  app.listen( 
    process.env.PORT || 5000,
    console.log("Server running on port 5000")
  )
});
