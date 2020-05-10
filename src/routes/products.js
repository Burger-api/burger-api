import {Router} from 'express';
import guard from "../middlewares/guard";
import * as constants from "../constants";

import * as users from '../models/users';
import * as products from "../models/products";

const router = Router();
export default router;

/**
 * Get all products
 */
router.get('/products', guard({auth: constants.NOT_AUTH}), async (req, res) => {
  try {
    const result = await products.model.find();

    res.status(200).json({
      success: true,
      products: result,
    });
  } catch {
    res.status(500).end();
  }
});

/**
 * Create a new product.
 */
router.post('/products', guard({auth: constants.AUTH}), async (req, res) => {
  try {
    const user = await users.find_by_token(req.token);
    let { name, category, price } = req.body || {};

    if (typeof name !== 'string' || typeof price !== 'number' || typeof category !== 'string') {
      res.status(409).end();
    }

    if (user.status === 'admin') {
      const product = await products.model.create({
        name,
        category,
        price,
      });

      res.status(201).json({
        success: true,
        product,
      });
    } else {
      res.status(403).end();
    }
  } catch {
    res.status(500).end();
  }
});

/**
 * Get all products of type: drinks
 */
router.get('/products/drinks', guard({ auth:(constants.NOT_AUTH) }), async (req, res) => {
  try {
    const result = await products.model.find({ category: 'drinks' });

    res.status(200).json({
      success: true,
      drinks: result,
    });
  } catch {
    res.status(500).end();
  }
});

/**
 * Get all products of type: burgers
 */
router.get('/products/burgers', guard({ auth:(constants.NOT_AUTH) }), async (req, res) => {
  try {
    const result = await products.model.find({ category: 'burgers' });

    res.status(200).json({
      success: true,
      burgers: result,
    });
  } catch {
    res.status(400).end()
  }
});

/**
 * Get all products of type: sides
 */
router.get('/products/sides', guard({ auth:(constants.NOT_AUTH) }), async (req, res) => {
  try {
    const result = await products.model.find({ category: 'sides' });

    res.status(200).json({
      success: true,
      sides: result,
    });
  } catch {
    res.status(500).end();
  }
});
