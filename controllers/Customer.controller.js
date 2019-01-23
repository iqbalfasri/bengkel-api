const customer = require("../models/Customer.model");
const { code_response } = require("../utils");

// Index route
exports.index = (req, res) => {
  res.json({
    list_endpoints: ["/all", "/detail/:_id"]
  });
};

// View All Customer
exports.all = (req, res) => {
  customer
    .find()
    .then(cust => {
      res.json({
        data: cust,
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

// Detail Customer
exports.detail = (req, res) => {
  const { _id } = req.params;

  customer
    .findOne({ _id: _id })
    .then(cust => {
      // Cek jika customer sudah dihapus atau tidak ada dalam database
      if (cust === null) {
        return res.json({
          message: "Customer tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.json({
        data: cust,
        message: "Succes",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      // Cek jika id tidak sesuai
      if (err.kind === "ObjectId") {
        return res.json({
          message: "Customer tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.json({
        message: "Internal server error",
        code: code_response.CODE_SERVER_ERROR,
        err: err
      });
    });
};

// Create / Add new Customer
exports.create = (req, res) => {
  const { nama_customer, alamat_customer, jenis_kelamin_customer } = req.body;

  const createCustomer = new customer({
    nama_customer: nama_customer,
    alamat_customer: alamat_customer,
    jenis_kelamin_customer: jenis_kelamin_customer // only P / L
  });

  createCustomer
    .save()
    .then(cust => {
      res.json({
        data: cust,
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

// Update data Customer
exports.update = (req, res) => {
  const { _id } = req.params;
  const {
    nama_customer: nama_customer,
    alamat_customer: alamat_customer,
    jenis_kelamin_customer: jenis_kelamin_customer // only P / L
  } = req.body;

  let updateData = {};

  if (nama_customer) {
    updateData.nama_customer = nama_customer;
  }
  if (alamat_customer) {
    updateData.alamat_customer = alamat_customer;
  }
  if (jenis_kelamin_customer) {
    updateData.jenis_kelamin_customer = jenis_kelamin_customer;
  }

  customer
    .findOneAndUpdate({ _id: _id }, updateData)
    .then(cust => {
      // Cek jika customer sudah dihapus atau tidak ada dalam database
      if (cust === null) {
        return res.json({
          message: "Customer tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }
      res.json({
        message: "Update berhasil",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      // Cek jika id tidak sesuai
      if (err.kind === "ObjectId") {
        return res.json({
          message: "Customer tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.json({
        message: "Internal server error",
        code: code_response.CODE_SERVER_ERROR
      });
    });
};

// Delete / Remove data Customer
exports.remove = (req, res) => {
  const { _id } = req.params;

  customer
    .findOneAndDelete({ _id: _id })
    .then(() => {
      res.json({
        message: "Delete berhasil",
        code: code_response.CODE_SUCCESS
      });
    })
    .catch(err => {
      // Cek jika id tidak sesuai
      if (err.kind === "ObjectId") {
        return res.json({
          message: "Customer tidak ditemukan",
          code: code_response.CODE_NOT_FOUND
        });
      }

      res.json({
        message: "Internal server error",
        code: code_response.CODE_SERVER_ERROR
      });
    });
};
