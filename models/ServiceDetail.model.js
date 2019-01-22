const mongoose = require("mongoose");

const ServiceDetailSchema = mongoose.Schema({
  jumlah: {
    type: Number,
    required: true
  },
  // Relations
  service: {
    type: mongoose.Types.ObjectId,
    ref: "Service",
    required: true
  },
  barang_jasa: {
    type: mongoose.Types.ObjectId,
    ref: "BarangJasa",
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model("ServiceDetail", ServiceDetailSchema);
