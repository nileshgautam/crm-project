/**
 *
 * This module exports two functions: success and error.
 * The success function is used to send a successful response with a message and optional data.
 * The error function is used to send an error response with a message and optional status code.
 * The success function takes in a response object, a message, optional data, and an optional status code (defaulting to 200).
 * It returns a JSON response with a success flag set to true, the message, and the data.
 * The error function takes in a response object, a message, and an optional status code (defaulting to 500).
 * It returns a JSON response with a success flag set to false and the error message.
 * This module is useful for standardizing API responses in an Express application.
 * It helps to maintain consistency in the structure of the responses sent to the client.
 * By using this module, developers can easily send success or error responses without repeating code.
 *
 * @module response
 * @requires express
 * @description This module provides utility functions for sending standardized API responses.
 * @example
 * const response = require('./utils/response');
 */
module.exports = {
  /**
   * Sends a success response.
   * @param {Object} res - The response object from Express.
   * @param {string} message - The success message.
   * @param {Object} [data={}] - Optional data to include in the response.
   * @param {number} [statusCode=200] - Optional HTTP status code (default is 200).
   * @returns {Object} The JSON response object.
   */
  success: (res, message, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },
  /**
   * Sends an error response.
   * @param {Object} res - The response object from Express.
   * @param {string} message - The error message.
   * @param {number} [statusCode=500] - Optional HTTP status code (default is 500).
   * @returns {Object} The JSON response object.
   */
  error: (res, message, statusCode = 500) => {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  },

  /**
   * send paginated response.
   * @param  {object}  res- The response object from Express.
   * @param  {string}  message - The success message.
   * @param  {array}  data - The data to be sent in the response.
   * @param  {number}  page - The current page number.
   * @param  {number}  pageSize - The number of items per page.
   * @param  {number}  total - The total number of items.
   * @param  {number}  statusCode - The HTTP status code (default is 200).
   * @description  This function sends a paginated response with the provided data, pagination details, and status code.
   * @return  {[type]}  [return description]
   */
  paginated: (
    res,
    message = "Success",
    data = [],
    page = 1,
    pageSize = 10,
    total = 0,
    statusCode = 200
  ) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  },
};
