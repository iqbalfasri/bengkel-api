const montir = require("../models/Montir.model");
const { code_response } = require("../utils");

// Index route
exports.index = (req, res) => {
  res.send(200, {
    list_endpoints: ["/all", "/create"]
  });
};

// View All Montir
exports.all = (req, res) => {
  montir
    .find()
    .then(montir => {
      res.send(200, {
        data: montir,
        status: "Success",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      res.send(500, {
        data: null,
        status: "Internal server error",
        code: code_response.CODE_SERVER_ERROR
      });
    });
};

// Detail Montir
exports.detail = (req, res) => {
  const { _id } = req.params;

  montir
    .findById(_id)
    .then(montir => {
      // Cek jika customer sudah dihapus atau tidak ada dalam database
      if (montir === null) {
        return res.send(404, {
          message: "Montir tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.send(200, {
        data: montir,
        status: "Success",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      // Cek jika id tidak sesuai
      if (err.kind === "ObjectId") {
        return res.send(404, {
          message: "Montir tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.send(500, {
        status: "Internal server error",
        code: code_response.CODE_SERVER_ERROR
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
      res.send(201, {
        data: montir,
        status: "Success",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      res.send(500, {
        data: null,
        status: "Internal server error",
        code: code_response.CODE_SERVER_ERROR
      });
    });
};

exports.update = (req, res) => {
  const { _id } = req.params;
  const {
    nama_montir,
    alamat_montir,
    jenis_kelamin_montir,
    password
  } = req.body;

  let updateData = {};

  if (nama_montir) {
    updateData.nama_montir = nama_montir;
  }
  if (alamat_montir) {
    updateData.alamat_montir = alamat_montir;
  }
  if (jenis_kelamin_montir) {
    updateData.jenis_kelamin_montir = jenis_kelamin_montir;
  }
  if (password) {
    updateData.password = password;
  }

  montir
    .findOneAndUpdate({ _id: _id }, updateData)
    .then(data => {
      // Cek jika customer sudah dihapus atau tidak ada dalam database
      if (data === null) {
        return res.send(404, {
          message: "Montir tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.send(200, {
        message: "Update berhasil",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      // Cek jika id tidak sesuai
      if (err.kind === "ObjectId") {
        return res.send(404, {
          message: "Montir tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.send(500, {
        message: "Internal server error",
        code: code_response.CODE_SERVER_ERROR
      });
    });
};

exports.remove = (req, res) => {
  const { _id } = req.params;

  montir
    .findOneAndDelete({ _id: _id })
    .then(deleted => {
      res.send(200, {
        status: "Success",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      // Cek jika id tidak sesuai
      if (err.kind === "ObjectId") {
        return res.send(404, {
          message: "Montir tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.send(500, {
        status: "Internal server error",
        code: code_response.CODE_SERVER_ERROR
      });
    });
};
