const User = require("./model");
const bcrypt = require("bcryptjs");

const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user === null || req.session.user === undefined) {
        res.render("admin/users/view_signin", {
          alert,
          title: "Halaman signin",
        });
      } else {
        res.redirect("/dashboard");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  actionSignin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const check = await User.findOne({ username: username });
      if (check) {
        if (check.status === "Y") {
          const checkPassword = await bcrypt.compare(password, check.password);
          if (checkPassword) {
            req.session.user = {
              id: check._id,
              username: check.username,
              status: check.status,
              name: check.name,
            };
            res.redirect("/dashboard");
          } else {
            req.flash("alertMessage", `Kata sandi yang anda inputkan salah`);
            req.flash("alertStatus", "danger");
            res.redirect("/");
          }
        } else {
          req.flash("alertMessage", `Mohon maaf status anda belum aktif`);
          req.flash("alertStatus", "danger");
          res.redirect("/");
        }
      } else {
        req.flash("alertMessage", `Email yang anda inputkan salah`);
        req.flash("alertStatus", "danger");
        res.redirect("/");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  index: async (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    const data = await User.find();
    try {
      res.render("admin/users/view_users", {
        nama: req.session.user.name,
        data,
        alert,
        title: "Halaman Users",
      });
    } catch {
      console.log(err);
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/users/create", {
        nama: req.session.user.name,
        title: "Halaman tambah Pekerjaan",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/pekerjaan");
      console.log(err);
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
            const data = new User({ ...payload, password: hashPassword, image: filename });
            await data.save();
            // delete data._doc.password;
            req.flash("alertMessage", "Berhasil tambah pekerjaan");
            req.flash("alertStatus", "success");
            res.redirect("/users");
          } catch (err) {
            if (err && err.name === "ValidationError") {
              req.flash("alertMessage", `${err.message}`);
              req.flash("alertStatus", "danger");
              res.redirect("/users");
            }
            next(err);
          }
        });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        let data = new User({ ...payload, password: hashPassword });
        await data.save();
        // delete data._doc.password;
        req.flash("alertMessage", "Berhasil tambah pekerjaan");
        req.flash("alertStatus", "success");
        res.redirect("/users");
      }
    } catch (err) {
      if (err && err.name === "ValidationError") {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/users");
      }
      next(err);
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await User.findOneAndRemove({
        _id: id,
      });
      let currentImage = `${config.rootPath}/public/uploads/users/${data.image}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }
      req.flash("alertMessage", "Berhasil hapus voucher");
      req.flash("alertStatus", "success");
      res.redirect("/users");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/users");
    }
  },
  actionLogout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};
