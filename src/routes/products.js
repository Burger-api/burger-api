import {Router} from 'express';
const router = Router();
export default router;

import Joi from '@hapi/joi';
import guard from "../middlewares/guard";
import validateSchema, {SchemaError} from '../middlewares/joi-schema';
import * as constants from "../constants";
import db from "../db";

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
router.post('/products',
  guard({auth: constants.AUTH, requested_status: constants.ADMIN,}),
  validateSchema({body: productSchemaPost}), async (req, res) => {
    try {
      let {name, category, price} = req.body || {};

      if (await products.model.exists({name})) {
        return res.status(409).json({
          success: false,
          errors: ['Product name already exists.'],
        });
      }

      const product = await products.model.create({
        name,
        category,
        price,
      });

      res.status(201).json({success: true, product,});

    } catch {
      res.status(500).end();
    }
  });

/**
 * Get a specific product
 */
router.get('/products/:id', guard({auth: constants.NOT_AUTH}), async (req, res) => {
  try {
    const _id = req.params.id;

    if (!db.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        success: false,
        errors: ['Invalid parameters.'],
      });
    }

    const product = await products.model.findById(_id);

    if (!product) {
      return res.status(404).json({
        success: false,
        errors: ['Resource does not exist.'],
      });
    }

    res.json({ success: true, product });
  } catch {
    res.status(500).end();
  }
});

/**
 * Update a specific product
 */
router.put('/products/:id',
  guard({auth: constants.AUTH, requested_status: constants.ADMIN}),
  validateSchema({body: productSchemaPost}), async (req, res) => {
    try {
      const _id = req.params.id || '';

      if (!db.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
          success: false,
          errors: ['Invalid parameters.'],
        });
      }

      if (!await products.model.exists({_id})) {
        return res.status(404).json({
          success: false,
          errors: ['Resource does not exist.'],
        });
      }

      const {name, category, price} = req.body || {};

      const productsList = await products.model.find({name});

      for (const product of productsList) {
        if (product._id.toString() !== _id) {
          return res.status(409).json({
            success: false,
            errors: ['This name is already used by another product.'],
          });
        }
      }

      await products.model.updateOne({_id}, {name, category, price});

      res.json({success: true});
    } catch (e) {
      res.status(500).json({
        success: false,
        errors: [e.message],
      });
    }
  });

/**
 * Get all products by category
 */
router.get('/products/categories/:category', guard({auth: (constants.NOT_AUTH)}), async (req, res) => {
  try {
    if (!req.params.category || !(typeof req.params.category === 'string')) {
      return res.status(400).json({success: false, errors: ['Invalid parameters.']});
    }

    const result = await products.model.find({category: req.params.category.toLowerCase()});

    if (!result.length) {
      return res.status(400).json({success: false, errors: ['Resource does not exist.']});
    }

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
const productActivateSchema = Joi.object().keys({
  active: Joi.boolean().required().error(() => new SchemaError('Expect a required boolean.')),
});

/**
 * Enable or disable a single product
 */
router.put('/products/:id/activate',
  guard({auth: constants.AUTH, requested_status: constants.ADMIN}),
  validateSchema({body: productActivateSchema}),
  async (req, res) => {
    try {
      const {active} = req.body;

      const _id = req.params.id || '';

      if (!db.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
          success: false,
          errors: ['Invalid parameters.'],
        });
      }

      if (!await products.model.exists({_id})) {
        return res.status(404).json({success: false, errors: ['Resource does not exist.']});
      }

      await products.model.updateOne({_id}, {active});

      res.json({
        success: true
      });

    } catch {
      res.status(500).end();
    }
  });
