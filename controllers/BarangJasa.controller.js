const barangJasa = require("../models/BarangJasa.model");
const { code_response } = require("../utils");

// Index route
exports.index = (req, res) => {
  res.json({
    list_endpoints: ["/all", "/detail/:_id"]
  });
};

// View All Barang Jasa
exports.all = (req, res) => {
  barangJasa
    .find()
    .then(brg => {
      res.json({
        data: brg,
        message: "Success",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      res.json({
        message: "Internal server error",
        code: code_response.CODE_SERVER_ERROR
      });
    });
};

// Detail Barang Jasa
exports.detail = (req, res) => {
  const { _id } = req.params;

  barangJasa
    .findOne({ _id: _id })
    .then(brg => {
      // Jika data tidak ada atau null
      if (brg === null) {
        res.json({
          message: "Barang Jasa tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.json({
        data: brg,
        message: "Success",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      // Cek jika id tidak sesuai
      if (err.kind === "ObjectId") {
        return res.json({
          message: "Barang Jasa tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.json({
        message: "Internal server error",
        code: code_response.CODE_SERVER_ERROR
      });
    });
};

// Create / Add Barang Jasa
exports.create = (req, res) => {
  const { nama_barang_jasa, harga, stok } = req.body;
  const barang_jasa = new barangJasa({
    nama_barang_jasa: nama_barang_jasa,
    harga: harga,
    stok: stok
  });

  barang_jasa
    .save()
    .then(brg => {
      res.json({
        data: brg,
        message: "Success",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      res.json({
        message: "Internal server error"
      });
    });
};

// Update Barang Jasa
exports.update = (req, res) => {
  const { _id } = req.params;
  const { nama_barang_jasa, harga, stok } = req.body;

  let updateData = {};

  if (nama_barang_jasa) {
    updateData.nama_barang_jasa = nama_barang_jasa;
  }
  if (harga) {
    updateData.harga = harga;
  }
  if (stok) {
    updateData.stok = stok;
  }

  barangJasa
    .findOneAndUpdate({ _id: _id }, updateData)
    .then(brg => {
      if (brg === null) {
        return res.json({
          message: "Barang Jasa tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.json({
        message: "Update berhasil",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.json({
          message: "Barang Jasa tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.json({
        message: "Internal server error",
        code: code_response.CODE_SERVER_ERROR
      });
    });
};
