import db from "../db";

export const model = db.model('Product', {
    name: { type: String, },
    category: { type: String, },
    price: { type: Number, },
    active: { type: Boolean, default: true },
    date: { type: Date, default: Date.now, },
});
