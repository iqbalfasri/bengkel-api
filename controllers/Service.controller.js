const service = require("../models/Service.model"),
  kendaraan = require("../models/Kendaraan.model"),
  montir = require("../models/Montir.model");

const { code_response } = require("../utils");

// Index route
exports.index = (req, res) => {
  res.send(200, {
    list_endpoints: ["/all", "/create"]
  });
};

// View All Montir
exports.all = (req, res) => {
  service.find().then(serv => {
    res.send(200, {
      data: serv,
      message: "Success",
      code: code_response.CODE_SUCCESS
    });
  });
};

// Detail Kendaraan
exports.detail = (req, res) => {};

// Create / Add new Service
exports.create = (req, res) => {
  const { tanggal_service, id_kendaraan, id_montir } = req.body;
  const create_service = new service({
    tanggal_service: tanggal_service,
    kendaraan: id_kendaraan,
    montir: id_montir
  });

};
