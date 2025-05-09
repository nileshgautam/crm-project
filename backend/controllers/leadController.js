const db = require("../models");
const logActivity = require("../utils/logActivity");

exports.getAllLeads = async (req, res) => {
  const leads = await db.Lead.findAll({ include: ["Customer", "CreatedBy"] });
  res.json(leads);
};

exports.createLead = async (req, res) => {
  try {
    req.body.created_by = req.user.id;
    const lead = await db.Lead.create(req.body);
    await logActivity({
      userId: req.user.id, // assuming req.user is set via auth middleware
      action: "create",
      targetType: "Lead",
      targetId: lead.id,
      description: `Created lead "${lead.name}"`,
    });
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
