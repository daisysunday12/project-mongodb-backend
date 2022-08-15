const mongoose = require("mongoose");
const { urlDb } = require("../config");

mongoose.connect(urlDb, {
  // useCreateIndex: true,
  // useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
module.exports = db;
