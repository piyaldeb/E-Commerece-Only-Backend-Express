# E-commerce Backend with MERN Stack

This project is a backend server for an e-commerce website similar to Flipkart, built using the MERN stack (MongoDB, Express, React, Node.js). It includes functionalities for managing users, products, and orders, as well as handling authentication and authorization.

<pre>
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
</pre>

## Features

<ul>
  <li><strong>User Authentication:</strong> Register, login, and manage user profiles.</li>
  <li><strong>Product Management:</strong> CRUD operations for products (admin only).</li>
  <li><strong>Order Management:</strong> Create and view orders, mark orders as paid.</li>
  <li><strong>Secure Routes:</strong> Protect routes using JWT authentication.</li>
  <li><strong>Admin Features:</strong> Admin-only routes for managing products and orders.</li>
</ul>

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/ecommerce-backend.git
    cd ecommerce-backend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the `config/` directory and add the following:
    ```plaintext
    NODE_ENV=development
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the server**:
    ```sh
    npm run server
    ```

### Usage

#### User Authentication

- **Register User**: `POST /api/users/register`
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123"
    }
    ```

- **Login User**: `POST /api/users/login`
    ```json
    {
        "email": "john@example.com",
        "password": "password123"
    }
    ```

- **Get User Profile**: `GET /api/users/profile`
    ```headers
    Authorization: Bearer token
    ```

#### Product Management

- **Get All Products**: `GET /api/products`
- **Create Product**: `POST /api/products` (Admin only)
    ```json
    {
        "name": "Sample Product",
        "description": "Sample description",
        "price": 100,
        "countInStock": 10,
        "imageUrl": "/images/sample.jpg",
        "brand": "Sample brand",
        "category": "Sample category"
    }
    ```

#### Order Management

- **Create Order**: `POST /api/orders`
    ```json
    {
        "orderItems": [
            {
                "product": "product_id",
                "qty": 1
            }
        ],
        "shippingAddress": {
            "address": "123 Street",
            "city": "City",
            "postalCode": "12345",
            "country": "Country"
        },
        "paymentMethod": "PayPal",
        "itemsPrice": 100,
        "shippingPrice": 10,
        "taxPrice": 5,
        "totalPrice": 115
    }
    ```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure you follow the coding standards and include relevant tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

<style>
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
  }
  h1, h2, h3 {
    color: #333;
  }
  ul {
    list-style-type: none;
  }
  pre {
    background-color: #f4f4f4;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  code {
    background-color: #f4f4f4;
    padding: 2px 4px;
    border-radius: 3px;
  }
</style>