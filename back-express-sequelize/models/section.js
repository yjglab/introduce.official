const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Section extends Model {
  static init(sequelize) {
    return super.init(
      {
        header: {
          type: DataTypes.STRING(20),
        },
        description: {
          type: DataTypes.STRING(500),
        },
      },
      {
        modelName: "Section",
        tableName: "sections",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Section.belongsTo(db.ProjectPost);
    db.Section.belongsTo(db.FindingPost);
  }
};
