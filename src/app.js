"use strict";
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
//const fs = require("fs");
const helmet = require("helmet");
//const http = require("http");
//const https = require("https");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet.hidePoweredBy({ setTo: "PHP 7.4.3" }));
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.xssFilter({}));
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
let timeInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({ maxAge: timeInSeconds, force: true }));
app.use(helmet.dnsPrefetchControl());
//app.use(helmet.referrerPolicy({ policy: "same-origin" }));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
    },
  })
);

const api = require("./routes/api");

api(app);
app.get("/", (req, res) => {
  res.send("Olá!");
});

app.use(function (req, res, next) {
  res.status(404).type("text").send("Página não encontrada.");
});
/*
  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(
    {
      key: fs.readFileSync("/PATH/TO/PRIVKEY.PEM"),
      cert: fs.readFileSync("/PATH/TO/FULLCHAIN.PEM"),
    },
    app
  );
  
  httpServer.listen(80, () => {
    console.log("Servidor HTTP rodando na porta 80");
  });
  
  httpsServer.listen(443, () => {
    console.log("Servidor HTTPS rodando na porta 443");
  });
*/

module.exports = app;
