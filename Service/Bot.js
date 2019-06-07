class Bot{

  constructor(port){

    const express = require("express");
    const RiveScript = require("rivescript");
    this.bot = new RiveScript();
    this.brain = "standard";
    this.port = port;
    this.app = express();
    this.reply = "";
    this.status = "Down";
    this.discussions = new Map();
  }

}
module.exports = Bot;
