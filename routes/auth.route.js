import express from 'express';
import {
  forgotPasswordController,
  getAllOrdersController,
  getAllUsersController,
  getOrdersController,
  loginController,
  orderStatusController,
  registerController,
  updateProfileController,
} from '../controllers/auth.controller.js';
import { isAdmin, requireSignIn } from '../middlewares/auth.middleware.js';

// router object
const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginController);

// Forgot Password || POST
router.post('/forgot-password', forgotPasswordController);

// Protect user route auth
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

// Protect admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

// Update Profile || PUT
router.put('/profile', requireSignIn, updateProfileController);

// Users Orders || GET
router.get('/orders', requireSignIn, getOrdersController);

// Admin Orders || GET
router.get('/orders/all', requireSignIn, isAdmin, getAllOrdersController);

// Order Status Update
router.put(
  '/order-status/:orderId',
  requireSignIn,
  isAdmin,
  orderStatusController
);

// Admin Users || GET
router.get('/users/all', requireSignIn, isAdmin, getAllUsersController);

export default router;
