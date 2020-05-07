import db from "../db";

export const model = db.model('Product', {
    name: { type: String, },
    category: { type: String, },
    price: { type: Number, },
    date: { type: Date, default: Date.now, }
});

export function sanitize(product) {
    if (!product) return {};

    return {
        id: product._id,
        name: product.name,
        category: product.category,
        price: product.price,
    }
}
