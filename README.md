# MERN Stack eCommerce Application

## Project Overview

The project is an E-commerce website built using the MERN (MongoDB, Express.js, React, Node.js) stack. It provides a platform for users to view and purchase various products. The server-side (Node.js with Express) manages the API for product data stored in a MongoDB database. The client-side (React) handles the user interface and interacts with the server to fetch and display product information.

### Technologies Used

- **MongoDB**: NoSQL database for storing user data, product information, and order details.
- **Express.js**: Web application framework for Node.js, used to build the server and API endpoints.
- **React.js**: JavaScript library for building user interfaces, used for developing the frontend of the application.
- **Node.js**: JavaScript runtime environment that executes the backend code and manages server operations.

### Approach to create E-commerce Website:

- Server-side API for fetching product data
- React components for displaying product information
- MongoDB for storing product details
- CORS middleware to handle cross-origin requests

## 1. eCommerce MERN App Project Setup

In this step, download and install the necessary development tools and environments

## 2. MERN App Server and Dotenv Setup

In this step, you will configure the server using Express and set up environment variables with `dotenv` to manage configuration settings like the port number and MongoDB connection string.

## 3. Node.js MongoDB Connection

This step covers how to connect your Node.js application to MongoDB, allowing your application to store and retrieve data from the database.

## 4. setup-project-structure

**Project Structure**

Backend

- /models: Mongoose models
- /routes: API routes
- /controllers: Route handlers
- /middlewares: Middleware functions
- /config: Configuration files (e.g., database connection)
- /helpers

## 5. Tasks and Features

1. Authentication

- [ ] Create User Model
- [ ] Set Up Auth Route
- [ ] Registration Route & Controller
- [ ] Hash Passwords (auth.helper.js)
- [ ] JWT Implementation
- [ ] Login Route & Controller
- [ ] Protect Routes with JWT (auth.middleware.js)

## 6. Frontend Development

### 1. **Set up React frontend**

→ using the command :

```bash
npx create-react-app client
cd client
```

### 2. **Components and Pages**

- Created reusable **React components** for UI elements : layout, header, footer.
- Added pages for main sections of the app:
  - **Home Page**: Displays featured products.
  - **About Page**
  - **Contact Page**
  - **Policy Page**
  - **Page Not Found Page**

### 3. **Routing Setup**

