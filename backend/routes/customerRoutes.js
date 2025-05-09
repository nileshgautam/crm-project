const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const customerController = require("../controllers/customerController");

router.get("/", authenticate, customerController.getAllCustomers);
router.get("/:id", authenticate, customerController.getCustomer);
router.post("/", authenticate, customerController.createCustomer);
router.put("/:id", authenticate, customerController.updateCustomer);
router.delete("/:id", authenticate, customerController.deleteCustomer);

module.exports = router;
