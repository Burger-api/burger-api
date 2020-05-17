import {Router} from 'express';

import db from '../db';
import * as constants from '../constants';

import * as products from '../models/products';
import * as menus from '../models/menus';
import guard from '../middlewares/guard';
import validateSchema from '../middlewares/joi-schema';
import {bodySchema} from "../validators/highlights";

const router = Router();
export default router;

router.get('/highlights', async (req, res) => {
  try {
    const highlightsProducts = await products.model.find({ promoted: true });
    const highlightsMenus = await menus.model.find({ promoted: true }).populate('default_products');
    const highlights = highlightsProducts.concat(highlightsMenus);

    res.json({ success: true, highlights });

  } catch (e) {
    return res.status(500).json({ success: false, errors: [e.message]});
  }
});

router.put('/highlights/:id',
  guard({ auth: constants.AUTH, requested_status: constants.ADMIN }),
  validateSchema({ body: bodySchema }),
  async (req, res) => {
    try {
      const _id = req.params.id || '';
      const { promoted } = req.body || {};

      if (!db.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, errors: ['Invalid parameters.'], });
      }

      if (await products.model.exists({ _id })) {
        await products.model.updateOne({ _id }, { promoted });

      } else if (await menus.model.exists({ _id })) {
        await menus.model.updateOne({ _id }, { promoted });

      } else {
        return res.status(404).json({ success: false, errors: ['Resource does not exist.'] });
      }

      res.json({ success : true });

    } catch (e) {
      return res.status(500).json({ success: false, errors: [e.message]});
    }
  });
