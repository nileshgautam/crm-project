const db = require("../models");
const { logActivity, response, logger } = require("../utils");

exports.getAllCustomers = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const limit = parseInt(pageSize) || 10;
    const offset = (parseInt(page) - 1) * limit || 0;
    const customers = await db.Customer.findAndCountAll({
      limit,
      offset,
    });
    const total = customers.count;
    const totalPages = Math.ceil(total / limit);
    const paginatedCustomers = customers.rows;
    const responseData = {
      customers: paginatedCustomers,
      pagination: {
        page: parseInt(page) || 1,
        pageSize: limit,
        total,
        totalPages,
      },
    };
    response.success(
      res,
      "Customers retrieved successfully",
      responseData,
      200
    );
  } catch (error) {
    logger.error("Error retrieving customers:", error);
    response.error(res, "Failed to retrieve customers", 500);
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const customer = await db.Customer.findByPk(req.params.id);
    if (!customer) {
      response.error(res, "Failed to retrieve customer", 500);
    }
    response.success(res, "Customer retrieved successfully", customer, 200);
  } catch (err) {
    logger.error("Error retrieving customer:", err);
    response.error(res, "Failed to retrieve customer", 500);
  }
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
    response.success(res, "Customer created successfully", customer, 201);
  } catch (err) {
    logger.error("Error creating customer:", err);
    response.error(res, "Failed to create customer", 500);
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await db.Customer.findByPk(req.params.id);
    if (!customer) {
      return response.error(res, "Customer not found", 404);
    }
    await customer.update(req.body);

    await logActivity({
      userId: req.user.id, // assuming req.user is set via auth middleware
      action: "update",
      targetType: "Customer",
      targetId: customer.id,
      description: `Updated customer "${customer.name}"`,
    });
    response.success(res, "Customer updated successfully", customer, 200);
  } catch (err) {
    logger.error("Error updating customer:", err);
    response.error(res, "Failed to update customer", 500);
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await db.Customer.findByPk(req.params.id);
    if (!customer) return response.error(res, "Customer not found", 404);
    await customer.destroy();
    await logActivity({
      userId: req.user.id, // assuming req.user is set via auth middleware
      action: "delete",
      targetType: "Customer",
      targetId: customer.id,
      description: `Deleted customer "${customer.name}"`,
    });
  } catch (error) {
    logger.error("Error deleting customer:", error);
    response.error(res, "Failed to delete customer", 500);
  }
};
