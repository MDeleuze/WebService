const express = require('express') //use express
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
const action = require("./javascript/function.js");

app.use(bodyParser.urlencoded({ extended: true })); // to use bodyParser
app.use(bodyParser.json());
app.set('view engine', 'ejs'); //to use ejs

const server = app.listen(3000, () => { //run server
  console.log(`Admin server is running on port ${server.address().port}`);
});

//Accueil
app.get('/', function(req, res){
  res.render("accueil");
});

//Home page bis
app.post('/home', function(req,res){
  username = req.body.username;
  console.log ("username=" +username);
  res.render("home");
});

app.get('/home', function(req,res){
  res.render("home");
});

app.get('/botbis', function(req,res){
	console.log("Get BotList started");
  action.getBots(req, res);
	res.render('botbis', {botList: action.getbotList(req, res)});
	console.log("BotList app.get(/botbis)"+action.getbotList(req, res));
});


app.post('/createBot', function(req,res){
	console.log("Create Launched");
	console.log("name "+ req.body.name + " port " + req.body.port);
  action.create(req.body.name, req.body.port, req, res);
	let reply = action.getReply();
	console.log("action.create done");
	//var botList = reply.response;
	res.render('botbis',{botList: reply.response});// {botList: action.getbotList(req, res)});
	console.log("Botlist from create "+action.getbotList(req, res));
});



app.post('/modify', function(req,res){
  action.create(req.body.name, req.body.port, req, res);
});

app.get('/bot', function(req,res){
  res.render("bot");
});

app.get('/accueil', function(req,res){
  res.render("accueil");
});

