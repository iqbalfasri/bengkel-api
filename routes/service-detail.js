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
} = require("../controllers/ServiceDetail.controller");

// Index Route
router.post("/", index);
// Detail Service Detail
router.post("/detail/:_id", detail);
// View / List All Service Detail
router.post("/all", all);
// Create / Add new Service Detail
router.post("/create", validation(schemaValidation.serviceDetail), create);
// Update Service Detail
router.put("/update/:_id", validation(schemaValidation.serviceDetail), update);
// Delete / Remove Service Detail
router.del("/delete/:_id", remove);

module.exports = router;
