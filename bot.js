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
  talks.findOne({ where: {ques: ctx.message.text} }).then(data => {
    if(data == null){
      //only if a reply
      if(ctx.message.reply_to_message == undefined){
        return;
      }
      //create new talk
      talks.create({
        ques: ctx.message.reply_to_message.text,
        reply: ctx.message.text
      }).then(err => {
        console.log(err);
      });
    } else {
      ctx.telegram.sendMessage(ctx.message.chat.id, data.reply, {'reply_to_message_id': ctx.message.message_id})
    }
  });
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
