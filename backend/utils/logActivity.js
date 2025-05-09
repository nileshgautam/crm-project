const db = require('../models');

const logActivity = async ({ userId, action, targetType, targetId, description }) => {
  try {
    await db.ActivityLog.create({
      user_id: userId,
      action,
      target_type: targetType,
      target_id: targetId,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (err) {
    console.error('Activity logging error:', err.message);
  }
};

module.exports = logActivity;
