const mongoose = require("mongoose");

// Connect To Database
exports.connect = () => {
  mongoose.Promise = global.Promise;
  mongoose.set("useCreateIndex", true);
  mongoose
    .connect(
      // Bisa di ganti nanti jika sudah dideploy
      `mongodb://iqbalfasri:nabilah48@ds024548.mlab.com:24548/bengkel-api`,
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("Berhasil konek ke database");
    })
    .catch(() => {
      console.log("Gagal konek ke database");
    });
};
