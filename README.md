# LibroKeep - Book Management System

LibroKeep is a modern, full-stack Book Management System built to efficiently track library inventories, manage members, and monitor active book loans. It features a beautifully designed, dynamic dashboard that automatically updates in real-time based on your database.

## 🚀 Live Deployment
**[View Live Application on Vercel](https://librokeep-99j4.vercel.app/)**

---

## ✨ Features
- **Dynamic Analytics Dashboard**: Real-time statistics for Total Books, Currently Borrowed, Overdue Returns, and Active Members.
- **Full CRUD for Books**: Seamlessly add, view, and delete books from your database.
- **Cloud Image Hosting**: Fully integrated with Cloudinary to permanently store and serve book cover images.
- **Detailed Book View**: Click on any book in the dashboard to open a premium, two-column detail page fetching live metadata.
- **Real-Time Filtering**: Search books by title/author and instantly filter active loans by their status (Borrowed/Returned/Overdue).
- **Serverless Ready**: Architected to deploy both frontend and backend seamlessly as a single monorepo on Vercel.

---

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, Vanilla CSS Modules
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **File Storage**: Cloudinary, Multer
- **Hosting**: Vercel (Frontend & Serverless Functions)

---

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/mohammedhasan-prog/Librokeep.git
cd Librokeep
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory based on `.env.example`:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The application will be running at `http://localhost:5173`.

---

## ☁️ Vercel Deployment Workflow

This repository is pre-configured to deploy effortlessly on Vercel via the `vercel.json` file, which hosts the React app and serves the Express backend as Serverless Functions.

1. **Push to GitHub**: Ensure all your latest code is pushed to your GitHub `main` branch.
2. **Import to Vercel**: Log into Vercel, click "Add New Project", and import this repository.
3. **Configure Environment Variables**: In the Vercel deployment settings, expand "Environment Variables" and carefully add all keys from your local `backend/.env` file (`MONGODB_URI`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).
4. **Deploy**: Click Deploy! Vercel will automatically read the `vercel.json` config, build the frontend, and convert the backend into serverless routes mounted at `/api`.

> **Note on MongoDB in Serverless**: The backend is already configured to cache the Mongoose connection locally to prevent Vercel from opening too many database connections during function cold starts.
