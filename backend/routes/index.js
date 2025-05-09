const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/customers", require("./customerRoutes"));
router.use("/leads", require("./leadRoutes"));
router.use("/tasks", require("./taskRoutes"));
router.use("/activity", require("./activityRoutes"));

module.exports = router;
