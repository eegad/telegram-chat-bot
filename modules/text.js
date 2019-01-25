module.exports = function(ctx) {
  var sequelize = require("../utils/database.js");
  var talks = require("../models/talks");
  sequelize.sync();
  talks.findAll({ where: {ques: ctx.message.text} }).then(data => {
    if(data[0] == undefined){
      //only if a reply
      if(ctx.message.reply_to_message == undefined){
        return;
      }
      //create new talk
      talks.create({
        ques: ctx.message.reply_to_message.text,
        reply: ctx.message.text
      });
    } else {
      let random = Math.floor(Math.random() * data.length);
      ctx.telegram.sendMessage(ctx.message.chat.id, data[random].reply, {"reply_to_message_id": ctx.message.message_id});
    }
  });
}
