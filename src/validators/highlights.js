import Joi from "@hapi/joi";
import {SchemaError} from "../middlewares/joi-schema";

/**
 * @typedef SchemasOptions
 */
export const bodySchema = Joi.object().keys({
  promoted: Joi.boolean().error(() => new SchemaError('Expecting boolean type.')),
});
