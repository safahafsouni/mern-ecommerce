import productModel from '../models/product.model.js';
import categoryModel from '../models/category.model.js';
import slugify from 'slugify';
import fs from 'fs';
import braintree from 'braintree';
import orderModel from '../models/order.model.js';
import dotenv from 'dotenv';

dotenv.config();

// Braintree Gateway Setup:
// This part initializes the Braintree payment gateway by connecting it to the sandbox environment (for testing).
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // Use sandbox for testing
  merchantId: process.env.BRAINTREE_MERCHANT_ID, // Your merchant ID
  publicKey: process.env.BRAINTREE_PUBLIC_KEY, // Your public key
  privateKey: process.env.BRAINTREE_PRIVATE_KEY, // Your private key
});

export const createProductController = async (req, res) => {
  try {
    // express-formidable helps process form data, splitting regular form fields (like name, description, price, etc.)
    // into req.fields.
    const { name, description, price, category, quantity, shipping } =
      req.fields; // Access form fields via req.fields, contains non-file fields
    const { photo } = req.files; // Access uploaded files via req.files, contains files
    switch (true) {
      case !name:
        return res.status(400).json({ message: 'Name is Required' });
      case !description:
        return res.status(400).json({ message: 'Description is Required' });
      case !price:
        return res.status(400).json({ message: 'Price is Required' });
      case !category:
        return res.status(400).json({ message: 'Category is Required' });
      case !quantity:
        return res.status(400).json({ message: 'Quantity is Required' });
      case photo && photo.size > 1000000:
        return res
          .status(400)
          .json({ message: 'photo is Required and should be less then 1mb' });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    // The fs (File System) module in Node.js is used to read the image file from your computer (via fs.readFileSync(photo.path))
    // and store its data in the photo.data field of the product model.
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error while creating product',
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(400).json({ message: 'Name is Required' });
      case !description:
        return res.status(400).json({ message: 'Description is Required' });
      case !price:
        return res.status(400).json({ message: 'Price is Required' });
      case !category:
        return res.status(400).json({ message: 'Category is Required' });
      case !quantity:
        return res.status(400).json({ message: 'Quantity is Required' });
      case photo && photo.size > 1000000:
        return res
          .status(400)
          .json({ message: 'photo is Required and should be less then 1mb' });
    }
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error while updating product',
      error,
    });
  }
};

export const productController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate('category')
      .select('-photo')
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      countTotal: products.length,
      message: 'Products retrieved successfully',
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving products',
      error,
    });
  }
};

export const singleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate('category')
      .select('-photo');
    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the product',
      error,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    // select('photo) → only the photo field should be retrieved from the productModel
    const product = await productModel.findById(req.params.pid).select('photo');
    if (product.photo.data) {
      res.set('Content-Type', product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the photo',
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error while deleting product',
      error,
    });
  }
};

