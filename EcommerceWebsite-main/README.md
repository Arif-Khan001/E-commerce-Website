#  Full Stack E-Commerce Platform

### Modern MERN Stack E-Commerce Website with Admin Dashboard & PayPal Integration

<p align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-13AA52?style=for-the-badge&logo=mongodb&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

</p>

---

# 📖 Project Overview

Rabbit is a **production-ready Full Stack E-Commerce platform** built using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)** that replicates the workflow of a modern online shopping application.

The project was designed to demonstrate how scalable e-commerce systems handle **authentication, product management, shopping carts, checkout, payment processing, order management, and role-based access control** while maintaining a clean and modular architecture.

Unlike a simple CRUD application, Rabbit implements complete business workflows that closely resemble real-world e-commerce platforms. Users can browse products, apply filters, add items to a guest or authenticated cart, securely complete payments through **PayPal Sandbox**, and view their order history. Administrators have access to a dedicated dashboard for managing users, products, inventory, and customer orders.

The application follows a **RESTful architecture** where the React frontend communicates with an Express backend through secured API endpoints protected by **JWT Authentication** and **Role-Based Authorization (RBAC)**. Product images are uploaded using **Multer** and streamed directly to **Cloudinary**, reducing server storage requirements and improving scalability.

State management is handled using **Redux Toolkit**, enabling centralized and predictable application state for authentication, cart operations, and product management. The project also supports **Guest Cart functionality with Cart Merge**, allowing users to continue shopping before logging in without losing their selected products.

---

# 🎯 Objectives

- Build a complete production-style MERN application
- Design scalable REST APIs following industry standards
- Implement secure JWT Authentication and Authorization
- Support both Guest and Authenticated shopping experiences
- Integrate third-party payment gateways using PayPal APIs
- Manage media uploads efficiently using Cloudinary
- Develop an Admin Dashboard for complete business management
- Practice MongoDB schema design and relational document modeling
- Create a responsive and reusable React component architecture

---

# ✨ Core Highlights

```
🛍️ Full Stack MERN Architecture

🔐 Secure JWT Authentication & RBAC

🛒 Guest Cart + Cart Merge After Login

💳 PayPal Payment Integration

☁️ Cloudinary Image Uploads

📦 Complete Order Management System

👨‍💼 Admin Dashboard

🔄 Redux Toolkit State Management

📱 Fully Responsive User Interface

🚀 Production-Oriented Folder Structure

⚡ RESTful API Design

🎯 Modular & Scalable Codebase
```

---

# 🏗️ System Architecture

```
                    ┌─────────────────────┐
                    │     React Client    │
                    │  (Vite + Redux)     │
                    └──────────┬──────────┘
                               │
                               │ REST APIs
                               ▼
                    ┌─────────────────────┐
                    │   Express Server    │
                    │ Authentication      │
                    │ Business Logic      │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
         MongoDB Atlas    PayPal API    Cloudinary
          (Database)       Payments      Image CDN
```

---

# 🔄 Complete User Journey

```
User Visits Website
          │
          ▼
Browse Products
          │
          ▼
Search & Filter Products
          │
          ▼
Select Size & Color
          │
          ▼
Add To Cart
          │
          ▼
Guest/User Cart
          │
          ▼
Login/Register
          │
          ▼
Cart Merge
          │
          ▼
Checkout
          │
          ▼
PayPal Payment
          │
          ▼
Payment Capture
          │
          ▼
Order Creation
          │
          ▼
Order History & Confirmation
```

---

# 💡 Design Principles Used

- Modular Folder Structure
- Separation of Concerns
- RESTful API Design
- Middleware-Based Authentication
- Role-Based Access Control (RBAC)
- Centralized State Management with Redux Toolkit
- Reusable React Components
- Secure Password Hashing
- Environment-Based Configuration
- Scalable MongoDB Document Modeling
- Third-Party Service Integration
- Responsive Mobile-First Design

---

# 🌟 Why This Project?

