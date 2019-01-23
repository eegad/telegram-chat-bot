module.exports = function(ctx) {
  var talks = require("../models/talks");
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
      });
    } else {
      ctx.telegram.sendMessage(ctx.message.chat.id, data.reply, {'reply_to_message_id': ctx.message.message_id})
    }
  });
}
