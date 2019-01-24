const router = new (require("restify-router")).Router();

// Controller
const {
  index,
  all,
  create,
  detail
} = require("../controllers/BarangJasa.controller");

// Index Route
router.get("/", index);
// Detail Barang Jasa
router.post("/detail/:_id", detail);
// View / List All Barang Jasa
router.post("/all", all);
// Create BarangJasa / Add new Barang Jasa
router.post("/create", create);
// // Update Barang Jasa
// router.put("/update/:_id", update);
// // Delete / Remove Barang Jasa
// router.del("/delete/:_id", remove);

module.exports = router;
