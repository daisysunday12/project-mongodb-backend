const mongoose = require("mongoose");

let pekerjaanSchema = mongoose.Schema(
  {
    pekerjaan: {
      type: String,
      require: [true, "Pekerjaan harus di isi"],
    },
    deskripsiPekerjaan: {
      type: String,
      require: [true, "Deskripsi Pekerjaan harus di isi"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pekerjaan", pekerjaanSchema);
