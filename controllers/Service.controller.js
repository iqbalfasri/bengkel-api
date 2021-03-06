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

// View All Service
exports.all = (req, res) => {
  service
    .find()
    .populate("kendaraan")
    .populate("montir", "nama_montir alamat_montir jenis_kelamin_montir")
    .then(serv => {
      res.send(200, {
        data: serv,
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

  service
    .findOne({ _id: _id })
    .populate("kendaraan")
    .populate("montir", "nama_montir alamat_montir jenis_kelamin_montir")
    .then(serv => {
      if (serv === null) {
        return res.send(404, {
          message: "Service tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.send(200, {
        data: serv,
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

// Create / Add new Service
exports.create = (req, res) => {
  const { tanggal_service, id_kendaraan, id_montir } = req.body;
  const create_service = new service({
    tanggal_service: tanggal_service,
    kendaraan: id_kendaraan,
    montir: id_montir
  });

  create_service
    .save()
    .then(serv => {
      res.send(201, {
        data: serv,
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

// Update Service
exports.update = (req, res) => {
  const { _id } = req.params;
  const { tanggal_service, id_kendaraan, id_montir } = req.body;

  let updateData = {};

  if (tanggal_service) {
    updateData.tanggal_service = tanggal_service;
  }
  if (id_kendaraan) {
    updateData.kendaraan = id_kendaraan;
  }
  if (id_montir) {
    updateData.montir = id_montir;
  }

  service
    .findOneAndUpdate({ _id: _id }, updateData)
    .then(serv => {
      if (serv === null) {
        return res.send(404, {
          message: "Service tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.send(201, {
        message: "Update berhasil",
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

// Delete / Remove Service
exports.remove = (req, res) => {
  const { _id } = req.params;

  service
    .findOneAndDelete({ _id: _id })
    .then(() => {
      res.send(200, {
        message: "Delete berhasil",
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
