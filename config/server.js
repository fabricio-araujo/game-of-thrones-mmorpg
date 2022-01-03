//import framework express module
var express = require('express');

//import consign module
var consign = require('consign');

//import body-parser module
var bodyParser = require('body-parser');

//import express-validator module
var expressValidator = require('express-validator');

//import express-session module
var expressSession = require('express-session');

//init express object
var app = express();

//variáveis 'view engine' e 'views' do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

//middleware express.static
app.use(express.static('./app/public'));

//middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));

//middleware express-validator
app.use(expressValidator());

//middleware express-session
app.use(expressSession({
	secret: 'fffaaasss',
	resave: false,
	saveUninitialized: false
}));

//routes autoload of models and controllers to app object
consign()
	.include('app/routes')
	.then('config/dbConnection.js')
	.then('app/models')
	.then('app/controllers')
	.into(app);

//export app
module.exports = app;