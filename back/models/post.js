const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: DataTypes.STRING(10),
          allowNull: false,
          //   validate: {
          //     isIn: [["project", "finding"]],
          //   },
        },
        category: {
          type: DataTypes.STRING(20),
        },
        title: {
          type: DataTypes.STRING(20),
        },
        description: {
          type: DataTypes.STRING(500),
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
        },
        deadline: {
          type: DataTypes.STRING(10),
        },
      },
      {
        modelName: "Post",
        tableName: "posts",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Section);
    db.Post.belongsToMany(db.Skill, { through: "PostSkill" });
    db.Post.belongsToMany(db.User, {
      through: "PostLike",
      as: "Likers",
    });
    db.Post.belongsToMany(db.User, {
      through: "PostMark",
      as: "Markers",
    });
  }
};
