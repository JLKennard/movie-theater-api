const Show = require("./Show");
const User = require("./User");

// User.hasMany(Show);
// Show.belongsTo(User);

User.belongsToMany(Show, { through: "user_show" });
Show.belongsToMany(User, { through: "user_show" });

module.exports = {
  Show,
  User,
};
