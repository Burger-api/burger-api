import db from "../db";

export const model = db.model('Menu', {
    name: { type: String, },
    foodstuffs: [{ type: db.Types.ObjectId, ref: 'Foodstuff' }],
    price: { type: Number, },
    date: { type: Date, default: Date.now, }
});
