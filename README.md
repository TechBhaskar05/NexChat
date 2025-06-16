# NexChat

A **real-time one-on-one chat application** built with the MERN stack, enhanced by **Socket.io** for instant messaging, **TailwindCSS & DaisyUI** for styling, and **Zustand** for global state management. NexChat supports secure authentication, online-status tracking, and is production-ready for seamless deployment.

---

## 🚀 Features

* **User Authentication & Authorization**: Secure JWT-based signup, login, and protected routes.
* **Real-time Messaging**: Instant one-on-one chat powered by Socket.io.
* **Online Status**: Visual indicators to show which users are currently online.
* **Message History & Pagination**: Scroll through past conversations with efficient data loading.
* **Global State Management**: Lightweight state handling with Zustand.
* **Responsive UI**: Built with React, TailwindCSS, and DaisyUI for a modern, mobile-friendly interface.
* **Error Handling**: Graceful client- and server-side error management.
* **Image & Media Support**: Easily extendable to support file or media sharing.
* **Theme Support**: Choose from 35 different UI themes to customize the look and feel.

---

## 🛠️ Tech Stack

* **Frontend**:

  * React 19
  * Vite
  * React Router DOM
  * TailwindCSS + DaisyUI
  * Zustand (state management)
  * Axios (HTTP requests)
  * Socket.io Client
  * React Hot Toast (notifications)

* **Backend**:

  * Node.js + Express.js
  * MongoDB + Mongoose
  * Socket.io Server
  * JWT (authentication)
  * Bcrypt.js (password hashing)
  * Cloudinary (optional media storage)
  * CORS & Cookie-Parser

---

#### Environment Variables

Create a `.env` in `backend`:

```ini
PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<cloud_name>   # optional
CLOUDINARY_API_KEY=<api_key>         # optional
CLOUDINARY_API_SECRET=<api_secret>   # optional
NODE_ENV=development
```

---


## 👤 Author

**Pratyush Bhaskar**
[GitHub Profile](https://github.com/TechBhaskar05)

---

*Happy Coding!*
