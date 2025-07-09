# Dev-Connect
# 🚀 Project Portfolio App

A full-stack web application where users can create, edit, and manage their project portfolios. Users can add project details, technology stacks, comment on others' projects, and edit or delete their own comments and projects.

---

## ✨ Features

- 🔐 User authentication (JWT-based)
- 📝 Create, update, and delete projects
- 🛠️ Add technology stack to each project
- 💬 Comment on projects
  - View, post
- 🧠 View & Edit project in a dedicated route (`/projects/:id/edit`)
- 🕒 Timestamps for all comments
- 📦 Responsive & user-friendly UI

---

## 🛠 Tech Stack

### 🔹 Frontend:
- React
- Tailwind CSS
- Axios
- Day.js
- React Router

### 🔸 Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication

---

## 🔧 Setup Instructions

### 1. Clone the repository


git clone https://github.com/your-username/project-portfolio-app.git
cd project-portfolio-app

### 2. Install dependencies
# For frontend
cd frontend
npm install

# For backend
cd backend
npm install

### 3. Environment Variables
## Create a .env file inside the backend/ directory:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

## Create a .env file inside the frontend/ directory:
VITE_API_URL=http://localhost:5000

### 4. Run the app
# Start backend
cd backend
npm run dev

# Start frontend
cd frontend
npm run dev