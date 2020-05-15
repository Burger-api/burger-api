import { Router } from 'express'
const router = Router();
export default router

import * as constants from '../constants'
import guard from '../middlewares/guard'
import validateSchema from '../middlewares/joi-schema'
import { bodySchema } from '../validators/orders'


import * as orders from '../models/orders'
import * as menus from '../models/menus'
import * as products from '../models/products'

router.get('/orders', guard({ auth: constants.AUTH, requested_status: constants.ADMIN }), async (req, res) => {
  const result = await orders.model.find().populate('data');

  res.json({
    success: true,
    orders: result,
  });
});

router.get('/orders/in_pending', guard({ auth: constants.AUTH, requested_status: constants.PREPARATOR }), async (req, res) => {
  const result = await orders.model.find({ status: 'pending' }).populate('data');

  res.json({
    success: true,
    orders: result,
  });
});

router.post('/orders', guard({ requested_status: constants.CUSTOMER }),
  validateSchema({ body: bodySchema }),
  async (req, res) => {
    try {
      const { menusData, standaloneProducts, connectedUserId, status } = req.body || {};

      const filledMenus = await menus.checkAndGetAllByIds(menusData);

      if (filledMenus.errors) {
        return res.status(400).send({
          succes: false,
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
          succes: false,
          error: [filledStandAloneProducts.error],
        })
      } else {
        filledStandAloneProducts = await orders.sanitizeInsertedProducts(filledStandAloneProducts)
      }

      let full_price = 0
      full_price = filledMenus.reduce((acc, menu) => { return acc + menu.original_price }, full_price) +
        filledStandAloneProducts.reduce((acc, product) => { return acc + product.original_price }, full_price)

      const order = await orders.model.create({
        menus: filledMenus,
        standalone_products: filledStandAloneProducts,
        price: full_price,
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

router.put('/orders/checkin/:id', guard({ auth: constants.AUTH, constants: constants.PREPARATOR }), async (req, res) => {
  try {

    const order = await orders.model.findById(req.params.id)
    if (!order) {
      return res.statusCode(400).json({
        success: false,
        errors: ['Please provide a valid order id'],
      })
    }

    await orders.model.updateOne(
      {
        _id: order._id,
      },
      {
        status: 'delivered',
      })

    return res.status(200).json({
      succes: true,
    })
  } catch (e) {
    return res.status(500).json({ success: false, errors: ['an error occured'], });

  }
})