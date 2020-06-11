import Joi from "@hapi/joi";
import {SchemaError} from "../middlewares/joi-schema";

/**
 * @typedef SchemasOptions
 */
export const productSchemaPost = Joi.object().keys({
  name: Joi.string().required().error(() => new SchemaError('Name is required.')),
  category: Joi.string().required().error(() => new SchemaError('Category is required.')),
  price: Joi.number().required().error(() => new SchemaError('Price is required.')),
});

/**
 * @typedef SchemasOptions
 */
export const productActivateSchema = Joi.object().keys({
  active: Joi.boolean().required().error(() => new SchemaError('Expect a required boolean.')),
});
