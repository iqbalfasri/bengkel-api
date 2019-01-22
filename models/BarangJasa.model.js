const mongoose = require("mongoose");

const BarangJasaSchema = mongoose.Schema({
  nama_barang_jasa: {
    type: String,
    required: true
  },
  harga: {
    type: Number,
    required: true
  },
  stok: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model("BarangJasa", BarangJasaSchema);
