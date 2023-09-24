const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(30),
          unique: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        socialId: {
          type: DataTypes.STRING(100),
        },
        socialName: {
          type: DataTypes.STRING(20),
        },
        position: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        class: {
          type: DataTypes.ENUM("normal", "pro"),
          defaultValue: "normal",
        },
        role: {
          type: DataTypes.ENUM("user", "admin"),
          defaultValue: "user",
        },
      },
      {
        modelName: "User",
        tableName: "users",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.ProjectPost);
    db.User.hasMany(db.FindingPost);
    db.User.belongsToMany(db.ProjectPost, {
      through: "ProjectPostLike",
      as: "ProjectLiked",
    });
    db.User.belongsToMany(db.ProjectPost, {
      through: "ProjectPostMark",
      as: "ProjectMarked",
    });
    db.User.belongsToMany(db.FindingPost, {
      through: "FindingPostLike",
      as: "FindingLiked",
    });
    db.User.belongsToMany(db.FindingPost, {
      through: "FindingPostMark",
      as: "FindingMarked",
    });
  }
};
