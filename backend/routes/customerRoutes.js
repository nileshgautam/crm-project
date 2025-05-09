const express = require("express");
const router = express.Router();
const {
  authenticate,
  authorize,
  customerValidation,
  validate,
} = require("../middleware");

const customerController = require("../controllers/customerController");

router.get("/", authenticate, customerController.getAllCustomers);
router.get("/:id", authenticate, customerController.getCustomer);
router.post(
  "/",
  authenticate,
  customerValidation,
  validate,
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
