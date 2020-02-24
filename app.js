const express = require("express");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

const app = express();
const config = require('./config');

app.use(
  session({
    secret: config.appSecret,
    resave: true,
    saveUninitialized: false,
    store: new MemoryStore({
      checkPeriod: 8640000
    })
  })
);


app.set("view engine", "pug");

app.use("/public", express.static(__dirname + "/public"));

app.post('/code', (req, res) => {
  return res.sendStatus(200);
})

app.get('/oauth', (req, res) => {
  const clientID = req.query.client_id;
  const redirectURI = req.query.redirect_uri;
  const state = req.query.state;
  const scope = req.query.scope;
  const response_type = req.query.response_type;

  req.session.oauthData = {
    clientID, redirectURI, state, scope, response_type
  };

  console.log(clientID, redirectURI, state, scope, response_type);
  return res.render('login');
});

app.post('/login', (req, res) => {
  return res.render('auth', { oauthData: req.session.oauthData });
});

const server = app.listen(config.port, config.address, () => {
  console.log(
    "Listening on: " + server.address().address + ":" + server.address().port
  );
});