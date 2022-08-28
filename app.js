var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
var cors = require("cors");

var dashboardRouter = require("./app/dashboard/router");
var pekerjaanRouter = require("./app/pekerjaan/router");
var usersRouter = require("./app/users/router");
var kandidatRouter = require("./app/kandidat/router");
var usersRouter = require("./app/users/router");

// api
var apiPekerjaanRouter = require("./app/api/pekerjaan/router");
var apiKandidatRouter = require("./app/api/kandidat/router");
var apiUsersRouter = require("./app/api/users/router");

const app = express();
const URL = `/api/v1`;
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);
app.use(flash());
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/adminlte", express.static(path.join(__dirname, "/node_modules/admin-lte/")));

// routers
// app.use("/", usersRouter);
// app.use("/dashboard", dashboardRouter);
// app.use("/pekerjaan", pekerjaanRouter);
// app.use("/kandidat", kandidatRouter);
app.use("/users", usersRouter);

// api
app.use(`${URL}/pekerjaan`, apiPekerjaanRouter);
app.use(`${URL}/kandidat`, apiKandidatRouter);
app.use(`${URL}/users`, apiUsersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;