const router = new (require("restify-router")).Router();

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
router.get("/", index);
// Detail Service Detail
router.post("/detail/:_id", detail);
// View / List All Service Detail
router.post("/all", all);
// Create BarangJasa / Add new Service Detail
router.post("/create", create);
// Update Service Detail
router.put("/update/:_id", update);
// Delete / Remove Service Detail
router.del("/delete/:_id", remove);

module.exports = router;
