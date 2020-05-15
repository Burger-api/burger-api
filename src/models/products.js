import db from "../db";

export const model = db.model('Product', {
  name: { type: String, },
  category: { type: String, },
  price: { type: Number, },
  active: { type: Boolean, default: true },
  date: { type: Date, default: Date.now, },
});


export async function checkAndGetAllById(productsId) {
  try {
    const products = []
    for (const id of productsId) {
      const product = await model.findById(id)

      if (!product) {
        return { errors: `One of the passed product doesn't exist` }
      } else {
        products.push(product)
      }
    }

    return products
  } catch (e) {
    throw new Error(e.message);

  }
}