var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const URL="http://localhost:8080";
var xhr;   //instance of XMLHttpRequest
var text;  //text from the xhr.responseText
var botList;// = {"botNames": ["default"] , "ports": ["2000"] , "statuses": ["online"], "brains": ["default.rive"]};
var robot;
var serviceResponse;
module.exports = {


	create: function(name,port,req,res){
		console.log("debut du create:");
	/*	var N = botList.botNames;
		var P = botList.ports;
		var S = botList.statuses;
		var B = botList.brains;*/
		xhr = new XMLHttpRequest();
		console.log("avant callback xhr.readyState = "+xhr.readyState+ "xhr.status = "+xhr.status);
		xhr.onreadystatechange = function() {
		console.log("dans callback");
	      	if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0) ){
						console.log("dans if ==4");
		        serviceResponse = JSON.parse(xhr.responseText);
		        console.log("xhr response : "+xhr.responseText);
						var botList = serviceResponse;
						//botList = {"botNames": [name], "ports": [port], "statuses": [stat], "brains": [brain]}; //serviceresponse
					}
					else { 		console.log("xhr.readyState = "+xhr.readyState+ "xhr.status = "+xhr.status);}
	};
	robot = {"name" : name, "port" : port};
	console.log("robot "+robot.name+robot.port);
  xhr.open("POST",URL,true);
	xhr.setRequestHeader('Content-Type', 'application/json');
  //xhr.onload = requestComplete;
	xhr.send(JSON.stringify(robot));
	console.log("JSONrobot "+JSON.stringify(robot));
	console.log("apres callback xhr.readyState = "+xhr.readyState+ " xhr.status = "+xhr.status);
},

	getbotList: function(req,res){
		console.log("botList from getter "+ botList);
		return botList;
},

	getBots: function(req,res){
   	xhr = new XMLHttpRequest();

     xhr.onreadystatechange = function() {
	      if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){
		        serviceResponse = JSON.parse(xhr.responseText);
		        console.log(serviceResponse);
						botList = serviceResponse;
	      }
     };
		xhr.open("GET",URL+"/",true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(botList);
 	},

  getReply : function(req,res){
		return serviceResponse;
 	},


	modif: function(old, name, port, status, brain, req, res) {
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
	      	if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0) ){
		        serviceResponse = JSON.parse(xhr.responseText);
						var botList = serviceResponse;
						//botList = {"botNames": [name], "ports": [port], "statuses": [stat], "brains": [brain]}; //serviceresponse
					}
					else { 		console.log("xhr.readyState = "+xhr.readyState+ "xhr.status = "+xhr.status);}
	};
	robot = {"old": old, "name" : name, "port" : port, "status": status, "brain": brain};
  xhr.open("POST",URL,true);
	xhr.setRequestHeader('Content-Type', 'application/json');
  //xhr.onload = requestComplete;
	xhr.send(JSON.stringify(robot));
	console.log("JSONrobot "+JSON.stringify(robot));
	console.log("apres callback xhr.readyState = "+xhr.readyState+ " xhr.status = "+xhr.status);
},

};

function responseAllBots(serviceResponse,req,res){
  res.render('botbis',{botList: serviceResponse});
}
