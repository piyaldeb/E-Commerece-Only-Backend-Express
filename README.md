E-commerce Backend with MERN Stack
This project is a backend server for an e-commerce website similar to Flipkart, built using the MERN stack (MongoDB, Express, React, Node.js). It includes functionalities for managing users, products, and orders, as well as handling authentication and authorization.

ecommerce-backend/
│
├── config/
│   └── .env
│
├── controllers/
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── Order.js
│   ├── Product.js
│   └── User.js
│
├── routes/
│   ├── order.js
│   ├── product.js
│   └── user.js
│
├── utils/
│   └── generateToken.js
│
├── .gitignore
├── package.json
├── README.md
└── server.js

Features
User Authentication: Register, login, and manage user profiles.
Product Management: CRUD operations for products (admin only).
Order Management: Create and view orders, mark orders as paid.
Secure Routes: Protect routes using JWT authentication.
Admin Features: Admin-only routes for managing products and orders.
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure you follow the coding standards and include relevant tests.

License
This project is licensed under the MIT License. See the LICENSE file for details.
