const Joi = require("joi");
const { code_response } = require("../utils");

const validate = schema => {
  return (req, res, next) => {
    Joi.validate(req.body, schema, (err, value) => {
      if (err) {
        // send a 422 error response if validation fails
        res.send(422, {
          status: "Invalid request data",
          message: err.message,
          code: code_response.CODE_BAD_REQUEST
        });
      } else {
        // send a success response if validation passes
        next();
      }
    });
  };
};

module.exports = validate;
