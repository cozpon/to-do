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
  return ToDo.findAll({
    where : { deletedAt : null },
    include : [
      { model: User, as: 'Creator' },
      { model: ToDoStatus, as: 'Status' }
    ],
    order : [[ 'is_done', 'ASC' ]]
  })
  .then(toDo => {
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
router.route('/:id')
.put((req, res) => {
  return ToDo.findOne({
    where : { id: req.body.id }
  })
  .then(toDo => {
    if(!toDo){
    return console.log("error");
    } else {
      toDo.update({
          is_done : req.body.is_done
        })
        .then(newToDo => {
          return newToDo.reload({
            include: [{ model: ToDoStatus, as: 'Status' }]
          })
        res.json(newToDo);
      })
      .then(newToDo => {
        return res.json(newToDo);
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

// router.route('/delete/:id')
// .put((req, res) => {
//   return ToDo.findOne({
//     where : { id: req.params.id }
//   })
//   .then(item => {
//     item.update({
//       deletedAt : Date.now()
//     })
//     .then(item => {
//       return item.reload({
//             include: [{ model: ToDoStatus, as: 'Status' }]
//           })
//       res.json(item);
//     })
//     .then(item => {
//       return res.json(item);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   });
// });

router.route('/:id')
.delete((req, res) => {
  let id = req.params.id;
  return ToDo.findById(id)
  .then(item => {
    return item.update({deletedAt : Date.now()}, {
      returning: true,
      plain: true
    })
    .then(item => {
      return res.json(item);
    });
  })
  .catch((err) => {
    console.log(err);
  });
});


module.exports = router;