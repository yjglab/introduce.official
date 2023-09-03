const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Skill extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(20),
        },
      },
      {
        modelName: "Skill",
        tableName: "skills",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Skill.belongsToMany(db.Post, { through: "PostSkill" });
  }
};