This project was built to simulate the architecture and functionality of a modern commercial e-commerce application while following industry best practices. It combines frontend development, backend API design, authentication, database modeling, payment gateway integration, image storage, and state management into a single cohesive system.

The project demonstrates practical experience with full-stack development and showcases the ability to build scalable applications that involve multiple interacting services, secure user authentication, complex business logic, and production-oriented deployment practices.

# 🚀 Features

## 👤 Customer Features

```
✅ User Registration & Login
✅ JWT Authentication
✅ Browse Products
✅ Search Products
✅ Product Filtering
✅ Best Seller Collection
✅ New Arrivals
✅ Men's Collection
✅ Women's Collection
✅ Similar Products
✅ Add To Cart
✅ Update Quantity
✅ Remove Items
✅ Guest Cart Support
✅ Cart Merge After Login
✅ Secure Checkout
✅ PayPal Payment
✅ Order Confirmation
✅ Order History
✅ Newsletter Subscription
```

---

## 👨‍💼 Admin Features

```
✅ Admin Dashboard
✅ User Management
✅ Product Management
✅ Order Management
✅ Create Products
✅ Update Products
✅ Delete Products
✅ Update Order Status
```

---

# ⚡ Tech Stack

## 🎨 Frontend

| Technology | Purpose |
|------------|-------------------------|
| React.js | UI Development |
| Vite | Fast Build Tool |
| Redux Toolkit | Global State |
| React Router | Routing |
| Tailwind CSS | Styling |
| Axios | API Calls |
| React Icons | Icons |
| Sonner | Toast Notifications |

---

## ⚙ Backend

| Technology | Purpose |
|------------|-------------------------|
| Node.js | Runtime |
| Express.js | REST APIs |
| JWT | Authentication |
| Middleware | Route Protection |

---

## 🗄 Database

```
MongoDB
│
└── Mongoose ODM
```

---

## ☁️ Image Upload

```
Client
   │
   ▼
Multer
   │
   ▼
Streamifier
   │
   ▼
Cloudinary
```

---

## 💳 Payment Gateway

```
Cart
 │
 ▼
Checkout
 │
 ▼
PayPal Sandbox API
 │
 ▼
Payment Capture
 │
 ▼
Order Creation
```

---

# 📁 Folder Structure

```
Rabbit-Ecommerce/

├── frontend/
│
│   ├── src/
│   │
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── App.jsx
│   └── main.jsx
│
└── backend/

    ├── config/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── data/
    ├── server.js
    └── package.json

README.md
```

---

# 🗄 Database Models

## 👤 User

```
name
email
password
role
```

---

## 📦 Product

```
name
description
price
discountPrice
countInStock
sku
category
brand
sizes
colors
collections
material
gender
images
isFeatured
isPublished
rating
numReviews
tags
metaTitle
metaDescription
metaKeywords
dimensions
weight
```

---

## 🛒 Cart

```
user
guestId
products[]
totalPrice
```

---

## 💳 Checkout

```
user
checkoutItems[]
shippingAddress
paymentMethod
paymentStatus
paymentDetails
isPaid
isFinalized
totalPrice
```

---

## 📦 Order

```
user
orderItems[]
shippingAddress
paymentMethod
paymentStatus
status
isPaid
isDelivered
totalPrice
```

---

## 📧 Subscriber

```
email
subscribedAt
```

---

# 🔐 Authentication Flow

```text
┌──────────────────────┐
│ User Login/Register  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ JWT Token Generated  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Stored in LocalStorage│
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Protected API Calls  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Auth Middleware      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Authorized Access    │
└──────────────────────┘
```

---

# 🛒 Shopping Flow

```text
Browse Products
      │
      ▼
Select Size & Color
      │
      ▼
Add To Cart
      │
      ▼
Guest/User Cart
      │
      ▼
Update Quantity
      │
      ▼
Checkout
```

---

# 💳 Checkout Flow

