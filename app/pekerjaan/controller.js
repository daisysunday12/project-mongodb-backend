const Pekerjaan = require("./model");
// file
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  index: async (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    const data = await Pekerjaan.find();
    try {
      res.render("admin/pekerjaan/view_pekerjaan", {
        nama: req.session.user.name,
        data,
        alert,
        title: "Halaman Pekerjaan",
      });
    } catch {
      console.log(err);
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/pekerjaan/create", {
        // name: req.session.user.name,
        title: "Halaman tambah Pekerjaan",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      console.log(err);
    }
  },

  // actionCreate: async (req, res) => {
  //   try {
  //     const { pekerjaan, deskripsiPekerjaan } = req.body;

  //     let data = await Pekerjaan({ pekerjaan, deskripsiPekerjaan });
  //     await data.save();

  //     req.flash("alertMessage", "Berhasil tambah Pekerjaan");
  //     req.flash("alertStatus", "success");
  //     res.redirect("/pekerjaan");
  //   } catch (err) {
  //     req.flash("alertMessage", `${err.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/pekerjaan");
  //   }
  // },

  actionCreate: async (req, res) => {
    try {
      const { pekerjaan, deskripsiPekerjaan } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originaExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/banner-pekerjaan/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const data = new Pekerjaan({
              pekerjaan,
              deskripsiPekerjaan,
              thumbnial: filename,
            });

            await data.save();

            req.flash("alertMessage", "Berhasil tambah pekerjaan");
            req.flash("alertStatus", "success");

            res.redirect("/pekerjaan");
          } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/pekerjaan");
          }
        });
      } else {
        const data = new Pekerjaan({
          pekerjaan,
          deskripsiPekerjaan,
        });

        await data.save();

        req.flash("alertMessage", "Berhasil tambah pekerjaan");
        req.flash("alertStatus", "success");

        res.redirect("/pekerjaan");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/pekerjaan");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Pekerjaan.findOne({ _id: id });

      res.render("admin/pekerjaan/edit", {
        data,
        // name: req.session.user.name,
        title: "Halaman ubah pekerjaan",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  // actionEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { pekerjaan, deskripsiPekerjaan } = req.body;

  //     await Pekerjaan.findOneAndUpdate(
  //       {
  //         _id: id,
  //       },
  //       { pekerjaan, deskripsiPekerjaan }
  //     );

  //     req.flash("alertMessage", "Berhasil ubah Pekerjaan");
  //     req.flash("alertStatus", "success");
  //     res.redirect("/pekerjaan");
  //   } catch (err) {
  //     req.flash("alertMessage", `${err.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/pekerjaan");
  //   }
  // },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { pekerjaan, deskripsiPekerjaan } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originaExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/banner-pekerjaan/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const data = await Pekerjaan.findOne({ _id: id });

            let currentImage = `${config.rootPath}/public/uploads/banner-pekerjaan/${data.thumbnial}`;
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

            req.flash("alertMessage", "Berhasil ubah Pekerjaan");
            req.flash("alertStatus", "success");

            res.redirect("/pekerjaan");
          } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/pekerjaan");
          }
        });
      } else {
        await Pekerjaan.findOneAndUpdate(
          {
            _id: id,
          },
          {
            pekerjaan,
            deskripsiPekerjaan,
          }
        );

        req.flash("alertMessage", "Berhasil ubah Pekerjaan");
        req.flash("alertStatus", "success");

        res.redirect("/pekerjaan");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/pekerjaan");
    }
  },

  //   actionDelete: async (req, res) => {
  //     try {
  //       const { id } = req.params;

  //       await Pekerjaan.findOneAndRemove({
  //         _id: id,
  //       });

  //       req.flash("alertMessage", "Berhasil hapus Pekerjaan");
  //       req.flash("alertStatus", "success");

  //       res.redirect("/pekerjaan");
  //     } catch (err) {
  //       req.flash("alertMessage", `${err.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/pekerjaan");
  //     }
  //   },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Pekerjaan.findOneAndRemove({
        _id: id,
      });

      let currentImage = `${config.rootPath}/public/uploads/banner-pekerjaan/${data.thumbnial}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      req.flash("alertMessage", "Berhasil hapus voucher");
      req.flash("alertStatus", "success");

      res.redirect("/pekerjaan");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/pekerjaan");
    }
  },

  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      let data = await Pekerjaan.findOne({ _id: id });

      let status = data.status === "Y" ? "N" : "Y";

      data = await Pekerjaan.findOneAndUpdate(
        {
          _id: id,
        },
        { status }
      );

      req.flash("alertMessage", "Berhasil ubah status");
      req.flash("alertStatus", "success");

      res.redirect("/pekerjaan");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/pekerjaan");
    }
  },
};
