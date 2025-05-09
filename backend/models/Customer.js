module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("Customer", {
      name: { type: DataTypes.STRING, allowNull: false },
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
      company: DataTypes.STRING,
      status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
    });
  
    Customer.associate = models => {
      Customer.belongsTo(models.User, { foreignKey: 'user_id' });
      Customer.hasMany(models.Task, { foreignKey: 'customer_id' });
      Customer.hasMany(models.Lead, { foreignKey: 'customer_id' });
    };
  
    return Customer;
  };
  