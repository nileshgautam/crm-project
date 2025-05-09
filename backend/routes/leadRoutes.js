const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");

const leadController = require("../controllers/leadController");

router.get("/", authenticate, leadController.getAllLeads);
router.post("/", authenticate, leadController.createLead);

module.exports = router;
