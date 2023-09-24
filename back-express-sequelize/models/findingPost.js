const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class FindingPost extends Model {
  static init(sequelize) {
    return super.init(
      {
        category: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        deadline: {
          type: DataTypes.STRING(10),
        },
      },
      {
        modelName: "FindingPost",
        tableName: "findingPosts",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.FindingPost.belongsTo(db.User);
    db.FindingPost.hasMany(db.Section);
    db.FindingPost.belongsToMany(db.Skill, { through: "FindingPostSkill" });
    db.FindingPost.belongsToMany(db.User, {
      through: "FindingPostMark",
      as: "FindingMarkers",
    });
  }
};