```text
Cart
 │
 ▼
Shipping Address
 │
 ▼
Create Checkout Session
 │
 ▼
PayPal Payment
 │
 ▼
Payment Capture
 │
 ▼
Finalize Checkout
 │
 ▼
Order Created
 │
 ▼
Cart Cleared
 │
 ▼
Order Confirmation
```

---

# 👨‍💼 Admin Flow

```text
Admin Login
     │
     ▼
JWT Authentication
     │
     ▼
Admin Middleware
     │
     ▼
Dashboard
 ├───────────────┐
 │               │
 ▼               ▼
Users        Products
 │               │
 └──────┬────────┘
        ▼
    Orders
```

---

# 🌐 REST APIs

## 👤 User

| Method | Endpoint |
|------------|----------------------------|
| POST | /api/users/register |
| POST | /api/users/login |
| GET | /api/users/profile |

---

## 📦 Products

| Method | Endpoint |
|------------|----------------------------|
| GET | /api/products |
| GET | /api/products/:id |
| GET | /api/products/new-arrivals |
| GET | /api/products/best-seller |
| GET | /api/products/similar/:id |
| POST | /api/products |
| PUT | /api/products/:id |
| DELETE | /api/products/:id |

---

## 🛒 Cart

| Method | Endpoint |
|------------|----------------------------|
| POST | /api/cart |
| PUT | /api/cart |
| DELETE | /api/cart |
| GET | /api/cart |
| POST | /api/cart/merge |

---

## 💳 Checkout

| Method | Endpoint |
|------------|----------------------------|
| POST | /api/checkout |
| PUT | /api/checkout/:id/pay |
| POST | /api/checkout/:id/finalize |

---

## 📦 Orders

| Method | Endpoint |
|------------|----------------------------|
| GET | /api/orders/my-orders |
| GET | /api/orders/:id |

---

## 👨‍💼 Admin

### Users

```
GET    /api/admin/users
POST   /api/admin/users
PUT    /api/admin/users/:id
DELETE /api/admin/users/:id
```

### Products

```
GET    /api/admin/products
GET    /api/admin/products/:id
PUT    /api/admin/products/:id
DELETE /api/admin/products/:id
```

### Orders

```
GET    /api/admin/orders
PUT    /api/admin/orders/:id
DELETE /api/admin/orders/:id
```

---

# ⚙ Environment Variables

## Backend

```env
PORT=9000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## Frontend

```env
VITE_BACKEND_URL=http://localhost:9000

VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

---

# 💻 Installation

## Clone Repository

```bash
git clone https://github.com/Arif-Khan001/E-commerce-Website.git

cd E-commerce-Website/EcommerceWebsite-main
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

Runs on

```
http://localhost:9000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Runs on

```
http://localhost:5173
```

---

# 🚀 Future Improvements

```
⭐ Product Reviews
⭐ Wishlist
⭐ Coupon System
⭐ Order Tracking
⭐ Email Notifications
⭐ Inventory Analytics
⭐ Sales Dashboard
⭐ Stripe Integration
⭐ Razorpay Integration
⭐ Refresh Token Authentication
⭐ Redis Caching
⭐ Docker Support
⭐ CI/CD Pipeline
⭐ Unit Testing
⭐ Integration Testing
```

---

# 🎯 Key Learning Outcomes

```
✔ MERN Stack Development
✔ RESTful API Design
✔ JWT Authentication
✔ RBAC
✔ Redux Toolkit
✔ CRUD Operations
✔ MongoDB Data Modeling
✔ PayPal Integration
✔ Cloudinary Upload
✔ Protected Routes
✔ Admin Dashboard
✔ Responsive UI
✔ Production Deployment
```

---

<div align="center">

# 👨‍💻 Author

## Arif Khan

### 💻 Tech Stack

**React • Redux Toolkit • Tailwind CSS • Node.js • Express.js • MongoDB • Mongoose • JWT • PayPal API • Cloudinary • REST APIs**

---

### ⭐ If you found this project useful, consider giving it a Star!



</div>
