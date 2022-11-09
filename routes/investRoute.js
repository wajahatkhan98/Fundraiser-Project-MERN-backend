import express from 'express';
import { invest, verifyUser } from '../controllers/investController.js';
import { protect } from '../middlewares/authMiddleware.js';

const investRouter = express.Router();

investRouter.use(
  express.urlencoded({
    extended: false,
  })
);

investRouter.route('/invest').post(invest);

investRouter.route('/verify/:id').get(verifyUser);

export default investRouter;
