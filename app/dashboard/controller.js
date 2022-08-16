module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", {
        nama: req.session.user.name,
        title: "Halaman Dashboard",
      });
    } catch {
      console.log(err);
    }
  },
};
