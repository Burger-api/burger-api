import Joi from "@hapi/joi";

/**
 * @typedef SchemasOptions
 */
export const bodySchema = Joi.object().keys({
  promoted: Joi.boolean().required(),
});
