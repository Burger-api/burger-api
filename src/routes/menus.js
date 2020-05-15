import {Router} from 'express';
import {bodySchema} from '../validators/menus'

import db from '../db';
import * as constants from '../constants';
import guard from '../middlewares/guard';
import validateSchema from '../middlewares/joi-schema'

import * as menus from '../models/menus';
import {model} from '../models/menus';

const router = Router();
export default router;

router.get('/menus',async (req, res) => {
  try {
    const result = await menus.model.find().populate('default_products');

    res.status(200).json({ success: true, menus: result, });

  } catch(e) {
    res.status(500).json({ success: false, errors: [e.message], });
  }
});

router.get('/menus/:id', async  (req, res) => {
  try {
    const _id = req.params.id || '';

    if (!db.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ success: false, errors: ['Invalid parameters.']})
    }

    const menu = await menus.model.findById({ _id });

    if (!menu) {
      return res.status(404).json({ success: false, errors: ['Resource not found.']});
    }

    res.json({ success: true, menu });

  } catch (e) {
    res.status(500).json({ success: false, errors: [e.message], });
  }
})

router.post('/menus',
  guard({ auth: constants.AUTH, requested_status: constants.ADMIN }),
  validateSchema({ body: bodySchema }),
  async (req, res) => {
    try {
      const { name, products, limits, price, promotion_start, promotion_end } = req.body || {};
      const errors = await menus.isValid(products, limits);

      if (await model.exists({ name })) {
        errors.push('This name is already used for an existing menu.')
      }

      if (errors.length) {
        return res.status(400).json({ success: false, errors, });
      }

      const menu = await menus.model.create({
        name,
        limits,
        default_products: products,
        price,
        promotion_start,
        promotion_end,
      });

      res.status(201).json({ success: true, menu, });

    } catch (e) {
      res.status(500).json( { success: false, errors: [e.message], });
    }
  });

router.put('/menus/:id',
  guard({ auth: constants.AUTH, requested_status: constants.ADMIN}),
  validateSchema({ body: bodySchema }),
  async (req, res) => {
    try {
      const _id = req.params.id || '';

      if (!db.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, errors: ['Invalid parameters.'], });
      }

      const { name, products, limits, price } = req.body || {};
      const errors = await menus.isValid(products, limits);
      const menusList = await model.find({ name });

      for (const menu of menusList) {
        if (menu._id.toString() !== _id) {
          errors.push('This name is already used by another menu.');
          break;
        }
      }

      if (errors.length) {
        return res.status(400).json({ success: false, errors, });
      }

      await menus.model.updateOne({ _id }, {
        name,
        default_products: products,
        limits,
        price,
      });

      res.json({ success: true, });

    } catch (e) {
      res.status(500).json( { success: false, errors: [e.message], });
    }
  });
