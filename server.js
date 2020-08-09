const compression = require("compression");
const express = require("express");
const path = require("path");
const config = require("./src/environments/environment");

const app = express();

app.use(compression());

if (config.environment.production) {
  app.use(forceSSL());
}

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/untapped-app"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/untapped-app/index.html"));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(["https://", req.get("Host"), req.url].join(""));
    }
    next();
  };
};
