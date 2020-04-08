import { Router } from 'express'
const router = Router();
export default router

import * as constants from '../constants'
import guard from '../middlewares/guard'

import * as orders from '../models/orders'

router.get('/orders', guard({ auth: constants.AUTH }), async (req, res) => {
    const result = await orders.model.find().populate('data');

    res.json({
        success: true,
        orders: result,
    });
});

router.post('/orders',async (req, res) => {
    const { order, customer = null , assignee = null} = req.body || {};

    const newOrder = await orders.model.create({
        customer,
        assignee,
        data: order,
    });

    res.json({
        success: true,
        order: newOrder,
    });
});
