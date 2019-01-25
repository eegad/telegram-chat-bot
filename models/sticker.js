const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

//create notes model
var sticker = sequelize.define("sticker", {
  ques: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reply: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = sticker;
