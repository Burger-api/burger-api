import {Router} from 'express';
const router = Router();
export default router;

import guard from "../middlewares/guard";
import * as constants from "../constants";

import * as users from '../models/users';
import * as products from '../models/products';

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
      res.status(400).end();
    }

    if (name) {
      const double = await products.model.findOne({ name: name });

      if (double) {
        return res.status(409).json({
          success: false,
          message: "Product name already exists",
        });
      }
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
 * Get a specific product
 */
router.get('/products/:id', guard({ auth: constants.NOT_AUTH }), async (req, res) => {
  try {
    const result = await products.model.findById(req.params.id);

    res.status(200).json({
      success: true,
      products: products.sanitize(result),
    });
  } catch {
    res.status(500).end();
  }
});

/**
 * Update a specific product
 */
router.put('/products/:id', guard({ auth: constants.AUTH, requested_status: constants.ADMIN }), async (req, res) => {
  try {
    const result = await products.model.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "This product doesn't exist.",
      });
    }

    const { name, category, price } = req.body || {};

    result.name = name || result.name;
    result.category = category || result.category;
    result.price = price || result.price;

    if (name) {
      const double = await products.model.findOne({ name: name });

      if (double) {
        return res.status(409).json({
          success: false,
          message: "Product name already exists",
        });
      }
    }

    await result.save();

    res.status(200).json({
      success: true,
    });
  } catch {
    res.status(500).end();
  }
});

/**
 * Get all products by category
 */
router.get('/products/category/:category', guard({ auth:(constants.NOT_AUTH) }), async (req, res) => {
  try {
    const result = await products.model.find({ category: req.params.category });

    console.log(result);

    res.status(200).json({
      success: true,
      result,
    });
  } catch {
    res.status(500).end();
  }
});

/**
 * Delete a single product
 */
router.delete('/products/:id', guard({ auth: constants.AUTH, requested_status: constants.ADMIN }), async (req, res) => {
  try {
    const result = await products.model.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "This product doesn't exist.",
      });
    }

    const deleted = await products.model.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true
    });

  } catch {
    res.status(500).end();
  }
});
