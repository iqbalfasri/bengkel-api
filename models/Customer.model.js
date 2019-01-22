const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema(
  {
    nama_customer: {
      type: String,
      required: true
    },
    alamat_customer: {
      type: String,
      required: true
    },
    jenis_kelamin_customer: {
      type: String,
      enum: ["P", "L"],
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("Customer", CustomerSchema);