- Implemented **React Router** for handling navigation between pages.
  - **Route /**: Renders the Home page.
  - **Route /about**: Renders the About page.
  - **Route /contact**: Renders the Contact page.
  - **Route /policy**: Renders the Policy page.
  - **Route "\*"**: Renders the Page Not Found page.

### 4. **SEO Integration**

- Added **React Helmet** to the layout for handling metadata and improving SEO.
  - Implemented metadata (title, description, keywords, author) for key pages: Home, About, Contact, Policy, Page Not Found.

### 5. **User Authentication**

- Created **Login** and **Register** pages for user authentication.
- Integrated the frontend with the backend using **Axios** for making API requests.

### 6. **Authentication Context**

- Implemented **Authentication Context** to manage user authentication state throughout the application.
  - Created context provider for managing login, logout, and user session.
  - Integrated context with the frontend to ensure authentication state is accessible across the app.

### 7. **Private Routes, Location History, and Redirect**

- **Private Routes**: Implemented routes that are protected and require user authentication to access.
- **Location History**: Managed location history for routing and navigation.
- **Redirect**: Set up redirects for user navigation and authentication states.

### 8. **Forgot Password**

- Implemented **Forgot Password** functionality to allow users to reset their password.

  - Created a controller to handle password reset requests.
  - Set up a route for sending reset password emails.
  - Integrated with email services to send reset links to users.

  ### 9. **Admin and User Panel**

- **Admin Panel**: Built a panel for administrators to manage users, products, and categories.
- **User Panel**: Created a user-friendly panel for customers to manage their profiles and view their order history.
  - Integrated role-based access control to differentiate between admin and user functionalities.

### 10. **Category API CRUD**

- Implemented Category API with CRUD functionality:

  - **Create**: Add new product categories.
  - **Read**: Fetch and display categories.
  - **Update**: Edit existing categories.
  - **Delete**: Remove categories.
  - API fully integrated with the frontend for managing product categories.

  ### 11. **Product API CRUD and Image Upload**

- **Product API CRUD**: Implemented CRUD functionality for managing products:
  - **Create**: Add new products.
  - **Read**: Fetch and display products.
  - **Update**: Edit existing products.
  - **Delete**: Remove products.
- **Image Upload**: Used `express-formidable` for handling image uploads in the Product API, allowing product images to be uploaded and managed.

### 12. **Category CRUD Frontend**

- **Category CRUD Frontend**: Implemented the user interface for category management:
  - **Create**: Add new categories through the frontend.
  - **Read**: Display categories in a list.
  - **Update**: Edit category details.
  - **Delete**: Remove categories.
- Connected the frontend with the backend Category API for full CRUD operations.

### 13. **Create Product Form**

- **Create Product Form**: Developed a user interface form for adding new products:

  - Includes fields for product details (e.g., name, price, description) and image upload.
  - Connected the form to the backend API for creating new products.

  ### 14. **Product CRUD Operations**

- **Get Product**: Display products in a list on the frontend by fetching data from the backend API.
- **Update Product**: Created a form for updating product details and connected it to the backend for updating the product.
- **Delete Product**: Added functionality to delete products and reflect changes immediately on the frontend.

### 15. **Category, Price, Pagination, and Filters**

- **Category Filters**: Implemented filtering products based on their categories.
- **Price Filters**: Added filtering functionality by price range, allowing users to narrow down their search.
- **Pagination**: Implemented pagination to efficiently manage large numbers of products and improve performance.
- **Filters**: Users can now filter products by both category and price, improving search capabilities.

### 16. **Search Filter, Single Product Page, Similar Products, and Product Details**

- **Search Filter**: Implemented a search filter to allow users to search for products by keywords.
- **Single Product Page**: Created a page to display detailed information about a single product.
- **Similar Products**: Added functionality to show similar products based on the currently viewed product.
- **Product Details**: Displayed comprehensive details of each product on its respective page.
- **SearchProvider**: Integrated `SearchProvider` to manage and enhance search functionality across the application.

### 17. **Category Page, Filters, and Categories Page**

- **Category Page**: Developed a page to display products filtered by the selected category.
- **Category Filters**: Implemented filters to refine product listings based on categories.
- **useCategory Hook**: Created a custom hook to fetch all categories from the backend and manage category data.
- **Categories Page**: Created a page that lists all available categories with their names.

### 18. **useCart Hook and Shopping Cart**

- **useCart Hook**: Implemented a custom hook to manage the shopping cart state using React Context, providing functionality for adding, removing, and updating cart items.
- **Shopping Cart**: Developed the shopping cart feature, including UI components for viewing and managing items in the cart.

### 19. **Manage User Profile**

- **User Profile Page**: Developed a page where users can view their current profile information.
- **Profile Update**: Implemented functionality for users to update their profile details, including name, email, and password. This feature integrates the frontend with the backend API.

### 20. **Payment Gateway Integration with Braintree**

- **Braintree Gateway Setup**: Configured Braintree for handling payments and transactions.
- **Backend Routes**:
  - **Token Generation (/braintree/token)**: Created an endpoint to generate a Braintree token for frontend integration.
  - **Payment Processing (/braintree/payment)**: Developed an endpoint to handle payment processing through Braintree.
- **Order Model**: Implemented a model to store and manage order details.
- **Frontend Integration**:
  - **Get Payment Gateway Token**: Integrated functionality to fetch the payment token from the backend.
  - **DropIn Component**: Used Braintree Web Drop-in React component for a seamless payment UI.
  - **Handle Payment**: Implemented payment handling logic on the frontend to process transactions.

### 21. **User Orders List**

- **Backend Route**: Added a route to fetch the list of orders for a user.
- **getOrdersController**: Implemented a controller function to retrieve user orders from the database.
- **Frontend Integration**: Developed the user interface to display the list of orders for users.

### 22. **Admin Orders Management**

- **Admin Orders List**: Added a route for admins to fetch and view all user orders.
- **getAllOrdersController**: Implemented a controller function to retrieve all orders from the database for admin management.
- **Update Order Status**: Developed functionality to allow admins to update the status of orders.
- **Frontend Integration**: Created the admin interface to display all orders and update their statuses.

### 23. **User List Management for Admin**

- **Admin User List**: Added a route for admins to fetch and view a list of users.
- **getUsersController**: Implemented a controller function to retrieve users from the database, filtered by role (e.g., role `0` for regular users).
- **Frontend Integration**: Developed the admin interface to display the list of users.
