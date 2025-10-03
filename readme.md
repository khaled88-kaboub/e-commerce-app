# E-commerce application workshop

---

## 1.Introduction

---

This is a simple workshop for implementing an e-commerce application using fullstack MERN stack

## Features

---

- Browse and filter products
- Add items to a persistent shopping cart
- Log in / register to save cart and order history
- Complete checkout via form
- (Optional) Integrate Stripe for real payment processing

## Technologies used

---

Backend: Node.js with Express
Frontend: React, Axios

## Getting started

---

### Prerequisites :

- Node.js
- npm

### Setup

**backend**

1. Navigate to the backend
   `cd ./backend`
2. Install the dependencies
   `npm install`
3. Run the server
   `node server.js`

**frontend**

1. Navigate to the frontend
   `cd ./frontend`
2. Install the dependencies
   `npm install`
3. Run the frontend client
   `npm run dev`

## API Endpoints

---

**1. Authentication of user**

- `GET /api/auth/me` : Get current logged-in user (protected route)
- `POST /api/auth/register` : Register new user
- `POST /api/auth/login` : Log in existing user
- `POST /api/auth/logout` : Log out user (clear token on client)

**2. Product listing & filtering**

- `GET /api/products` : Fetch all products (optionally filtered)
- `GET /api/products/categories` : Get unique categories for dropdown filter
- `GET /api/products/:id` : Get single product by ID

**3. Shopping cart System**

- `GET /api/cart ` : Get current user’s cart
- `POST /api/cart/add ` : Add or update item in cart
- `PUT /api/cart/:productId ` : Update quantity of specific item
- `DELETE /api/cart/:productId ` : Remove item from cart
- `DELETE /api/cart ` : Clear entire cart (used after successful checkout or empty all cart)

**4. Checkout flow**

- `POST /api/orders` : Create new order from cart
- `GET /api/orders` : Get current user’s order history
- `GET /api/orders/:id` :Get single order details (for order confirmation page)

**5. Stripe Payment**

- `POST /api/create-payment-intent` : Create Stripe PaymentIntent for secure checkout
- `POST /api/webhook` : Handle Stripe webhook events (e.g., payment succeeded)
