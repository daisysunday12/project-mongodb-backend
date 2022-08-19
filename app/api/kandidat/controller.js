const kandidat = require("../../kandidat/model");

module.exports = {
  index: async (req, res) => {
    try {
      const apiData = await kandidat.find();
      res.status(200).json({ data: apiData });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
