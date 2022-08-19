const Kandidat = require("./model");
const Pekerjaan = require("../pekerjaan/model");

// file
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  index: async (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    const data = await Kandidat.find().populate("pekerjaan");
    try {
      res.render("admin/kandidat/view_kandidat", {
        nama: req.session.user.name,
        data,
        alert,
        title: "Halaman Kandidit",
      });
    } catch {
      console.log(err);
    }
  },
  viewCreate: async (req, res) => {
    const dataPekerjaan = await Pekerjaan.find({ status: "Y" });
    try {
      res.render("admin/kandidat/create", {
        nama: req.session.user.name,
        title: "Halaman tambah kandidat",
        dataPekerjaan,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      console.log(err);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { pekerjaan, nama, tempat, tanggal, alamat, pendidikan, jurusan, sumber, jk, ketsumber, email, kab, prov, kewarganegaraan, notelp, lokasi, salary } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
        let filename = req.file.filename + "." + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/data-kandidat/img/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            const data = new Kandidat({
              pekerjaan,
              nama,
              email,
              lokasi,
              jurusan,
              tempat,
              tanggallahir: tanggal,
              alamat,
              pendidikan,
              jk,
              salary,
              sumberket: ketsumber,
              sumber,
              notelp,
              kewarganegaraan,
              prov,
              kab,
              image: filename,
            });

            await data.save();

            req.flash("alertMessage", "Berhasil tambah pekerjaan");
            req.flash("alertStatus", "success");

            res.redirect("/kandidat");
          } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/kandidat");
          }
        });
      } else {
        const data = new Kandidat({
          pekerjaan,
          nama,
          email,
          lokasi,
          jurusan,
          tempat,
          tanggallahir: tanggal,
          alamat,
          pendidikan,
          jk,
          salary,
          sumberket: ketsumber,
          sumber,
          notelp,
          kewarganegaraan,
          prov,
          kab,
        });

        await data.save();

        req.flash("alertMessage", "Berhasil tambah pekerjaan");
        req.flash("alertStatus", "success");

        res.redirect("/kandidat");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/kandidat");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Kandidat.findOneAndRemove({
        _id: id,
      });
      let currentFile = `${config.rootPath}/public/uploads/data-kandidat/file/${data.file}`;
      if (fs.existsSync(currentFile)) {
        fs.unlinkSync(currentFile);
      }
      let currentImage = `${config.rootPath}/public/uploads/data-kandidat/img/${data.image}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }
      req.flash("alertMessage", "Berhasil hapus voucher");
      req.flash("alertStatus", "success");
      res.redirect("/kandidat");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/kandidat");
    }
  },
};
