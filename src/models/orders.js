import db from '../db';


export const model = db.model('Order', {
    status: { type: String, default: 'waiting' },
    products: [{ type: db.Types.ObjectId, ref: 'Product', default: [], }],
    customer: { type: db.Types.ObjectId, ref: 'User' },
    created: { type: Date, default: Date.now, },
    assigned_to: { type: db.Types.ObjectId, ref: 'User' },
});
