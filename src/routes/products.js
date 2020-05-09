import {Router} from 'express';

const router = Router();
export default router;

import Joi from '@hapi/joi';
import guard from "../middlewares/guard";
import validateSchema, { SchemaError } from '../middlewares/joi-schema';
import * as constants from "../constants";

import * as products from '../models/products';

/**
 * Get all products
 */
router.get('/products', guard({auth: constants.NOT_AUTH}), async (req, res) => {
  try {
    const result = await products.model.find();

    res.json({
      success: true,
      products: result,
    });
  } catch {
    res.status(500).end();
  }
});

/**
 * @typedef SchemasOptions
 */
const productSchemaPost = Joi.object().keys({
  name: Joi.string().required().error(() => new SchemaError('Name is required.')),
  category: Joi.string().required().error(() => new SchemaError('Category is required.')),
  price: Joi.number().required().error(() => new SchemaError('Price is required.')),
});

/**
 * Create a new product.
 */
router.post('/products', guard({
  auth: constants.AUTH,
  requested_status: constants.ADMIN,
}), validateSchema({ body: productSchemaPost }), async (req, res) => {
  try {
    let {name, category, price} = req.body || {};

    if (await products.model.exists({name})) {
      return res.status(409).json({
        success: false,
        message: "Product name already exists",
      });
    }

    const product = await products.model.create({
      name,
      category,
      price,
    });

    res.status(201).json({
      success: true,
      product,
    });

  } catch {
    res.status(500).end();
  }
});

/**
 * Get a specific product
 */
router.get('/products/:id', guard({auth: constants.NOT_AUTH}), async (req, res) => {
  try {
    const result = await products.model.findById(req.params.id);

    res.json({
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
router.put('/products/:id', guard({
  auth: constants.AUTH,
  requested_status: constants.ADMIN
}), async (req, res) => {
  try {
    const result = await products.model.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "This product doesn't exist.",
      });
    }

    const {name, category, price} = req.body || {};

    result.name = name || result.name;
    result.category = category || result.category;
    result.price = price || result.price;

    if (name) {
      const double = await products.model.findOne({name: name});

      if (double) {
        return res.status(409).json({
          success: false,
          message: "Product name already exists",
        });
      }
    }

    await result.save();

    res.json({
      success: true,
    });
  } catch {
    res.status(500).end();
  }
});

/**
 * Get all products by category
 */
router.get('/products/categories/:category', guard({auth: (constants.NOT_AUTH)}), async (req, res) => {
  try {
    const result = await products.model.find({category: req.params.category});

    console.log(result);

    res.json({
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
router.delete('/products/:id', guard({
  auth: constants.AUTH,
  requested_status: constants.ADMIN
}), async (req, res) => {
  try {
    const result = await products.model.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "This product doesn't exist.",
      });
    }

    const deleted = await products.model.deleteOne({_id: req.params.id});

    res.json({
      success: true
    });

  } catch {
    res.status(500).end();
  }
});
