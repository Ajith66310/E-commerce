# 👗 MERN Fashion E-Commerce Website

A **modern full-stack Fashion E-Commerce application** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
It provides a seamless shopping experience with **Google Authentication**, **User Profiles**, **Wishlist**, **Cart**, **Secure Payments**, and a **powerful Admin Dashboard** for management and analytics.

---

## 🚀 Features

### 👩‍💻 User Features
- 🔐 **JWT + Google Login Authentication**
- 🧍 Create and update your **User Profile**
- 🛍️ Browse trending fashion products
- 💖 Add and manage items in **Wishlist**
- 🛒 **Add to Cart** and **checkout securely**
- 💳 **Razorpay** integration for online payments
- 🕐 Cancel orders within **1 hour** of purchase
- 📦 Track **order history and status**
- 📍 **Delivery eligibility check** (restricts beyond 5 km)
- ⚡ Smooth **GSAP + Framer Motion** animations
- ☁️ **Cloudinary** for optimized image storage
- ✉️ **Resend + Nodemailer** for email confirmations

---

### 🛠️ Admin Features
- 🔑 Secure Admin Login
- 🧾 Product Management (Add / Edit / Delete)
- 👥 User Management (Add / Remove Admins & Users)
- 📦 Order Tracking & Status Updates
- 📉 Stock Management (In Stock / Out of Stock)
- 📊 Analytics Dashboard (Sales · Users · Revenue · Products)
- 📨 Email notifications for order updates
- ⚙️ Redis caching for faster performance

---

## 🧱 Tech Stack

### 💻 Frontend
- **React 19**  
- **React Router DOM 7**  
- **Tailwind CSS 4**  
- **Axios**  
- **Framer Motion 12**  
- **GSAP 3**  
- **Lucide React / React Icons**  
- **Recharts** (Analytics)  
- **Swiper.js** (Product carousels)  
- **Material Tailwind UI 2**  

### 🌐 Backend
- **Node.js + Express 5**
- **MongoDB + Mongoose 8**
- **JWT Authentication**
- **Google OAuth 2.0** (`@react-oauth/google`, `google-auth-library`)
- **Razorpay Payments**
- **Cloudinary + Multer** (Image Uploads)
- **Nodemailer + Resend** (Transactional Emails)
- **ioredis 5** (Caching)
- **bcrypt 6** (Password Hashing)
- **CORS + Cookie Parser + Dotenv**

### 🧩 Other Tools
- **Vite** (Frontend bundler)
- **ESLint + Prettier**
- **Git & GitHub**
- **Nodemon** (Development)
- **Streamifier** (Buffer to stream conversion)

---

## 📂 Project Structure
FASHION-ECOMMERCE/
│
├── admin/ # Admin Panel (React + Vite)
│ └── src/
│ ├── assets/ # Images, Logos, Icons
│ ├── components/ # Sidebar, Navbar, Cards, Tables
│ └── pages/ # Products, Orders, Analytics, Users
│
├── backend/ # Node.js + Express + MongoDB API
│ ├── config/ # DB connection, Redis setup
│ ├── controllers/ # Core logic (Auth, Products, Orders)
│ ├── middleware/ # Auth & Error handling
│ ├── models/ # MongoDB Schemas
│ ├── routes/ # API Routes
│ ├── templates/ # Email templates (Resend/Nodemailer)
│ └── utils/ # JWT, Validators, Helpers
│
├── frontend/ # User Frontend (React + Vite)
│ └── src/
│ ├── assets/ # Banners, Product Images
│ ├── components/ # Navbar, Footer, ProductCard, etc.
│ ├── context/ # Global State (User, Wishlist, Cart)
│ └── pages/ # Home, Profile, Cart, Wishlist, Checkout, Orders
│
└── README.md # Documentation   

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/Ajith66310/Fashion-Ecommerce.git
cd Fashion-Ecommerce

2️⃣ Frontend Setup

Create a .env file inside frontend/env

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

3️⃣ Backend Setup

Create a .env file inside backend/env

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
REDIS_URL=YOUR_REDIS_CONNECTION_STRING
RESEND_API_KEY=YOUR_RESEND_API_KEY
ADMIN_EMAIL=YOUR_ADMIN_EMAIL
ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD
</code></pre>


  <pre><code>
cd backend
npm install
npm run server
</code></pre>
 
4️⃣ Admin Panel Setup

Create a .env file inside admin/env

<pre><code>
VITE_BACKEND_URL=YOUR_BACKEND_URL
</code></pre>
  <pre><code>
cd admin
npm install
npm run dev
    </code></pre>


