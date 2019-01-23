const customer = require("../models/Customer.model");

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
        message: "Success"
      });
    })
    .catch(err => {
      res.json({
        message: "Internal server error"
      });
    });
};

// Detail Customer
exports.detail = (req, res) => {
  const { _id } = req.params;

  customer
    .findById(_id)
    .then(cust => {
      if (cust === null) {
        return res.json({
          message: "Customer tidak ditemukan"
        });
      }
      return res.json({
        data: cust,
        message: "Succes"
      });
    })
    .catch(err => {
      res.json({
        message: "Internal server error"
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
        message: "Success"
      });
    })
    .catch(err => {
      res.json({
        message: "Internal server error"
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
      if (cust === null) {
        return res.json({
          message: "Customer tidak ada"
        });
      }
      return res.json({
        message: "Update berhasil"
      });
    })
    .catch(err => {
      res.json({
        message: "Internal server error"
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
        message: "Delete berhasil"
      });
    })
    .catch(err => {
      res.json({
        message: "Internal server error"
      });
    });
};
