import { Router } from 'express';
const router = Router();
export default router;

import * as constants from '../constants';
import guard from '../middlewares/guard';

import * as users from '../models/users';
import * as menus from  '../models/menus';

router.get('/menus', guard({auth: constants.NOT_AUTH}), async (req, res) => {
    try {
        const result = await menus.model.find().populate('products');

        res.status(200).json({
            success: true,
            menus: result,
        });
    } catch {
        res.status(400).end();
    }
});

router.post('/menus', guard({auth: constants.AUTH}), async (req, res) => {
    try {
        const user = await users.find_by_token(req.token);
        let {name, products, price} = req.body || {};

        if (typeof name !== 'string' || typeof price !== 'number' || typeof products !== 'object') {
            res.status(400).end();
        }

        if (user.status === 'admin') {
            const menu = await menus.model.create({
                name,
                products,
                price,
            });

            res.status(201).send({
                success: true,
                menu,
            });
        } else {
            res.status(403).end();
        }
    } catch {
        res.status(500).end();
    }
});
