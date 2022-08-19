const Kandidat = require("../../kandidat/model");
const Pekerjaan = require("../../pekerjaan/model");

// file
const path = require("path");
const fs = require("fs");
const config = require("../../../config");

module.exports = {
  index: async (req, res) => {
    try {
      const apiData = await Kandidat.find().populate("pekerjaan");
      res.status(200).json({ total: apiData.length, data: apiData });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
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
            const apiData = new Kandidat({
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

            await apiData.save();
            res.status(201).json({ msg: "success", data: apiData });
          } catch (err) {
            return res.status(422).json({
              error: 1,
              message: err.message,
              fields: err.errors,
            });
          }
        });
      } else {
        const apiData = new Kandidat({
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

        await apiData.save();
        res.status(201).json({ msg: "success", data: apiData });
      }
    } catch (err) {
      return res.status(422).json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
        let filename = req.file.filename + "." + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/data-kandidat/file/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            const apiData = await Kandidat.findOne({ _id: id });

            let currentImage = `${config.rootPath}/public/uploads/data-kandidat/file/${apiData.file}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }
            await Kandidat.findOneAndUpdate(
              {
                _id: id,
              },
              {
                file: filename,
              }
            );
            res.status(201).json({ msg: "success", data: apiData });
          } catch (err) {
            return res.status(422).json({
              error: 1,
              message: err.message,
              fields: err.errors,
            });
          }
        });
      } else {
        return res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors,
        });
      }
    } catch (err) {
      return res.status(422).json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const apiData = await Kandidat.findOneAndRemove({
        _id: id,
      });
      let currentFile = `${config.rootPath}/public/uploads/data-kandidat/file/${apiData.file}`;
      if (fs.existsSync(currentFile)) {
        fs.unlinkSync(currentFile);
      }
      let currentImage = `${config.rootPath}/public/uploads/data-kandidat/img/${apiData.image}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }
      res.status(201).json({ msg: "data berhasil dihapus" });
    } catch (err) {
      return res.status(422).json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
  },
};
