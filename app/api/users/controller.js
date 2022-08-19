const User = require("../../users/model");
const bcrypt = require("bcryptjs");

const path = require("path");
const fs = require("fs");
const config = require("../../../config");

module.exports = {
  users: async (req, res) => {
    try {
      const apiData = await User.find();
      res.status(200).json({ total: apiData.length, data: apiData });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
  actionCreate: async (req, res, next) => {
    try {
      const { password } = req.body;
      const payload = req.body;
      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
        let filename = req.file.filename + "." + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/users/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            const hashPassword = await bcrypt.hash(password, 10);
            const apiData = new User({ ...payload, password: hashPassword, image: filename });
            await apiData.save();
            res.status(201).json({ msg: "success", data: apiData });
          } catch (err) {
            if (err && err.name === "ValidationError") {
              return res.status(422).json({
                error: 1,
                message: err.message,
                fields: err.errors,
              });
            }
            next(err);
          }
        });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        let apiData = new User({ ...payload, password: hashPassword });
        await apiData.save();

        res.status(201).json({ msg: "success", data: apiData });
      }
    } catch (err) {
      if (err && err.name === "ValidationError") {
        return res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors,
        });
      }
      next(err);
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const apiData = await User.findOneAndRemove({
        _id: id,
      });
      let currentImage = `${config.rootPath}/public/uploads/users/${apiData.image}`;
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
