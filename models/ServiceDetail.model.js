const mongoose = require("mongoose");

const ServiceDetailSchema = mongoose.Schema({
  jumlah: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("ServiceDetail", ServiceDetailSchema);
