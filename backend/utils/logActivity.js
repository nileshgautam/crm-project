const db = require("../models");
/**
 * Logs user activity in the database.
 * @param {Object} params - The parameters for logging the activity.
 * @param {number} params.userId - The ID of the user performing the action.
 * @param {string} params.action - The action performed by the user.
 * @param {string} params.targetType - The type of target (e.g., "Customer").
 * @param {number} params.targetId - The ID of the target entity.
 * @param {string} params.description - A description of the activity.
 * @returns {Promise<void>} - A promise that resolves when the activity is logged.
 * @throws {Error} - Throws an error if logging fails.
 */
const logActivity = async ({
  userId,
  action,
  targetType,
  targetId,
  description,
}) => {
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
    console.error("Activity logging error:", err.message);
  }
};

module.exports = logActivity;
