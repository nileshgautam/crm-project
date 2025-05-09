const { authenticate, authorize } = require("./auth");
const { customerValidation } = require("./validation/customerValidation");
const validate = require("./validate");

module.exports = {
  authenticate,
  authorize,
  customerValidation,
  validate,
};
// This file serves as an index for all middleware functions.
