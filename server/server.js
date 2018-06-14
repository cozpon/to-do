const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4567;

const compression = require('compression');
const expressValidator = require('express-validator');

const passport = require('passport');
const path = require('path');
const session = require('express-session');
const redis = require('connect-redis')(session);
const authenticatePassport = require('./lib/passport');

const db = require('./models');
const routes = require('./routes');

const app = express();

app.use(function (req, res, next) { // allowing front end to talk to back end
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(compression()); // compress all responses
app.use(express.static(path.join(__dirname, '..', 'src')));
// enabling json body-parser and encoding
app.use(bodyParser.urlencoded({ "extended" : false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(session({
  store: new redis(),
  secret: "rickyrules",
  resave: false,
  saveInitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/api', routes);

app.listen(PORT, () => {
  db.sequelize.sync({ force: true });
  console.log(`Server listening on port: ${PORT}`);
});