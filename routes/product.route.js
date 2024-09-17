import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/auth.middleware.js';
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  productCategoryController,
  productController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  singleProductController,
  updateProductController,
} from '../controllers/product.controller.js';
import formidable from 'express-formidable';

// router object
const router = express.Router();

// routes
// create product
router.post(
  '/create-product',
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update product
router.put(
  '/update-product/:id',
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get all products
router.get('/all', productController);

// get single product
router.get('/product-info/:slug', singleProductController);

// delete product
router.delete(
  '/delete-product/:id',
  requireSignIn,
  isAdmin,
  deleteProductController
);

// get photo
router.get('/product-photo/:pid', productPhotoController);

// filter product
router.post('/product-filters', productFiltersController);

// product count
router.get('/product-count', productCountController);

// product per page
router.get('/product-list/:page', productListController);

// search product
router.get('/search/:keyword', searchProductController);

//similar product
router.get('/related-product/:pid/:cid', realtedProductController);

//category wise product
router.get('/product-category/:slug', productCategoryController);

//To initialize the Braintree payment UI on the client side.
//Without the token, the frontend cannot connect securely with Braintree to collect payment details.
//The token is used to securely communicate between the client and the Braintree gateway.
router.get('/braintree/token', braintreeTokenController);

//To process the actual payment once the customer submits their payment details.
//This route handles the transaction, charges the customer, and saves the order in your database.
router.post('/braintree/payment', requireSignIn, braintreePaymentController);

// By implementing these two routes, you create a secure payment flow:

//* 1. The frontend requests a token.
//* 2. The customer makes a payment using that token.
//* 3. The backend processes the payment and updates your database with the transaction details.

export default router;
