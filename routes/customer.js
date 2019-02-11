const router = new (require("restify-router")).Router();
const validation = require("../middleware/validation");
const { schemaValidation } = require("../utils");

// Controller
const {
  index,
  all,
  create,
  detail,
  update,
  remove
} = require("../controllers/Customer.controller");

// Index Route
router.get("/", index);
// Detail Customer
router.post("/detail/:_id", detail);
// View / List All Customer's
router.post("/all", all);
// Create Customer / Add new Customer
router.post("/create", validation(schemaValidation.customer), create);
// Update Customer
router.put("/update/:_id", validation(schemaValidation.customer), update);
// Delete / Remove Customer
router.del("/delete/:_id", remove);

module.exports = router;
