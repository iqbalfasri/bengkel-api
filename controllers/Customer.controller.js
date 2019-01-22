const customer = require("../models/Customer.model");

exports.index = (req, res) => {
  res.json({
    list_endpoints: ["/all", "/detail/:_id"]
  });
};
