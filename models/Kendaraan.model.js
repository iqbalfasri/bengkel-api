const mongoose = require("mongoose");

const KendaraanSchema = mongoose.Schema({
  no_polisi: {
    type: String,
    required: true
  },
  merk: {
    type: String,
    required: true
  },
  warna: {
    type: String,
    required: true
  },
  // Relations
  customer: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model("Kendaraan", KendaraanSchema);
