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
    thumbnial: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pekerjaan", pekerjaanSchema);
