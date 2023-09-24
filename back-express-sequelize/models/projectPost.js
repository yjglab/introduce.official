const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProjectPost extends Model {
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
        sourceName: {
          type: DataTypes.STRING(20),
        },
        sourceLink: {
          type: DataTypes.STRING(300),
        },
        sourceOwner: {
          type: DataTypes.STRING(20),
        },
        grades: {
          type: DataTypes.FLOAT,
          defaultValue: 0,
        },
      },
      {
        modelName: "ProjectPost",
        tableName: "projectPosts",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProjectPost.belongsTo(db.User);
    db.ProjectPost.hasMany(db.Section);
    db.ProjectPost.belongsToMany(db.Skill, { through: "ProjectPostSkill" });
    db.ProjectPost.belongsToMany(db.User, {
      through: "ProjectPostLike",
      as: "ProjectLikers",
    });
    db.ProjectPost.belongsToMany(db.User, {
      through: "ProjectPostMark",
      as: "ProjectMarkers",
    });
  }
};