export const productFiltersController = async (req, res) => {
  try {
    // 'checked': an array of selected category IDs.
    // 'radio': an array representing a price range, with two values: the minimum (radio[0]) and the maximum (radio[1]).
    const { checked, radio } = req.body;
    // an object that will store the filter conditions
    // Initially, it's an empty object, but based on conditions (below), properties like 'category' and 'price' will be added.
    let args = {};
    // If there are selected categories, it adds a category field to the args object.
    // The value of args.category becomes the checked array,
    // For example, if checked = [1, 2], then args becomes { category: [1, 2] }.
    if (checked.length > 0) args.category = checked;
    // This checks if the radio array contains any values, meaning a price range was selected.
    // If the radio array is not empty, it adds a price field to the args object with a MongoDB query operator.
    /**
     * *$gte means "greater than or equal to" (for the minimum price).
     * *$lte means "less than or equal to" (for the maximum price).
     */
    // For example, if radio = [100, 500], this adds the price condition: { price: { $gte: 100, $lte: 500 } }.
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    // This uses the args object to query the productModel (a MongoDB model) for products that match the filters.
    // args object can contain two types of filters:
    /**
     * *category: Only find products that belong to the categories in the checked array.
     * *price: Only find products whose price is between the radio[0] (minimum) and radio[1] (maximum).
     */
    const products = await productModel.find(args);
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error while filtering products',
      error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).json({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error while counting products',
      error,
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const perPage = 3;
    // req.params.page gets the page parameter from the URL, for example, if the URL is /api/products/3, page would be 3.
    // If the page parameter is not present (i.e., undefined or null), it defaults to 1, meaning the first page is returned by default.
    /**
     * *If the client requests /api/products/3, page will be set to 3.
     * *If the client requests /api/products, page will default to 1.
     */
    const page = req.params.page ? parseInt(req.params.page) : 1;
    const products = await productModel
      // The empty {} object means there are no filters applied, so it retrieves all products from the collection.
      .find({}) // retrieves all products from the productModel.
      .select('-photo') // Exclude 'photo' field from the results
      //  This controls the pagination offset by skipping a certain number of documents based on the current page.
      // (page - 1) * perPage calculates how many products to skip to reach the correct page
      /**
       * *If page = 1, it skips 0 products (first page).
       * *If page = 2, it skips (2 - 1) * 2 = 2 products (starting from the 3rd product).
       * *If page = 3, it skips (3 - 1) * 2 = 4 products (starting from the 5th product).
       */
      .skip((page - 1) * perPage)
      .limit(perPage)
      // This sorts the products by their createdAt timestamp in descending order (-1), so the newest products appear first.
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error while getting products in per page',
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      // When you use the regex (regular expression) operator, MongoDB treats the keyword as a regular expression pattern.
      // The database will scan through the name field of each document
      // in the productModel collection and see if it contains a sequence of characters that matches the keyword pattern.
      //! The i option makes the search case-insensitive, meaning it will match both upper and lowercase letters.
      .find({
        name: { $regex: keyword, $options: 'i' },
      })
      .select('-photo');
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error while searching for product',
      error,
    });
  }
};

export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      // looking for products in the same category as cid (category: cid)
      // but excludes the current product with _id not equal to pid (_id: { $ne: pid }).
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select('-photo')
      .limit(3)
      .populate('category');
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error while searching for product',
      error,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate('category');
    res.status(200).json({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error while searching for product',
      error,
    });
  }
};

//TODO: 1. Token Generation (/braintree/token)
//payment gateway api
//token
//generates a client token by calling gateway.clientToken.generate(). The token is sent back to the frontend.
//If an error occurs, it sends a 500 status code with the error message.
//This token is required by the client (browser) to securely make a payment request later.
//!The token is necessary to initialize the Braintree Drop-in UI or any other Braintree payment interface.
//!It ensures secure communication between your backend and the Braintree service.
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//TODO: 2. Payment Processing (/braintree/payment)
//Once the frontend has received the token and the user has submitted payment details (nonce),
//the backend processes the payment using this route.
//*Key concepts:
// Nonce: The payment information from the frontend, securely sent using Braintree.
// Transaction Sale: This method processes the payment, captures the amount, and initiates settlement.
// Submit for Settlement: This means that the payment will be finalized immediately.
export const braintreePaymentController = async (req, res) => {
  try {
    //In Braintree, a nonce is generated on the frontend when the user submits their payment information,
    //such as their credit card details or PayPal information.
    //Braintree's client-side SDK handles this securely.
    //The customer enters their payment details (e.g., in a Braintree Drop-in UI or hosted fields).
    //The client-side Braintree library generates a nonce to represent the payment method.
    //!This nonce is a secure, encrypted token that replaces sensitive payment data.
    //!The nonce is sent to your backend server in the payment request.
    // Frontend: Customer submits payment details via a Braintree UI

    // On form submission, Braintree generates a nonce and sends it to your backend

    // Backend: Processing the payment using the nonce
    const { nonce, cart } = req.body; // Nonce received from the frontend
    let total = 0;
    // Calculate the total price of the cart
    cart.map((i) => {
      total += i.price;
    });
    // Process the transaction with the nonce
    let newTransaction = gateway.transaction.sale(
      {
        amount: total, // Total price calculated
        // Nonce (token) from the frontend
        paymentMethodNonce: nonce, // Nonce is used to process the payment
        options: {
          // This indicates that the payment should be captured and settled
          submitForSettlement: true, // Submitting for settlement after successful authorization
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart, // Saving purchased products
            payment: result, // Payment result from Braintree
            buyer: req.user._id, // Current logged-in user ID
          }).save();
          res.json({ ok: true }); // Respond success
        } else {
          res.status(500).json(error); // Handle payment failure
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
