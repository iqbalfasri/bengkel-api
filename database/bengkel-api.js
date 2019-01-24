const mongoose = require("mongoose");

// Connect To Database
exports.connect = () => {
  mongoose.Promise = global.Promise;
  mongoose.set("useCreateIndex", true);
  mongoose
    .connect(
      // Bisa di ganti nanti jika sudah dideploy
      `${process.env.MONGO_DB_LOCAL}` || `${process.env.MONGO_DB_LIVE}`,
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("Berhasil konek ke database");
    })
    .catch(() => {
      console.log("Gagal konek ke database");
    });
};
