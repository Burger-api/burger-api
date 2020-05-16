import {Router} from 'express';

import * as products from '../models/products';
import * as menus from '../models/menus';

const router = Router();
export default router;

router.get('/highlights', async (req, res) => {
  try {
    const highlights = await products.model.find({ promoted: true });
    highlights.concat(await menus.model.find({ promoted: true }).populate('default_products'));

    res.json({ success: true, highlights });

  } catch (e) {
    return res.status(500).json({ success: false, errors: [e.message]});
  }
});
