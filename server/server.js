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

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(compression()); // compress all responses
app.use(express.static(path.join(__dirname, '..', 'public')));
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

app.use('*', (request, response) => {
  response.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  db.sequelize.sync({ force: false });
  console.log(`Server listening on port: ${PORT}`);
});