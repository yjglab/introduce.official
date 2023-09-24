const { PRODUCTION } = require("../constants");
const env = PRODUCTION || "development";
const Sequelize = require("sequelize");
const user = require("./user");
const projectPost = require("./projectPost");
const findingPost = require("./findingPost");
const section = require("./section");
const skill = require("./skill");

const config = require("../config/config")[env];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const db = {};
db.User = user;
db.ProjectPost = projectPost;
db.FindingPost = findingPost;
db.Section = section;
db.Skill = skill;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
