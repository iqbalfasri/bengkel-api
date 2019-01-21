const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema({
  tanggal_service: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Service", ServiceSchema);
