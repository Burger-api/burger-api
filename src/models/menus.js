import db from "../db";
import * as products from "./products"

export const Limit = new db.Schema({
  burgers: { type: Number, default: 0, },
  drinks: { type: Number, default: 0, },
  sides: { type: Number, default: 0, },
  snacks: { type: Number, default: 0, },
  salads: { type: Number, default: 0, },
  desserts: { type: Number, default: 0, },
});

export const model = db.model('Menu', {
  name: { type: String, },
  price: { type: Number, },
  limits: { type: Limit, ref: 'Limit' },
  default_products: [{ type: db.Types.ObjectId, ref: 'Product', }],
  promotion_start: { type: Date, default: null },
  promotion_end: { type: Date, default: null },
  date: { type: Date, default: Date.now, }
});

/**
 * @param defaultProducts {string[]}
 * @param limits {Limit}
 * @return {Promise<string[]>}
 */
export async function isValid(defaultProducts, limits) {
  try {
    const sumOfLimits = Object.values(limits).reduce((acc, value) => acc + value);
    const errors = [];

    if (sumOfLimits < 2) {
      errors.push('A menu contains at least two products.')
    }

    if (!await validateProductsAndLimits(defaultProducts, limits)) {
      errors.push('The default products do not match with the limits set.')
    }

    return errors;

  } catch (e) {
    return [e.message];
  }
}

/**
 *
 * @param defaultProducts {string[]}
 * @param limits {Limit}
 * @return {Promise<boolean>}
 */
async function validateProductsAndLimits(defaultProducts, limits) {
  try {
    const copyOfLimits = Object.assign(limits, {});
    const productsList = [];

    for (const _id of defaultProducts) {
      const product = await products.model.findById(_id);
      productsList.push(product);
      for (const key in copyOfLimits) {
        if (key === product.category) {
          copyOfLimits[key]--;
        }
      }
    }

    for (const product of productsList) {
      for (const key in copyOfLimits) {
        if (key === product.category && copyOfLimits[key] !== 0) {
          return false;
        }
      }
    }

    return true;

  } catch (e) {
    throw new Error(e.message);
  }
}

export async function checkAndGetAllByIds(menuArray) {
  try {
    const menusFilledArray = []
    for (const menuData of menuArray) {

      const menu = await model.findById(menuData.id)
      if (!menu) {
        return { errors: `Required menu doesn't exist` }
      }

      const productsData = await products.checkAndGetAllById(menuData.products)
      if (productsData.errors) {
        return { errors: productsData.errors }
      }

      if (!await validateProductsAndLimits(menuData.products, menu.limits)) {
        return { errors: `Passed list of products doesn't match menu limit` }
      }

      menusFilledArray.push({
        original_id: menu._id,
        original_name: menu.name,
        original_products: productsData,
        original_price: menu.price,
      })
    }

    return menusFilledArray
  } catch (e) {
    throw new Error(e.message);

  }
}
