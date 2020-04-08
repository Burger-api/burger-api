import {Router} from 'express';
const router = Router();
export default router;

import guard from "../middlewares/guard";
import * as constants from "../constants";

import * as users from '../models/users';
import * as foodstuffs from "../models/foodstuffs";

/**
 * Get all products
 */
router.get('/foodstuffs', guard({auth: constants.NOT_AUTH}), async (req, res) => {
  try {
    const result = await foodstuffs.model.find();

    res.status(200).json({
      success: true,
      foodstuffs: result,
    });
  } catch {
    res.status(500).end();
  }
});

/**
 * Create a new product.
 */
router.post('/foodstuffs', guard({auth: constants.AUTH}), async (req, res) => {
  try {
    const user = await users.find_by_token(req.token);
    let { name, category, price } = req.body || {};

    if (typeof name !== 'string' || typeof price !== 'number' || typeof category !== 'string') {
      res.status(409).end();
    }

    if (user.status === 'admin') {
      const product = await foodstuffs.model.create({
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
router.get('/foodstuffs/drinks', guard({ auth:(constants.NOT_AUTH) }), async (req, res) => {
  try {
    const result = await foodstuffs.model.find({ category: 'drinks' });

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
router.get('/foodstuffs/burgers', guard({ auth:(constants.NOT_AUTH) }), async (req, res) => {
  try {
    const result = await foodstuffs.model.find({ category: 'burgers' });

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
router.get('/foodstuffs/sides', guard({ auth:(constants.NOT_AUTH) }), async (req, res) => {
  try {
    const result = await foodstuffs.model.find({ category: 'sides' });

    res.status(200).json({
      success: true,
      sides: result,
    });
  } catch {
    res.status(500).end();
  }
});
