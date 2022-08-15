const Pekerjaan = require("./model");

module.exports = {
  index: async (req, res) => {
    const data = await Pekerjaan.find();
    try {
      res.render("admin/pekerjaan/view_pekerjaan", {
        data,
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
      // req.flash("alertMessage", `${err.message}`);
      // req.flash("alertStatus", "danger");
      // res.redirect("/category");
      console.log(err);
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { pekerjaan, deskripsiPekerjaan } = req.body;

      let data = await Pekerjaan({ pekerjaan, deskripsiPekerjaan });
      await data.save();

      // req.flash("alertMessage", "Berhasil tambah kategori");
      // req.flash("alertStatus", "success");
      res.redirect("/pekerjaan");
    } catch (err) {
      // req.flash("alertMessage", `${err.message}`);
      // req.flash("alertStatus", "danger");
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
      // req.flash("alertMessage", `${err.message}`);
      // req.flash("alertStatus", "danger");
      // res.redirect("/category");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { pekerjaan, deskripsiPekerjaan } = req.body;

      await Pekerjaan.findOneAndUpdate(
        {
          _id: id,
        },
        { pekerjaan, deskripsiPekerjaan }
      );

      // req.flash("alertMessage", "Berhasil ubah kategori");
      // req.flash("alertStatus", "success");
      res.redirect("/pekerjaan");
    } catch (err) {
      // req.flash("alertMessage", `${err.message}`);
      // req.flash("alertStatus", "danger");
      res.redirect("/pekerjaan");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Pekerjaan.findOneAndRemove({
        _id: id,
      });

      // req.flash("alertMessage", "Berhasil hapus kategori");
      // req.flash("alertStatus", "success");

      res.redirect("/pekerjaan");
    } catch (err) {
      // req.flash("alertMessage", `${err.message}`);
      // req.flash("alertStatus", "danger");
      res.redirect("/pekerjaan");
    }
  },
};
