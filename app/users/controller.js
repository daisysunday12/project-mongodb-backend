const Pekerjaan = require("./model");

module.exports = {
  viewSignin: async (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    try {
      res.render("admin/users/view_signin", {
        alert,
        title: "Halaman Pekerjaan",
      });
    } catch {
      console.log(err);
    }
  },
};
