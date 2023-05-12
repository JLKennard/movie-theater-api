const Show = require("./Show");
const User = require("./User");

User.belongsToMany(Show, { through: "show_user" });
Show.belongsToMany(User, { through: "show_user" });

module.exports = {
  Show,
  User,
};
