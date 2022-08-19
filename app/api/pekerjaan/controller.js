const Pekerjaan = require("../../pekerjaan/model");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const apiData = await Pekerjaan.find().select("_id pekerjaan thumbnail");
      res.status(200).json({ total: apiData.length, data: apiData });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const apiDetails = await Pekerjaan.findOne({ _id: id });
      res.status(200).json({ total: apiDetails.length, data: apiDetails });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { pekerjaan, deskripsiPekerjaan } = req.body;
      const apiData = new Pekerjaan({
        pekerjaan,
        deskripsiPekerjaan,
      });
      await apiData.save();
      res.status(200).json({ message: "Success", data: apiData });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Pekerjaan.findOneAndRemove({
        _id: id,
      });
      res.status(200).json({ message: "Data Berhasil Dihapus" });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
