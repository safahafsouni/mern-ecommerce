import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/auth.middleware.js';
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from '../controllers/category.controller.js';

// router object
const router = express.Router();

// routes
// create category
router.post(
  '/create-category',
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update category
router.put(
  '/update-category/:id',
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// get all categories
router.get('/all', categoryController);

// get single category
router.get('/category-info/:slug', singleCategoryController);

// delete category
router.delete(
  '/delete-category/:id',
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
