const montir = require("../models/Montir.model");

// Index route
exports.index = (req, res) => {
  res.json({
    message: "Hello to montir endpoint",
    list_endpoints: ["/all", "/create"]
  });
};

// View All Montir
exports.all = (req, res) => {
  montir
    .find()
    .then(montir => {
      res.json({
        data: montir,
        status: "Success"
      });
    })
    .catch(err => {
      res.json({
        data: null,
        status: "Internal server error"
      });
    });
};

// Create / Add new Montir
exports.create = (req, res) => {
  const {
    nama_montir,
    alamat_montir,
    jenis_kelamin_montir,
    password
  } = req.body;
  const createMontir = new montir({
    nama_montir: nama_montir,
    alamat_montir: alamat_montir,
    jenis_kelamin_montir: jenis_kelamin_montir,
    password: password
  });

  // Save Document
  createMontir
    .save()
    .then(montir => {
      res.json({
        data: montir,
        status: "Success"
      });
    })
    .catch(err => {
      res.json({
        data: null,
        status: "Internal server error",
        errorMessage: err
      });
      console.log(err, "ada Error");
    });
};
