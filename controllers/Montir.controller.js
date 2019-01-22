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

// Detail Montir
exports.detail = (req, res) => {
  const { _id } = req.params;

  montir
    .findById(_id)
    .then(montir => {
      res.json({
        data: montir,
        status: "Success"
      });
    })
    .catch(err => {
      res.json({
        data: null,
        status: err
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

exports.update = (req, res) => {};

exports.remove = (req, res) => {
  const { _id } = req.params;

  montir
    .findByIdAndDelete(_id)
    .then(deleted => {
      res.json({
        status: "Success",
        data: deleted
      });
    })
    .catch(err => {
      res.json({
        status: err
      });
    });
};
