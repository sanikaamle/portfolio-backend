# Portfolio Deployment Guide

This guide will help you deploy your portfolio using:
- **MongoDB Atlas** - Database
- **Render** - Node.js + Express Backend
- **Vercel** - React Frontend

## 🗄️ Step 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project

### 1.2 Create Database Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider and region
4. Click "Create"

### 1.3 Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Select "Read and write to any database"
5. Click "Add User"

### 1.4 Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for Render deployment)
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `portfolio_contacts`

Your connection string should look like:
```
mongodb+srv://username:password@cluster.mongodb.net/portfolio_contacts?retryWrites=true&w=majority
```

## 🚀 Step 2: Render Backend Deployment

### 2.1 Create Render Account
1. Go to [Render](https://render.com)
2. Sign up with your GitHub account

### 2.2 Deploy Backend
1. Click "New +" and select "Web Service"
2. Connect your GitHub repository
3. Select the repository containing your portfolio
4. Configure the service:
   - **Name**: `portfolio-backend` (or your preferred name)
   - **Root Directory**: `portfolio-backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 2.3 Add Environment Variables
In your Render service dashboard, go to "Environment" and add:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_contacts?retryWrites=true&w=majority
NODE_ENV=production
PORT=10000
```

### 2.4 Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Copy your service URL (e.g., `https://portfolio-backend.onrender.com`)

## 🌐 Step 3: Vercel Frontend Deployment

### 3.1 Create Vercel Account
1. Go to [Vercel](https://vercel.com)
2. Sign up with your GitHub account

### 3.2 Deploy Frontend
1. Click "New Project"
2. Import your GitHub repository
3. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `portfolio-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 3.3 Add Environment Variables
In your Vercel project settings, go to "Environment Variables" and add:
```
REACT_APP_API_URL=https://your-backend-name.onrender.com
```

### 3.4 Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Your portfolio will be live at `https://your-project-name.vercel.app`

## 🔧 Step 4: Testing Your Deployment

### 4.1 Test Backend
Visit your backend health endpoint:
```
https://your-backend-name.onrender.com/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Portfolio API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 4.2 Test Frontend
1. Visit your Vercel URL
2. Test the contact form
3. Test the book suggestion form
4. Test the visitor feedback form

### 4.3 Check Database
1. Go to MongoDB Atlas
2. Navigate to "Browse Collections"
3. You should see your data being saved

## 🛠️ Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Make sure your backend CORS_ORIGIN includes your Vercel domain
   - Update the environment variable in Render

2. **Database Connection Issues**
   - Verify your MongoDB connection string
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure database user has correct permissions

3. **Environment Variables Not Working**
   - Make sure variable names start with `REACT_APP_` for frontend
   - Redeploy after adding environment variables

4. **Build Failures**
   - Check the build logs in Vercel/Render
   - Ensure all dependencies are in package.json

## 📝 Important Notes

1. **Free Tier Limitations**:
   - Render: Service sleeps after 15 minutes of inactivity
   - MongoDB Atlas: 512MB storage limit
   - Vercel: 100GB bandwidth per month

2. **Security**:
   - Never commit `.env` files to Git
   - Use environment variables for sensitive data
   - Regularly update dependencies

3. **Monitoring**:
   - Set up logging for your backend
   - Monitor your database usage
   - Check Vercel analytics for frontend performance

## 🔄 Updating Your Deployment

### Backend Updates:
1. Push changes to GitHub
2. Render will automatically redeploy
3. Check the deployment logs

### Frontend Updates:
1. Push changes to GitHub
2. Vercel will automatically redeploy
3. Check the deployment status

### Database Updates:
1. Make changes in your local development
2. Test thoroughly
3. Deploy backend changes
4. The database schema will update automatically

## 📞 Support

If you encounter issues:
1. Check the deployment logs
2. Verify environment variables
3. Test locally first
4. Check the official documentation for each service

Your portfolio should now be fully deployed and accessible online! 🎉 