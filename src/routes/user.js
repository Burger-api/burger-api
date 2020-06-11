import { Router } from 'express';
import * as users from '../models/users'
const router = Router();
export default router;

router.post('/user/create', async (req, res) => {
  const { first_name, last_name, birthdate } = req.body || {}
  
  const result = await users.model.create({
    first_name,
    last_name,
    birthdate: new Date(birthdate),
  })

  res.send({
    status: 'success',
    result,
  })

});

router.post('/user/create_todolist', async (req, res) => {
  console.log(req.body)
})

router.post('/user/add_action', async (req, res) => {
  console.log(req.body)
})
