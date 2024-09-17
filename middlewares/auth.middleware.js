import JWT from 'jsonwebtoken';
import userModel from '../models/user.model.js';

// Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// Admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access',
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error in admin middleware',
      error,
    });
  }
};
