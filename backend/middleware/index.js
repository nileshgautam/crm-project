const { authenticate, authorize } = require("./auth");
const { customerValidation } = require("./validation/customerValidation");

exports = {
  authenticate,
  authorize,
  customerValidation,
};
// This file serves as an index for all middleware functions.