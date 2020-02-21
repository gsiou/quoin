const express = require("express");
const app = express();
const config = require('./config');

app.set("view engine", "pug");

app.use("/public", express.static(__dirname + "/public"));

app.get('/oauth', (req, res) => {
  const clientID = req.query.client_id;
  const redirectURI = req.query.redirect_uri;
  const state = req.query.state;
  const scope = req.query.scope;
  const response_type = req.query.response_type;

  console.log(clientID, redirectURI, state, scope, response_type);
  return res.render('login');
});

const server = app.listen(config.port, config.address, () => {
  console.log(
    "Listening on: " + server.address().address + ":" + server.address().port
  );
});