const Bot = require("./Bot.js");


class tabBot{

  constructor(){
  this.tab = [new Bot(2000)];
	this.names = ["test"];
	this.ports = [2000];
	this.statuses = ["online"];
	this.brains = ["standard.js"];
  }

	getLength(){
		return this.tab.length;
	}

	getAll(){ 
    return this.tab;
  }

	getNames(){
    return this.names;
  }

	addBot(name,p){
    var newBot = new Bot(p);
		if (this.tab.length == 0) {
  	this.tab.push(newBot);
    this.names.push(name);
		this.ports.push(p);
		this.statuses.push("online");
		this.brains.push("standard.js");
		} 
	else {
		var found = this.tab.includes(p);
		if(!found){	// in order to prevent the bot to have the same port as another
    	this.tab.push(newBot);
    	this.names.push(name);
			this.ports.push(p);
			this.statuses.push("online");
			this.brains.push("standard.js");
		}
		else { console.log("Erreur d'ajout de "+name);}
	}
  }

	getBot(name){
		var i =  this.names.indexOf(name);
  	return this.tab[i];
  }

  getPorts(){
		let tmp = [];
		for(let k=0;k<this.tab.length;k++){
			tmp.push(this.tab[k].port);
    return tmp;
		}
  }

	getStatuses(){
		let tmp = [];
		for(let k=0;k<this.tab.length;k++){
			tmp = tmp.push(this.tab[k].status);
    return tmp;
		}
	}

	getBrains(){
		let tmp = [];
		for(let k=0;k<this.tab.length;k++){
			tmp = tmp.push(this.tab[k].brain);
    return tmp;
		}
	}

	deleteBot(name){

    let bot = this.getBot(name);
    if(bot != null){
    var i =  this.names.indexOf(name);
 		this.tab.splice(i,1);
		this.names.splice(i,1);
    console.log("Bot "+name+ "supprimé correctement");
    } else {
    console.log("Erreur de suppression de "+name);
    }
  }

  deleteAll(){
    this.tab = [];
    this.names = [];		
  }

	setName(name, newname){
		var i = this.names.indexOf(name);
		this.names[i] = newname;
	}

	setPort(i, newport){
		this.ports[i] = newport;
	}

	setStatus(i, newstat){
		this.statuses[i] = newstat;
	}

	setBrains(i, newbrain){
		this.brains[i] = newbrain;
	}

	modify(old, name, port, stat, brain){
		var i = this.names.indexOf(old);
		this.setName(old, name);
		this.setPort(i, port);
		this.setStatuses(i, stat);
		this.setBrains(i, brain);
	}



}

module.exports = tabBot;
