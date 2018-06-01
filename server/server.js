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

app.use(compression()); // compress all responses
app.use(express.static(path.join(__dirname, '..', 'public')));
// enabling json body-parser and encoding
app.use(bodyParser.urlencoded({ "extended" : false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(session({
  store: new redis(),
  secret: "keyboard cat",
  resave: false,
  saveInitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

app.listen(PORT, () => {
  db.sequelize.sync({ force: false });
  console.log(`Server listening on port: ${PORT}`);
});