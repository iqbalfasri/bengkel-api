const servdetail = require("../models/ServiceDetail.model");
const { code_response } = require("../utils");

// Index Route
exports.index = (req, res) => {
  res.send(200, {
    list_endpoints: ["/all", "/detail/:_id"]
  });
};

// All Service Detail
exports.all = (req, res) => {
  servdetail
    .find()
    .then(servd => {
      res.send(200, {
        data: servd,
        message: "Success",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      res.send(500, {
        message: "Internal server error",
        code: code_response.CODE_SERVER_ERROR
      });
    });
};

// Detail Service
exports.detail = (req, res) => {
  const { _id } = req.params;

  servdetail
    .findOne({ _id: _id })
    .populate("service barang_jasa")
    .then(servd => {
      if (servd === null) {
        return res.send(404, {
          message: "Service tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.send(200, {
        data: servd,
        message: "Success",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.send(404, {
          message: "Service tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.send(500, {
        message: "Internal server error",
        code: code_response.CODE_SERVER_ERROR
      });
    });
};
