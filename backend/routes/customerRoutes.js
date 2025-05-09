const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const customerController = require("../controllers/customerController");
const {
  customerValidation,
} = require("../middleware/validation/customerValidation");

router.get("/", authenticate, customerController.getAllCustomers);
router.get("/:id", authenticate, customerController.getCustomer);
router.post(
  "/",
  authenticate,
  customerValidation,
  customerController.createCustomer
);
router.put("/:id", authenticate, customerController.updateCustomer);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  customerController.deleteCustomer
);

module.exports = router;
