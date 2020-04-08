import db from "../db";

export const model = db.model('Foodstuff', {
    name: { type: String, },
    category: { type: String, },
    price: { type: Number, },
    date: { type: Date, default: Date.now, }
});
