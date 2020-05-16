import {Router} from 'express';

import db from '../db'
import * as constants from '../constants'

import * as products from '../models/products';
import * as menus from '../models/menus';
import guard from "../middlewares/guard";

const router = Router();
export default router;

router.get('/highlights', async (req, res) => {
  try {
    const highlights = await products.model.find({ promoted: true });
    highlights.concat(await menus.model.find({ promoted: true }).populate('default_products'));

    res.json({ success: true, highlights });

  } catch (e) {
    return res.status(500).json({ success: false, errors: [e.message]});
  }
});

router.put('highlights/:id',
  guard({ auth: constants.AUTH, requested_status: constants.ADMIN }), async (req, res) => {
    try {
      const _id = req.params.id || '';
      const { promoted } = req.body || {};

      if (!db.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, errors: ['Invalid parameters.'], });
      }

      if (menus.model.exists({ _id })) {
        await menus.model.updateOne({ _id }, { promoted });
      } else if (products.model.exists({ _id })) {
        await products.model.updateOne({ _id }, { promoted });
      } else {
        return res.status(404).json({ success: false, errors: ['Resource does not exist.'] });
      }

      res.json({ success : true });

    } catch (e) {
      return res.status(500).json({ success: false, errors: [e.message]});
    }
  });
