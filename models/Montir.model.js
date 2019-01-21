const mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  saltRounds = 10;

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
    enum: ["P", "L"],
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

MontirSchema.pre("save", function(next) {
  // Use Async / Await
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

module.exports = mongoose.model("Montir", MontirSchema);
