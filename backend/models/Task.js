module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
      title: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.TEXT,
      due_date: DataTypes.DATEONLY,
      status: { type: DataTypes.ENUM('pending', 'completed'), defaultValue: 'pending' },
    });
  
    Task.associate = models => {
      Task.belongsTo(models.Customer, { foreignKey: 'customer_id' });
      Task.belongsTo(models.User, { foreignKey: 'user_id' });
    };
  
    return Task;
  };
  