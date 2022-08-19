const mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Username harus diisi"],
    },
    name: {
      type: String,
      require: [true, "Nama harus diisi"],
    },
    password: {
      type: String,
      require: [true, "Kata sandi harus diisi"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    phoneNumber: {
      type: String,
      require: [true, "Nomor telpon harus diisi"],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
