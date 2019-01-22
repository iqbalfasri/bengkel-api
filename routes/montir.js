const router = new (require("restify-router")).Router();

// Controller
const {
  index,
  all,
  create,
  detail,
  update,
  remove
} = require("../controllers/Montir.controller");

// Index Route
router.get("/", index);
// Detail Montir
router.post("/detail/:_id", detail);
// View / List All Montir's
router.post("/all", all);
// Create Montir / Add new Montir
router.post("/create", create);
// Update Montir
router.put("/update/:_id", update);
// Delete / Remove Montir
router.del("/delete/:_id", remove);

module.exports = router;
