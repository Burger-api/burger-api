import db from "../db";

export const model = db.model('Menu', {
    name: { type: String, },
    products: [{ type: db.Types.ObjectId, ref: 'Product' }],
    price: { type: Number, },
    date: { type: Date, default: Date.now, }
});
