const express = require('express');
const auth = require('./auth');
const todo = require('./todo');
const users = require('./users');

const router = express.Router();

router.use('/auth', auth);
router.use('/todo', todo);
router.use('/users', users);

module.exports = router;