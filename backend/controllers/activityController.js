const db = require('../models');

exports.getLogs = async (req, res) => {
  const logs = await db.ActivityLog.findAll({ include: ['User'] });
  res.json(logs);
};
