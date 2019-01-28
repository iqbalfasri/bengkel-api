const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema(
  {
    tanggal_service: {
      type: Date,
      required: true
    },
    // Relations
    kendaraan: {
      type: mongoose.Types.ObjectId,
      ref: "Kendaraan",
      required: true
    },
    montir: {
      type: mongoose.Types.ObjectId,
      // type: String,
      ref: "Montir",
      required: true
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("Service", ServiceSchema);
