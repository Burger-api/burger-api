import { Router } from 'express';
import * as users from '../models/users'
import { User } from '../class/user';
const router = Router();
export default router;

router.post('/user/create', async (req, res) => {
  try {
    if (User.isValid(req.body)) {
      const { first_name, last_name, birthdate, email } = req.body || {}

      const result = await users.model.create({
        first_name,
        last_name,
        email,
        birthdate: new Date(birthdate),
      })

      res.send({
        status: 'success',
        result,
      })
    } else {
      console.log("coucou")

      res.send({
        status: 'failure',
        message: "passed data wasn't complete",
      })
    }
  } catch (e) {
    res.send({
      status: "failure",
      message: e,
    })
  }
});

router.post('/user/:id/create_todolist', async (req, res) => {
  const user = await users.model.findById(req.params.id)
  
  const todolist_name = req.body.todolist_name

  user.todolist = {
    name: todolist_name,
    todos: [],
  }

  user.save()

  res.send({
    status: "success",
    result: user.todolist,
  })
})

router.post('/user/:id/add_action', async (req, res) => {
  const user = await users.model.findById(req.params.id)
  const todolist_action = req.body.todolist_action

  user.todolist.todos.push(todolist_action)
  user.save()

  res.send({
    status: "success",
    result: user
  })
})
