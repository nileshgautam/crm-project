module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("admin", "user"), defaultValue: "user" },
  });

  User.associate = (models) => {
    User.hasMany(models.Customer, { foreignKey: "user_id" });
    User.hasMany(models.Task, { foreignKey: "user_id" });
    User.hasMany(models.Lead, { foreignKey: "created_by" });
    User.hasMany(models.ActivityLog, { foreignKey: "user_id" });
  };

  return User;
};
