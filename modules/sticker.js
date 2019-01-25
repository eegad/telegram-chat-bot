module.exports = function(ctx) {
  var sequelize = require("../utils/database.js");
  var sticker = require("../models/sticker");
  sequelize.sync();
  sticker.findAll({ where: {ques: ctx.message.sticker.file_id} }).then(data => {
    if(data[0] == undefined){
      //only if a reply
      if(ctx.message.reply_to_message == undefined){
        return;
      }
      if (ctx.message.reply_to_message.sticker == undefined) {
        return;
      }
      //create new
      sticker.create({
        ques: ctx.message.reply_to_message.sticker.file_id,
        reply: ctx.message.sticker.file_id
      });
    } else {
      let random = Math.floor(Math.random() * data.length);
      ctx.telegram.sendSticker(ctx.message.chat.id, data[random].reply, {"reply_to_message_id": ctx.message.message_id});
    }
  });
}
