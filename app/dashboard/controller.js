module.exports = {
  index: async (req, res) => {
    try {
      res.render("index");
    } catch {
      console.log(err);
    }
  },
};
