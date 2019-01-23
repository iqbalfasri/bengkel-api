const router = new (require("restify-router")).Router();

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
router.post("/create", create);
// Update Customer
router.put("/update/:_id", update);
// Delete / Remove Customer
router.del("/delete/:_id", remove);

module.exports = router;
