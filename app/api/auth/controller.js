const user = require("../../users/model");
const bcrypt = require("bcryptjs");

const path = require("path");
const fs = require("fs");
const config = require("../../../config");
const jwt = require("jsonwebtoken");


module.exports = {
  login: async (req, res, next) => {
    const { username, password } = req.body;
    user.findOne({ username: username })
      .then((user) => {
        if (user) {
          const checkPassword = bcrypt.compareSync(password, user.password);
          if (checkPassword) {
            const token = jwt.sign(
              {
                user: {
                  id: user.id,
                  username: user.username,
                  nama: user.nama,
                  image: user.image,
                  role: user.role,
                },
              },
              config.jwtKey
            );
            res.status(200).json({
              msg: 'login success',
              token, user: user,
            });
          } else {
            res.status(403).json({
              message: "password yang anda masukan salah.",
              data: user
            });
          }
        } else {
          res.status(403).json({
            message: "username yang anda masukan belum terdaftar.",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          msg: 'login failed',
          message: err.message || `Internal server error`,
        });
        next();
      });
  },
}
