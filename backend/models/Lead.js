module.exports = (sequelize, DataTypes) => {
    const Lead = sequelize.define("Lead", {
      title: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.ENUM('new', 'in_progress', 'won', 'lost'), defaultValue: 'new' },
      value: DataTypes.DECIMAL(10, 2),
      notes: DataTypes.TEXT,
    });
  
    Lead.associate = models => {
      Lead.belongsTo(models.Customer, { foreignKey: 'customer_id' });
      Lead.belongsTo(models.User, { foreignKey: 'created_by' });
    };
  
    return Lead;
  };
  