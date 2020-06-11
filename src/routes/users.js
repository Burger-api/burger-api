import { Router } from 'express'
const router = Router();
export default router

import * as constants from '../constants'
import guard from '../middlewares/guard'

import { ErrorsGenerator } from '../utils/errors'

import * as users from '../models/users'

router.get('/users/me', guard({ auth: constants.AUTH }), async (req, res) => {
  try {
    const user = await users.find_by_token(req.token);

    res.send({
      success: true,
      profile: users.sanitize(user),
    })
  } catch (e) {
    res.status(500).json({ success: false, errors: [e.message], });
  }

});

router.get('/users/search', guard({ auth: constants.AUTH, requested_status: constants.ADMIN }), async (req, res) => {
  try {
    const { username } = req.query;
    if (username) {
      if ((typeof username !== 'string') && (typeof username !== 'number')) {
        return res.statusCode(400).send(ErrorsGenerator.gen(['"username" parameter must be a string.']));
      }
      const found = await users.model.find({
        username: { $regex: `.*${username}.*` },
      }).limit(10).lean();

      res.send({
        success: true,
        users: found.map(users.sanitize),
      });
    } else {
      res.statusCode(400).end(ErrorsGenerator.gen(['"username" parameter required.']));
    }
  } catch (e) {
    res.status(500).json({ success: false, errors: [e.message], });
  }
});

router.get('/users/:id', guard({ auth: constants.AUTH, requested_status: constants.ADMIN }), async (req, res) => {
  try {
    const user = await users.model.findById(req.params.id).lean();

    if (!user) {
      return res.status(400).send(ErrorsGenerator.gen([`This user doesn't exist.`]));
    }

    res.send({
      success: true,
      profile: users.sanitize(user),
    });
  } catch {
    res.status(500).json({ success: false, errors: [e.message], });
  }
});

router.put('/users/:id/status', guard({ auth: constants.AUTH, requested_status: constants.ADMIN }), async (req, res) => {
  try {
    const user = await users.model.findById(req.params.id).lean();

    if (!user) {
      return res.status(400).send(ErrorsGenerator.gen([`This user doesn't exist.`]));
    }

    const new_status = req.body.status;

    await users.model.updateOne(
      { _id: user._id },
      {
        status: new_status,
      }
    );

    res.status(200).json({
      success: true,
    });

  } catch {
    res.status(500).json({ success: false, errors: [e.message], });
  }
});
