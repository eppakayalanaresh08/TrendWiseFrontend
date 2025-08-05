# 🌐 TrendWise Frontend

Welcome to the frontend of **TrendWise**, a MERN stack-based platform that scrapes trending topics and generates SEO-optimized articles using AI (ChatGPT). This frontend is built using **React**, **React Router**, and **Axios**, and connects with a Node.js + MongoDB backend.

---

![Homepage](screenshots/homepage.png)


## 🔗 Live Demo

- 🌍 **Frontend**: [https://trend-wise-frontend-zeta.vercel.app/](https://trend-wise-frontend-zeta.vercel.app/)
- 🔐 **Admin Panel**: [https://trend-wise-frontend-zeta.vercel.app/admin](https://trend-wise-frontend-zeta.vercel.app/admin)

> **Admin Credentials**  
> 📧 Email: `admin@trendwise.com`  
> 🔑 Password: `admin123`

---

## 🧩 Tech Stack

- ⚛️ React.js (Frontend Framework)
- 🌐 React Router (Routing)
- 🧠 React Helmet Async (SEO Metadata)
- ⚙️ Axios (HTTP requests)
- 🎨 Tailwind CSS (Styling)
- 🔐 Google OAuth (via backend Passport.js)

---

## 📁 Project Structure

```bash
trendwise-frontend/
│
├── public/                  # Static assets
│   └── index.html
│
├── src/                     # React app source
│   ├── assets/              # Icons, images, etc.
│   ├── components/          # Reusable UI components
│   ├── contexts/            # AuthContext, etc.
│   ├── pages/               # Home, Article, Login, Admin pages
│   ├── routes/              # Route handling
│   ├── utils/               # API utilities
│   ├── App.jsx              # Main App entry
│   └── main.jsx             # Vite entry point
│
├── .env                     # Local environment config
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md



---

## 🚀 Features

- 🔍 Trending topic scraping using Puppeteer (via backend)
- 🧠 AI-powered SEO blog generation with OpenAI (ChatGPT)
- 🔐 Google OAuth login system
- ❤️ Like & 💬 Comment on articles
- 🧑‍💼 Admin panel for article management
- 🌐 Meta tag control with Helmet for better SEO

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/eppakayalanaresh08/TrendWiseFrontend
cd TrendWiseFrontend

