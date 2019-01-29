const router = new (require("restify-router")).Router();

// Controller
const {
  index,
  all,
  create,
  detail,
  // update,
  // remove
} = require("../controllers/Service.controller");

// Index Route
router.post("/", index);
// Detail Service
router.post("/detail/:_id", detail);
// View / List All Service
router.post("/all", all);
// Create Serivce / Add new Service
router.post("/create", create);
// // Update Service
// router.put("/update/:_id", update);
// // Delete / Remove Service
// router.del("/delete/:_id", remove);

module.exports = router;
