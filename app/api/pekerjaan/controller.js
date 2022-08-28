const Pekerjaan = require("../../pekerjaan/model");
const path = require("path");
const fs = require("fs");
const config = require("../../../config");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const apiData = await Pekerjaan.find({status : 'Y'}).select("_id pekerjaan thumbnial");
      // res.status(200).json({ total: apiData.length, data: apiData });
      res.status(200).json(apiData);
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const apiDetails = await Pekerjaan.findOne({ _id: id });
      // res.status(200).json({ total: apiDetails.length, data: apiDetails });
      res.status(200).json(apiDetails);
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { pekerjaan, deskripsiPekerjaan } = req.body;
      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
        let filename = req.file.filename + "." + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/banner-pekerjaan/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            const apiData = new Pekerjaan({
              pekerjaan,
              deskripsiPekerjaan,
              thumbnial: filename,
            });
            await apiData.save();
            res.status(200).json({ msg: "success", data: apiData });
          } catch (err) {
            res.status(500).json({ message: err.message || `Internal server error` });
          }
        });
      } else {
        const apiData = new Pekerjaan({
          pekerjaan,
          deskripsiPekerjaan,
        });
        await apiData.save();
        res.status(200).json({ msg: "success", data: apiData });
      }
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { pekerjaan, deskripsiPekerjaan } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
        let filename = req.file.filename + "." + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/banner-pekerjaan/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            const apiData = await Pekerjaan.findOne({ _id: id });

            let currentImage = `${config.rootPath}/public/uploads/banner-pekerjaan/${apiData.thumbnial}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }
            await Pekerjaan.findOneAndUpdate(
              {
                _id: id,
              },
              {
                pekerjaan,
                deskripsiPekerjaan,
                thumbnial: filename,
              }
            );
            res.status(200).json({ msg: "success", data: apiData });
          } catch (err) {
            res.status(500).json({ message: err.message || `Internal server error` });
          }
        });
      } else {
        const apiData = await Pekerjaan.findOneAndUpdate(
          {
            _id: id,
          },
          {
            pekerjaan,
            deskripsiPekerjaan,
          }
        );
        res.status(200).json({ msg: "success", data: apiData });
      }
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const apiData = await Pekerjaan.findOneAndRemove({
        _id: id,
      });
      let currentFile = `${config.rootPath}/public/uploads/banner-pekerjaan/${apiData.file}`;
      if (fs.existsSync(currentFile)) {
        fs.unlinkSync(currentFile);
      }
      res.status(200).json({ message: "Data Berhasil Dihapus" });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
  uploadFile: async (req, res) => {
    try {
      const { id } = req.params;

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
        let filename = req.file.filename + "." + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/banner-pekerjaan/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            const apiData = await Pekerjaan.findOne({ _id: id });

            let currentImage = `${config.rootPath}/public/uploads/banner-pekerjaan/${apiData.thumbnial}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }
            await Pekerjaan.findOneAndUpdate(
              {
                _id: id,
              },
              {
                thumbnial: filename,
              }
            );
            // res.status(200).json({ msg: "success", data: apiData });
            res.status(200).json({ msg: "success", data: apiData });
          } catch (err) {
            res.status(500).json({ message: err.message || `Internal server error` });
          }
        });
      } else {
        res.status(406).json({ message: err.message || `Internal server error` });  
      }
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
