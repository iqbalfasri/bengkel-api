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
} = require("../controllers/Service.controller");

// Index Route
router.post("/", index);
// Detail Service
router.post("/detail/:_id", detail);
// View / List All Service
router.post("/all", all);
// Create Serivce / Add new Service
router.post("/create", validation(schemaValidation.service), create);
// Update Service
router.put("/update/:_id", validation(schemaValidation.service), update);
// Delete / Remove Service
router.del("/delete/:_id", remove);

module.exports = router;
