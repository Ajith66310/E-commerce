# VestidoClub E-Commerce Website

A **modern full-stack Fashion E-Commerce application** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
It provides a seamless shopping experience with **Google Authentication**, **User Profiles**, **Wishlist**, **Cart**, **Secure Payments**, and a **powerful Admin Dashboard** for management and analytics.


### Features

###  User Features

 -- JWT + Google Login Authentication

 -- Create & update your User Profile

 -- Browse and filter fashion products

 -- Manage your Wishlist

 -- Add to Cart, update quantities, and checkout securely

 -- Razorpay Payment Gateway integration

 -- Track Orders with live status updates 

 -- Real-time updates for stock, order status, and analytics

 -- Cloudinary + Sharp for fast, optimized images

 -- Email confirmations with Resend + Nodemailer

 -- Smooth animations using GSAP + Framer Motion

 -- Redux Toolkit for global state management (User, Cart, Wishlist)


###  Admin Features

 -- Secure Admin Login

 -- Product Management (Add · Edit · Delete)

 -- User Management (Add / Remove Admins & Users)

 -- Live Order Tracking via Socket.io

 -- Analytics Dashboard (Sales · Users · Revenue · Products)

 -- Stock Management (In Stock / Out of Stock)

 -- Email Notifications for Order & Cancellation Updates

 -- Sharp image optimization for all uploads

 -- Real-time notifications and analytics refresh

 -- Review Management System (Add / Remove Reviews)

##  Tech Stack

###  Frontend

 • React 19 + Vite

 • React Router DOM 7

 • Redux Toolkit (State Management)

 • Tailwind CSS 4

 • Axios

 • Framer Motion 12 + GSAP 3

 • Lucide React / React Icons

 • Recharts (Analytics)

 • Swiper.js (Carousels)

### Backend

 • Node.js + Express 5

 • MongoDB + Mongoose 8

 • JWT Authentication

 • Google OAuth 2.0 (@react-oauth/google, google-auth-library)

 • Razorpay Payments

 • Cloudinary + Multer + Sharp (Image Upload & Optimization)

 • Socket.io (Real-time updates)

 • Nodemailer + Resend (Transactional Emails)

 • ioredis 5 

 • bcrypt 6 (Password Hashing)

 • CORS + Cookie Parser + Dotenv

 • Streamifier (Buffer to Stream conversion)

###  Other Tools

- **Vite** (Frontend bundler)
- **ESLint + Prettier**
- **Git & GitHub**
- **Nodemon** (Development)
- **Streamifier** (Buffer to stream conversion)


##  Project Structure
<pre>
  <code>
FASHION-ECOMMERCE/
├── admin/                     # Admin Panel (React + Vite)
│   └── src/
│       ├── assets/            # Images, Logos, Icons
│       ├── components/        # Sidebar, Navbar, Cards, Tables
│       └── pages/             # Products, Orders, Analytics, Users
│
├── backend/                   # Node.js + Express + MongoDB API
│   ├── config/                # DB connection, Redis setup
│   ├── controllers/           # Core logic (Auth, Products, Orders)
│   ├── middleware/            # Auth & Error handling
│   ├── models/                # MongoDB Schemas
│   ├── routes/                # API Routes
│   ├── templates/             # Email templates (Resend/Nodemailer)
│   └── utils/                 # Socket.io
│
├── frontend/                  # User Frontend (React + Vite)
│   └── src/
│       ├── assets/            # Banners, Product Images
│       ├── components/        # Navbar, Footer, ProductCard, etc.
│       ├── context/           # Global State (User, Wishlist, Cart)
│       ├── pages/             # Home, Profile, Cart, Wishlist, Checkout, Orders
│       ├── utils/             # Socket.io
│       └── redux/             # React-redux toolkit
│
└── README.md                  # Documentation
    
  </code>
</pre>
  

##  Installation & Setup

###  Clone the Repository
<pre>
  <code>
git clone https://github.com/Ajith66310/Fashion-E-commerce.git 
cd Fashion-Ecommerce
  </code>
</pre>


 ### Frontend Setup

### Create a .env file inside frontend/env

<pre><code>
VITE_BACKEND_URL=YOUR_BACKEND_URL
VITE_RAZORPAY_KEY_ID=YOUR_RAZORPAY_KEY_ID
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
</code></pre>

<pre><code>
cd frontend
npm install
npm run dev
</code></pre>

### Backend Setup

### Create a .env file inside backend/env

  <pre><code>
PORT=YOUR_PORT_NUMBER
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_JWT_SECRET
CLOUDINARY_NAME=YOUR_CLOUDINARY_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_SECRET_KEY=YOUR_CLOUDINARY_SECRET_KEY
RAZORPAY_KEY_ID=YOUR_RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_RAZORPAY_KEY_SECRET
EMAIL_USER=YOUR_EMAIL
EMAIL_PASS=YOUR_APP_PASSWORD
RESEND_API_KEY=YOUR_RESEND_API_KEY
</code></pre>


  <pre><code>
cd backend
npm install
npm run server
</code></pre>
 
### Admin Panel Setup

### Create a .env file inside admin/env

<pre><code>
VITE_BACKEND_URL=YOUR_BACKEND_URL
</code></pre>
  <pre><code>
cd admin
npm install
npm run dev
    </code></pre>


