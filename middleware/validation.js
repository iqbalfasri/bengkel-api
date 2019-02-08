const Joi = require("joi");

const validate = schema => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema);
    const valid = error == null;

    // Cek data valid
    if (valid) {
      next();
    }
    const { details } = error;
    const message = details.map(i => i.message).join(",");

    console.log("error", message);
    // console.log("ada error", error);
    res.send(422, {
      error: message
    })
  };
};

module.exports = validate;
