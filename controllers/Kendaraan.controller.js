const kendaraan = require("../models/Kendaraan.model");
const customer = require("../models/Customer.model");
const { code_response } = require("../utils");

// Index route
exports.index = (req, res) => {
  res.json({
    list_endpoints: ["/all", "/detail/:_id"]
  });
};

// All Kendaraan
exports.all = (req, res) => {
  kendaraan.find().then(kendaraan => {
    res.json({
      data: kendaraan,
      message: "Success",
      code: code_response.CODE_SUCCESS
    });
  });
};

// Detail Kendaraan
exports.detail = (req, res) => {
  const { _id } = req.params;

  kendaraan
    .findOne({ _id: _id })
    .then(ken => {
      if (ken) {
        customer
          .findOne({ _id: ken.customer })
          .then(cust => {
            res.json({
              data: {
                _id: ken._id,
                no_polisi: ken.no_polisi,
                merk: ken.merk,
                warna: ken.warna,
                customer: cust.nama_customer
              }
            });
          })
          .catch(err => {
            res.json({
              err: err
            });
          });
        return;
      }
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.json({
          message: "Kendaraan tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.json({
        message: "Internal server error",
        code: code_response.CODE_SERVER_ERROR
      });
    });
};

// Create / Add new Kendaraa
exports.create = (req, res) => {
  const { no_polisi, merk, warna, id_customer } = req.body;
  const create_kendaraan = new kendaraan({
    no_polisi: no_polisi,
    merk: merk,
    warna: warna,
    customer: id_customer
  });

  create_kendaraan
    .save()
    .then(ken => {
      if (ken) {
        customer
          .findOne({ _id: id_customer })
          .populate("customer")
          .exec()
          .then(cust => {
            res.json({
              data: {
                _id: ken._id,
                no_polisi: ken.no_polisi,
                merk: ken.merk,
                warna: ken.warna,
                customer: cust.nama_customer
              },
              message: "Success",
              code: code_response.CODE_SUCCESS
            });
          })
          .catch(err => {
            res.json({
              message: "Customer tidak ditemukan",
              code: code_response.CODE_NOT_FOUND
            });
          });
        return;
      }
    })
    .catch(err => {
      if (err.errors.customer) {
        return res.json({
          message: "ID Customer tidak valid",
          code: code_response.CODE_BAD_REQUEST
        });
      }

      res.json({
        message: "Internal server error",
        code: code_response.CODE_SERVER_ERROR
      });
    });
};
