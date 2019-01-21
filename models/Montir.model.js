const mongoose = require("mongoose");

const MontirSchema = mongoose.Schema({
  nama_montir: {
    type: String,
    required: true
  },
  alamat_montir: {
    type: String,
    required: true
  },
  jenis_kelamin_montir: {
    type: String,
    enum: ['P', 'L'],
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Montir", MontirSchema);