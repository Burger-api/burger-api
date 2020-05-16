import {Router} from 'express'
import Joi from '@hapi/joi';

import * as constants from '../constants'
import guard from '../middlewares/guard'
import * as orders from '../models/orders'
import * as menus from '../models/menus'
import * as products from '../models/products'
import validateSchema, {SchemaError} from '../middlewares/joi-schema'
import {bodySchema} from '../validators/orders'
import db from "../db";

const router = Router();
export default router

router.get('/orders', guard({ auth: constants.AUTH, requested_status: constants.ADMIN }), async (req, res) => {
  try {
    const result = await orders.model.find().populate('data');

    res.json({
      success: true,
      orders: result,
    });
  } catch (e) {
    return res.status(500).json({ success: false, errors: [e.message], });
  }
});

router.get('/orders/:id', guard({ auth: constants.AUTH, requested_status: constants.ADMIN }), async (req, res) => {
  try {

    const _id = req.params.id || '';

    if (!db.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        success: false,
        errors: ['Invalid parameters.'],
      });
    }

    if (!await orders.model.exists({ _id })) {
      return res.status(404).json({ success: false, errors: ['Resource does not exist.'] });
    }

    const result = await orders.model.findById({ _id })

    res.json({
      success: true,
      orders: result,
    });
  } catch (e) {
    return res.status(500).json({ success: false, errors: [e.message], });
  }
});

router.get('/orders/pending', guard({ auth: constants.AUTH, requested_status: constants.COOKER }), async (req, res) => {
  try {
    const result = await orders.model.find({ status: 'pending' }).populate('data');

    res.json({
      success: true,
      orders: result,
    });
  } catch (e) {
    return res.status(500).json({ success: false, errors: [e.message], });
  }
});

router.post('/orders', guard({ requested_status: constants.CUSTOMER }),
  validateSchema({ body: bodySchema }),
  async (req, res) => {
    try {
      const { menusData, standaloneProducts, connectedUserId, status } = req.body || {};

      const filledMenus = await menus.checkAndGetAllByIds(menusData);

      if (filledMenus.errors) {
        return res.status(400).send({
          success: false,
          errors: [filledMenus.errors],
        })
      } else {
        for (const filledMenu of filledMenus) {
          filledMenu.original_products = await orders.sanitizeInsertedProducts(filledMenu.original_products)
        }
      }

      let filledStandAloneProducts = await products.checkAndGetAllById(standaloneProducts)

      if (filledStandAloneProducts.errors) {
        return res.status(400).send({
          success: false,
          errors: [filledStandAloneProducts.error],
        })
      } else {
        filledStandAloneProducts = await orders.sanitizeInsertedProducts(filledStandAloneProducts)
      }


      const fullMenuPrice = filledMenus.reduce((acc, menu) => { return acc + menu.original_price }, 0)
      const fullProductsPrice = filledStandAloneProducts.reduce((acc, product) => { return acc + product.original_price }, 0)
      const fullPrice = fullMenuPrice + fullProductsPrice

      const order = await orders.model.create({
        menus: filledMenus,
        standalone_products: filledStandAloneProducts,
        price: fullPrice,
        status: status || 'pending',
        customer: connectedUserId || null,
      });

      return res.json({
        success: true,
        order,
      });
    } catch (e) {
      return res.status(500).json({ success: false, errors: [e], });
    }

  });

router.put('/orders/checkin/:id', guard({ auth: constants.AUTH, constants: constants.COOKER }), async (req, res) => {
  try {
    const _id = req.params.id || '';

    if (!db.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        success: false,
        errors: ['Invalid parameters.'],
      });
    }

    if (!await orders.model.exists({ _id })) {
      return res.status(404).json({ success: false, errors: ['Resource does not exist.'] });
    }

    await orders.model.updateOne(
      {
        _id,
      },
      {
        status: 'delivered',
      })

    return res.status(200).json({
      success: true,
    })
  } catch (e) {
    return res.status(500).json({ success: false, errors: ['an error occured'], });

  }
})

/**
 * @typedef SchemasOptions
 */
const orderActivateSchema = Joi.object().keys({
  active: Joi.boolean().required().error(() => new SchemaError('Expect a required boolean.')),
});

router.put('/orders/:id/activate', guard({ auth: constants.AUTH, constants: constants.ADMIN }), validateSchema({ body: orderActivateSchema }), async (req, res) => {
  try {
    const { active } = req.body;

    const _id = req.params.id || '';

    if (!db.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        success: false,
        errors: ['Invalid parameters.'],
      });
    }

    if (!await orders.model.exists({ _id })) {
      return res.status(404).json({ success: false, errors: ['Resource does not exist.'] });
    }

    await orders.model.updateOne({ _id }, { active });

    res.json({
      success: true
    });

  } catch {
    res.status(500).end();
  }
})
