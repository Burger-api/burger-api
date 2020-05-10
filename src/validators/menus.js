import Joi from "@hapi/joi";
import {SchemaError} from "../middlewares/joi-schema";

/**
 * @typedef SchemasOptions
 */
export const post = Joi.object().keys({
  name: Joi.string().required(),
  limits: Joi.object().keys({
    burgers: Joi.number().integer().min(0),
    drinks: Joi.number().integer().min(0),
    sides: Joi.number().integer().min(0),
    snacks: Joi.number().integer().min(0),
    salads: Joi.number().integer().min(0),
    desserts: Joi.number().integer().min(0),
  }),
  products: Joi.array().items(Joi.string()).required(),
  price: Joi.number().min(3).required().error(() => new SchemaError('Price is required and must be at least equal to 3.')),
});
