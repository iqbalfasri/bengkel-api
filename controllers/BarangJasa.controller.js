const barangJasa = require("../models/BarangJasa.model");
const { code_response } = require("../utils");

// Index route
exports.index = (req, res) => {
  res.send(200, {
    list_endpoints: ["/all", "/detail/:_id"]
  });
};

// View All Barang Jasa
exports.all = (req, res) => {
  barangJasa
    .find()
    .then(brg => {
      res.send(200, {
        data: brg,
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

// Detail Barang Jasa
exports.detail = (req, res) => {
  const { _id } = req.params;

  barangJasa
    .findOne({ _id: _id })
    .then(brg => {
      // Jika data tidak ada atau null
      if (brg === null) {
        res.send(404, {
          message: "Barang Jasa tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.send(200, {
        data: brg,
        message: "Success",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      // Cek jika id tidak sesuai
      if (err.kind === "ObjectId") {
        return res.send(404, {
          message: "Barang Jasa tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.send(500, {
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
      res.send(201, {
        data: brg,
        message: "Success",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      res.send(500, {
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
        return res.send(404, {
          message: "Barang Jasa tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.send(200, {
        message: "Update berhasil",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.send(404, {
          message: "Barang Jasa tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.send(500, {
        message: "Internal server error",
        code: code_response.CODE_SERVER_ERROR
      });
    });
};

// Delete / Remove Barang Jasa
exports.remove = (req, res, next) => {
  const { _id } = req.params;

  barangJasa
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
          message: "Barang Jasa tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.send(500,  {
        message: "Internal server error",
        code: code_response.CODE_SERVER_ERROR
      });
    });
};
