const mongoose = require("mongoose");

let kandidatSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      require: [true, "nama harus diisi"],
      maxlength: [225, "panjang nama harus antara 3 - 225 karakter"],
      minlength: [3, "panjang nama harus antara 3 - 225 karakter"],
    },
    email: {
      type: String,
      require: [true, "email harus diisi"],
    },
    jk: {
      type: String,
      enum: ["L", "P"],
    },
    tempat: {
      type: String,
      require: [true, "tempat lahir Harus Di Isi"],
      maxlength: [50, "panjang nama harus antara 3 - 50 karakter"],
      minlength: [3, "panjang nama harus antara 3 - 50 karakter"],
    },
    tanggallahir: {
      type: Date,
      require: [true, "tanggal lahir Harus Di Isi"],
    },
    alamat: {
      type: String,
      require: [true, "Deskripsi Alamat Harus Di Isi"],
      maxlength: [100, "panjang alamat harus antara 3 - 100 karakter"],
      minlength: [5, "panjang alamat harus antara 3 - 100 karakter"],
    },
    kab: {
      type: String,
      require: [true, "Deskripsi Kabupaten Harus Di Isi"],
      maxlength: [100, "panjang kabupaten harus antara 3 - 100 karakter"],
      minlength: [5, "panjang kabupaten harus antara 3 - 100 karakter"],
    },
    prov: {
      type: String,
      require: [true, "Deskripsi Provinsi Harus Di Isi"],
      maxlength: [100, "panjang provinsi harus antara 3 - 100 karakter"],
      minlength: [5, "panjang provinsi harus antara 3 - 100 karakter"],
    },
    kewarganegaraan: {
      type: String,
      require: [true, "Deskripsi Kewarganegaraan Harus Di Isi"],
      maxlength: [100, "panjang kewarganegaraan harus antara 3 - 100 karakter"],
      minlength: [5, "panjang kewarganegaraan harus antara 3 - 100 karakter"],
    },
    notelp: {
      type: String,
      require: [true, "Deskripsi No Telp Harus Di Isi"],
      maxlength: [14, "panjang no telp harus antara 3 - 14 karakter"],
      minlength: [5, "panjang no telp harus antara 3 - 14 karakter"],
    },
    pendidikan: {
      type: String,
      require: [true, "Deskripsi Pendidikan Harus Di Isi"],
      maxlength: [14, "panjang pendidikan harus antara 2 - 14 karakter"],
      minlength: [2, "panjang pendidikan harus antara 2 - 14 karakter"],
    },
    jurusan: {
      type: String,
      require: [true, "Deskripsi Jurusan Harus Di Isi"],
      maxlength: [50, "panjang jurusan harus antara 3 - 50 karakter"],
      minlength: [5, "panjang jurusan harus antara 3 - 14 karakter"],
    },
    lokasi: {
      type: String,
      require: [true, "Deskripsi Lokasi Sekarang Harus Di Isi"],
      maxlength: [100, "panjang lokasi sekarang harus antara 5 - 100 karakter"],
      minlength: [5, "panjang lokasi sekarang harus antara 5 - 100 karakter"],
    },
    sumber: {
      type: String,
      require: [true, "Deskripsi Sumber Informasi Harus Di Isi"],
      maxlength: [100, "panjang sumber informasi harus antara 3 - 100 karakter"],
      minlength: [2, "panjang sumber informasi harus antara 2 - 100 karakter"],
    },
    sumberket: {
      type: String,
      maxlength: [100, "panjang lokasi sekarang harus antara 3 - 100 karakter"],
      minlength: [5, "panjang lokasi sekarang harus antara 3 - 100 karakter"],
    },
    salary: {
      type: String,
      maxlength: [100, "panjang lokasi sekarang harus antara 3 - 100 karakter"],
      minlength: [5, "panjang lokasi sekarang harus antara 3 - 100 karakter"],
    },
    file: {
      type: String,
      default: "default.pdf",
    },
    image: {
      type: String,
    },
    pekerjaan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pekerjaan",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Kandidat", kandidatSchema);
