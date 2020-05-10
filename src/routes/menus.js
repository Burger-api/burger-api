import {Router} from 'express';
import * as validator from '../validators/menus'

import * as constants from '../constants';
import guard from '../middlewares/guard';
import validateSchema from '../middlewares/joi-schema'

import * as menus from '../models/menus';

const router = Router();
export default router;

router.get('/menus',async (req, res) => {
  try {
    const result = await menus.model.find().populate('default_products');

    res.status(200).json({
      success: true,
      menus: result,
    });
  } catch(e) {
    res.status(400).json({
      success: false,
      errors: [e.message],
    });
  }
});

router.post('/menus',
  guard({ auth: constants.AUTH, requested_status: constants.ADMIN }),
  validateSchema({ body: validator.post }),
  async (req, res) => {
    try {
      const { name, products, limits, price } = req.body || {};
      const errors = await menus.isValid(name, products, limits);

      if (errors.length) {
        return res.status(400).json({
          success: false,
          errors
        });
      }

      const menu = await menus.model.create({
        name,
        limits,
        default_products: products,
        price,
      });

      res.status(201).json({
        success: true,
        menu,
      });
    } catch (e) {
      res.status(500).json( {
        success: false,
        errors: [e.message],
      });
    }
  });
