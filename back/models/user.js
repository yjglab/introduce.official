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
        class: {
          type: DataTypes.ENUM("normal", "pro"),
          defaultValue: "normal",
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
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.Post, {
      through: "PostLike",
      as: "Liked",
    });
    db.User.belongsToMany(db.Post, {
      through: "PostMark",
      as: "Marked",
    });
  }
};
