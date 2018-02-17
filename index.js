/**
 * Configuracion basica de express y Socket.io
 */
var app = require('express')();
var http = require('http').Server(app);
var bodyParser =  require("body-parser");
const cors = require('cors');
//Configruacion del CORS

var whitelist = ['http://localhost:9000', 'http://localhost:3000'];

var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

app.use(cors());


const mongoose = require('mongoose');
const models = require('./models');
//Configuracion de la base de datos
const config = {
    user: 'admin',
    password: 'n0m3l0',
}
const MONGO_URI = `mongodb://localhost/demos_db`;
//const MONGO_URI = `mongodb://${config.user}:${config.password}@ds255767.mlab.com:55767/demos_db`;
mongoose.Promise = require('bluebird');
mongoose.connect(MONGO_URI).catch(err => console.error(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
 *	Configuracion de las rutas
 */ 
var ticket_controller  = require("./routes/ticket_controller");
app.post('/ticket_controller', ticket_controller.post);
app.get('/ticket_controller', ticket_controller.post);


var email  = require("./routes/email");
app.post('/send_email', email.sendEmail);
app.get('/send_email', email.sendEmail);

/*
 *	Poner a la escucha el servidor 
 */
const port = process.env.PORT || 5000;
http.listen(port, function(){
  console.log('Escuchando por http en: ' + port);
});

