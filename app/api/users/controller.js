const apiUsers = require("./model");
const Users = require("../../users/model");

module.exports = {
  users: async (req, res) => {
    try {
      const apiData = await Users.find();
      res.status(200).json({ data: apiData });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
