const express = require('express') 
const app = express();
const port = 8080;
var bodyParser = require("body-parser");
var cors = require('cors');
const Bot = require("./Bot.js");
const tabBot = require("./tabBot.js");
var tab = new tabBot();

//app.set('views', __dirname + '/../views');
app.use(bodyParser.urlencoded({ extended: false })); // to use bodyParser
app.use(bodyParser.json());
app.use(cors());
var corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  optionsSuccessStatus: 200
};



app.get("/",cors(corsOptions),function(req,res){
  let Names = tab.getNames();
  let Ports = tab.getPorts();
	console.log("les ports sont "+Ports);
  let Statuses = tab.getStatuses();
  let Brains = tab.getBrains();
	//let bot = {"name" : name, ...}
  res.send({botNames: Names ,ports: Ports, statuses: Statuses, brains: Brains});
});



app.put("/:name",cors(corsOptions),function(req,res){
		if(req.is('json')){
				var old = req.params.name;
				var newname = req.body.name;
				if (newname != undefined) {
						tab.setName(old, newname);
				}
				res.send(200, 'OK');
		}		
		else { res.send(400,"error, not a json");}
});


app.del("/:name",cors(corsOptions),function(req,res){
				var old = req.params.name;
				tab.deleteBot(old);
				res.send(200, 'OK');
});


app.post("/modify", cors(corsOptions),function(req,res){
if(req.is('json')){
	let Old =  req.body.old;
  let Name = req.body.name;
  let Port = req.body.port;
	let Status = req.body.status;
	let Brain = req.body.brain;
	tab.modify(Old,Name ,Port);
	res.send(200, 'OK');
	}
	else { res.send(400,"error, not a json");}
});




app.post("/",cors(corsOptions),function(req,res){
if(req.is('json')){
  let Name = req.body.name;
  let Port = req.body.port;
	console.log("req :" + req.body + " Name "+ Name +" Port " + Port);
  let Ports = tab.getPorts(); //careful
	console.log(Ports);
	let i = Ports.indexOf(Port);
  let Taken = (i == -1);
  let error ="";

  /*if(tab.getNames().includes(Name) || Taken){
   error = "Error, cannot create Bot !";
	 res.status(400).send(error);
	}else{ *///ok
   tab.addBot(Name ,Port);
	//res.writeHead(200);
	res.status(200).send({"name": Name, "port": Port, "status": ["online"], "brain": ["standard.rive"] });
	}
	else { res.send(400,"error, not a json");}
});

app.set('view engine', 'ejs'); 
const server = app.listen(8080, () => { 
console.log(`Service server is running on port ${server.address().port}`);
});



