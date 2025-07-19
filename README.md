# 🏆 Leaderboard App

A beautiful, mobile-first leaderboard application with real-time point claiming and ranking system.

## ✨ Features

- **Modern UI Design**: Purple gradient background with glassmorphism effects
- **Mobile-First**: Responsive design that works great on all devices
- **Real-time Updates**: Live leaderboard updates when points are claimed
- **User Management**: Add new users and select existing ones
- **Point System**: Random point claiming with visual feedback
- **Beautiful Animations**: Smooth transitions and hover effects

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with your MongoDB connection string
echo "MONGODB_URI=your_mongodb_connection_string_here" > .env
echo "PORT=5001" >> .env

# Start the backend server
npm start
```

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

### 3. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## 🎨 Design Features

- **Purple Gradient Background**: Beautiful gradient from blue to purple
- **Trophy Section**: Central trophy icon with settlement timer
- **Top 3 Cards**: Special gradient cards for the top 3 users
- **Glassmorphism Effects**: Translucent cards with backdrop blur
- **Responsive Layout**: Works perfectly on mobile and desktop
- **Smooth Animations**: Hover effects and transitions

## 📱 Mobile App Design

The UI is inspired by modern mobile gaming apps with:
- Tab navigation for different ranking periods
- Card-based layout for user rankings
- Fire icons for points display
- Emoji decorations for user names
- Settlement countdown timer
- Rewards button

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/leaderboard
PORT=5001
```

### Frontend Proxy

The frontend is configured to proxy API requests to the backend at `http://localhost:5001`.

## 📊 API Endpoints

- `GET /users` - Get all users sorted by points
- `POST /users` - Add a new user
- `POST /claim` - Claim random points for a user
- `GET /claim/history` - Get claim history

## 🎯 How to Use

1. **Add Users**: Use the "Add New User" section to create users
2. **Select User**: Choose a user from the dropdown
3. **Claim Points**: Click "Claim Points" to earn random points
4. **Watch Rankings**: See users climb the leaderboard in real-time

## 🛠️ Technologies Used

- **Frontend**: React, Material-UI, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Styling**: CSS-in-JS with Material-UI styled components
- **Icons**: Material-UI Icons

## 🎨 Customization

You can easily customize the design by modifying:
- Color schemes in the styled components
- Gradient backgrounds
- Card layouts and animations
- Typography and spacing

## 🚀 Deployment

### Backend Deployment
- Deploy to Heroku, Vercel, or any Node.js hosting platform
- Set environment variables for MongoDB connection
- Update CORS settings if needed

### Frontend Deployment
- Build the project: `npm run build`
- Deploy to Netlify, Vercel, or any static hosting platform
- Update API URLs for production

## 📝 License

This project is open source and available under the MIT License.

---

**Enjoy building your leaderboard! 🏆** 