const express = require('express');
const db = require('../models');
const isAuthenticated = require('../lib/authenticate');
const User = db.User;
const ToDo = db.ToDo;

const router = express.Router();

//GET ALL
router.route('/')
.get((req, res) => {
  console.log("hello");
  return ToDo.findAll({
    where : { deletedAt : null },
    include : [{model: User, as: 'Creator' }],
    order : [[ 'createdAt', 'DESC' ]]
  })
  .then(todo => {
    console.log('list of todos');
    return res.json(todo);
  })
  .catch(err => {
    console.log(err);
    return res.json(err);
  });
})

// POST A NEW TODO ITEM

.post((req, res) => {
  const details = req.body;
  console.log(details);
  return ToDo.create({
    name: details.name,
    description: details.description,
    is_done: details.is_done,
    user_id: details.user_id
  })
  .then(todo => {
    return todo.reload({
      include: [
        { model: ToDoStatus, as: 'Status' },
        { model: User, as: 'Creator' }
      ]
    })
    res.json(todo);
  })
  .then(todo => {
    return res.json(todo);
  });
});

module.exports = router;