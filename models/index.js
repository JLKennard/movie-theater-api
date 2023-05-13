const Show = require("./Show");
const User = require("./User");

User.hasMany(Show);
Show.belongsTo(User);

module.exports = {
  Show,
  User,
};
