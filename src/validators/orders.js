import Joi from "@hapi/joi";
import { SchemaError } from "../middlewares/joi-schema";

/**
 * @typedef SchemasOptions
 */
export const bodySchema = Joi.object().keys({
  menusData: Joi.array().items(Joi.object().keys({
    id: Joi.string().required(),
    products: Joi.array().items(Joi.string()).required(),
  })).required().error(() => new SchemaError('Please provide menu list')),

  standaloneProducts: Joi.array().items(Joi.string()).required()
    .error(() => new SchemaError('Please provide products list')),
  connectedUserId: Joi.string(),
  status: Joi.string(),
});
