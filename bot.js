//import config
const config = require("./config");

//start bot
const Telegraf = require("telegraf");
const bot = new Telegraf(config.token);
const sequelize = require("./utils/database");
const text_module = require("./modules/text");

bot.startPolling();

//core
bot.start((ctx) => ctx.reply(`Hello ${ctx.from.first_name}! I don't take any commands so don't bother.`));
bot.on("message", (ctx) => {
  if(ctx.message.text != undefined){
    text_module(ctx);
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
