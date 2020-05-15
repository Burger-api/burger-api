import db from '../db';

const productSchema = db.Schema(
  {
    original_id: { type: String },
    original_name: { type: String },
    original_category: { type: String },
    original_price: { type: Number }
  }, { _id: false })

const menuSchema = db.Schema({
  original_id: { type: String },
  original_products: [productSchema]
}, { _id: false })


export const model = db.model('Order', {
  menus: [menuSchema],
  standalone_products: [productSchema],
  price: { type: Number },
  status: { type: String, default: 'pending' },
  customer: { type: db.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now, },
});


export async function sanitizeInsertedProducts(products) {
  return products.map((product) => {
    return {
      original_id: product._id,
      original_name: product.name,
      original_category: product.category,
      original_price: product.price,
    }
  })

}