//import config
const config = require("./config");

//start bot
const Telegraf = require("telegraf");
const bot = new Telegraf(config.token);
const sequelize = require("./utils/database");

//import db models
const talks = require("./models/talks");

//start bot
bot.startPolling();

//core
bot.start((ctx) => ctx.reply(`Hello ${ctx.from.first_name}!, I don't take any commands so don't bother.`));
bot.on('text', (ctx) => {
  talks.findOne({ where: {title: ctx.message.text} }).then(data => {
    console.log(data);
  }
});

//to test database connection
sequelize.authenticate().then(function (err) {
  if(err){
    bot.telegram.sendMessage(config.owner.id, `Unable to connect to the database: ${err}`);
  }else{
    sequelize.sync();
    bot.telegram.sendMessage(config.owner.id, "Connected to database");
  }
});
