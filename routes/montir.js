const router = new (require("restify-router")).Router();

// Controller
const { index, all, create } = require("../controllers/Montir.controller");

// Index Route
router.get("/", index);
// View / List All Montir's
router.post("/all", all);
// Create Montir / Add new Montir
router.post("/create", create);

module.exports = router;
