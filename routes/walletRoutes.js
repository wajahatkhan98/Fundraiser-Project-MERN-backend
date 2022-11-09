import express from 'express';
import { getWallet, walletCreate } from '../controllers/walletController.js';

import { protect } from '../middlewares/authMiddleware.js';

const walletRouter = express.Router();

walletRouter.use(
  express.urlencoded({
    extended: false,
  })
);

walletRouter.route('/wallet/:id').post(walletCreate).get(getWallet);

export default walletRouter;
