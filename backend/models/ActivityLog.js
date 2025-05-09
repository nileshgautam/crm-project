module.exports = (sequelize, DataTypes) => {
    const ActivityLog = sequelize.define("ActivityLog", {
      action: { type: DataTypes.STRING, allowNull: false },
      target_type: DataTypes.STRING,
      target_id: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    });
  
    ActivityLog.associate = models => {
      ActivityLog.belongsTo(models.User, { foreignKey: 'user_id' });
    };
  
    return ActivityLog;
  };
  
  