const db = require("../models");
const logActivity = require('../utils/logActivity');


exports.getAllCustomers = async (req, res) => {
  const customers = await db.Customer.findAll();
  res.json(customers);
};

exports.getCustomer = async (req, res) => {
  const customer = await db.Customer.findByPk(req.params.id);
  if (!customer) return res.status(404).json({ message: "Not found" });
  res.json(customer);
};

exports.createCustomer = async (req, res) => {
  try {
    req.body.user_id = req.user.id; // assuming req.user is set via auth middleware
   
    const customer = await db.Customer.create(req.body);
    await logActivity({
      userId: req.user.id, // assuming req.user is set via auth middleware
      action: "create",
      targetType: "Customer",
      targetId: customer.id,
      description: `Created customer "${customer.name}"`,
    });

    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
  const customer = await db.Customer.findByPk(req.params.id);
  if (!customer) return res.status(404).json({ message: "Not found" });
  await customer.update(req.body);
  res.json(customer);
};

exports.deleteCustomer = async (req, res) => {
  const customer = await db.Customer.findByPk(req.params.id);
  if (!customer) return res.status(404).json({ message: "Not found" });
  await customer.destroy();
  res.json({ message: "Customer deleted" });
};
