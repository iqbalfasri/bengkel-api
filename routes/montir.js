const router = new (require("restify-router")).Router();

router.get("/", function(req, res) {
  res.json({
    message: "Tes Montir"
  });
});


module.exports = router;
