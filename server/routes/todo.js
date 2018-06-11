const express = require('express');
const db = require('../models');
const isAuthenticated = require('../lib/authenticate');
const User = db.User;
const ToDo = db.ToDo;
const ToDoStatus = db.ToDoStatus;
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
  .then(toDo => {
    console.log('list of toDos');
    return res.json(toDo);
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
    description: details.description,
    is_done: details.is_done,
    user_id: details.user_id
  })
  .then(toDo => {
    return toDo.reload({
      include: [
        { model: ToDoStatus, as: 'Status' },
        { model: User, as: 'Creator' }
      ]
    })
    res.json(toDo);
  })
  .then(toDo => {
    return res.json(toDo);
  });
});


//edit ToDo status
router.route('/:id', (req, res) => {
  console.log(req.body, "ToDo status change");
  return ToDo.findOne({
    where : { id : req.body.id }
  })
  .then(toDo => {
    if(!toDo){
    return console.log("error");
    }else{
        toDo.update({
        status : req.body.status
        })
        .then(newToDo => {
        console.log('status changed');
        return res.json({
          success : true
        });
      })
      .catch((err) => {
        console.log("error", err);
        return res.json({
          error : 'Oh no! Something went wrong!'
        });
      });
    }
  });
});

module.exports = router;