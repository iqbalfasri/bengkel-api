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
} = require("../controllers/Kendaraan.controller");

// Index Route
router.get("/", index);
// Detail Barang Jasa
router.post("/detail/:_id", detail);
// View / List All Barang Jasa
router.post("/all", all);
// Create BarangJasa / Add new Barang Jasa
router.post("/create", validation(schemaValidation.kendaraan), create);
// Update Barang Jasa
router.put("/update/:_id", validation(schemaValidation.kendaraan), update);
// Delete / Remove Barang Jasa
router.del("/delete/:_id", remove);

module.exports = router;
