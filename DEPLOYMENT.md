# Deployment Guide

This guide covers deploying your passkey authentication system to production using GitHub Pages for the frontend and Render for the backend.

## 🌐 Frontend Deployment (GitHub Pages)

GitHub Pages provides free static hosting, perfect for our frontend.

### Step 1: Prepare Your Repository

1. **Create a new GitHub repository**:
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it something like `passkey-auth-frontend`
   - Make it public (required for free GitHub Pages)

2. **Upload frontend files**:
   ```bash
   git init
   git add index.html script.js styles.css
   git commit -m "Initial frontend commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/passkey-auth-frontend.git
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Select **main** branch and **/ (root)** folder
6. Click **Save**

### Step 3: Configure Your Frontend

1. **Get your GitHub Pages URL**: `https://YOUR_USERNAME.github.io/passkey-auth-frontend`

2. **Update the API endpoint** in `script.js`:
   ```javascript
   const CONFIG = {
       API_BASE: 'https://your-backend-name.onrender.com/api', // Replace with your Render URL
   };
   ```

3. **Commit and push the changes**:
   ```bash
   git add script.js
   git commit -m "Update API endpoint for production"
   git push
   ```

### Step 4: Test Your Frontend

- Wait 5-10 minutes for GitHub Pages to deploy
- Visit your URL: `https://YOUR_USERNAME.github.io/passkey-auth-frontend`
- The frontend should load (backend functionality won't work until deployed)

---

## 🚀 Backend Deployment (Render)

Render provides excellent Node.js hosting with automatic deployments.

### Step 1: Prepare Backend Repository

1. **Create another GitHub repository**:
   - Name it `passkey-auth-backend`
   - Can be private

2. **Upload backend files**:
   ```bash
   # In a new directory
   git init
   git add server.js package.json .env.example
   git commit -m "Initial backend commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/passkey-auth-backend.git
   git push -u origin main
   ```

### Step 2: Deploy on Render

1. **Sign up for Render**:
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create a new Web Service**:
   - Click **New +** → **Web Service**
   - Connect your GitHub account
   - Select your `passkey-auth-backend` repository

3. **Configure the service**:
   ```
   Name: passkey-auth-backend (or your preferred name)
   Environment: Node
   Region: Choose closest to your users
   Branch: main
   Build Command: npm install
   Start Command: npm start
   ```

### Step 3: Set Environment Variables

In your Render dashboard, go to **Environment** and add:

```env
NODE_ENV=production
RP_NAME=Passkey Authentication System
RP_ID=YOUR_USERNAME.github.io
ORIGIN=https://YOUR_USERNAME.github.io/passkey-auth-frontend
FRONTEND_URL=https://YOUR_USERNAME.github.io/passkey-auth-frontend
```

**Important**: Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 4: Deploy and Test

1. **Deploy**: Render will automatically deploy your service
2. **Get your backend URL**: Something like `https://passkey-auth-backend-abc123.onrender.com`
3. **Test the API**: Visit `https://your-backend-url.onrender.com/api/health`

---

## 🔧 Final Configuration

### Update Frontend with Backend URL

1. **Edit `script.js`** in your frontend repository:
   ```javascript
   const CONFIG = {
       API_BASE: 'https://your-actual-backend-url.onrender.com/api',
   };
   ```

2. **Commit and push**:
   ```bash
   git add script.js
   git commit -m "Update backend URL"
   git push
   ```

### Update Backend CORS Settings

Your backend should already be configured correctly, but verify in `server.js`:

```javascript
app.use(cors({
    origin: process.env.FRONTEND_URL || 'https://YOUR_USERNAME.github.io/passkey-auth-frontend',
    credentials: true
}));
```

---

## 🔒 Security Considerations

### Environment Variables

**Never commit `.env` files to Git**. Always use:
- `.env.example` for templates
- Render's environment variables for production secrets

### HTTPS Requirements

WebAuthn requires HTTPS in production:
- ✅ GitHub Pages automatically provides HTTPS
- ✅ Render automatically provides HTTPS
- ⚠️ Localhost works without HTTPS for development

### Domain Configuration

Ensure your `RP_ID` matches your domain:
```env
# For GitHub Pages
RP_ID=YOUR_USERNAME.github.io

# For custom domain
RP_ID=yourdomain.com
```

---

## 🚨 Troubleshooting

### Common Deployment Issues

**Frontend not loading**:
- Check GitHub Pages is enabled
- Verify files are in the root directory
- Wait 5-10 minutes for propagation

**Backend not responding**:
- Check Render logs in the dashboard
- Verify environment variables are set
- Ensure `package.json` has correct start script

**CORS errors**:
- Verify `FRONTEND_URL` matches your GitHub Pages URL exactly
- Check for trailing slashes consistency
- Ensure both HTTP and HTTPS protocols match

**WebAuthn errors in production**:
- Verify `RP_ID` matches your domain (without protocol)
- Ensure `ORIGIN` includes the full URL with protocol
- Check browser console for detailed error messages

### Debug Steps

1. **Check backend health**:
   ```bash
   curl https://your-backend.onrender.com/api/health
   ```

2. **Verify CORS**:
   ```bash
   curl -H "Origin: https://your-frontend.github.io"         -H "Access-Control-Request-Method: POST"         -H "Access-Control-Request-Headers: Content-Type"         -X OPTIONS         https://your-backend.onrender.com/api/register/begin
   ```

3. **Check environment variables**:
   - In Render dashboard → Environment tab
   - Verify all required variables are set

---

## 🔄 Automatic Deployments

### GitHub Pages

- Automatically deploys when you push to `main` branch
- Usually takes 2-5 minutes to update
- No additional configuration needed

### Render

- Automatically deploys when you push to connected branch
- Usually takes 2-10 minutes depending on build time
- You can view build logs in real-time

### Custom Domains (Optional)

**GitHub Pages**:
1. Go to repository Settings → Pages
2. Add your custom domain
3. Enable "Enforce HTTPS"

**Render**:
1. Go to service Settings → Custom Domains
2. Add your domain
3. Update DNS records as instructed

---

## 📊 Monitoring

### Basic Monitoring

**Render provides**:
- Automatic health checks
- Resource usage monitoring
- Error logs and metrics
- Uptime monitoring

**GitHub Pages provides**:
- Basic traffic analytics
- Deployment status
- Build logs

### Enhanced Monitoring (Optional)

Consider adding:
- Error tracking (Sentry)
- Analytics (Google Analytics)
- Uptime monitoring (UptimeRobot)
- Performance monitoring (Lighthouse CI)

---

## 💰 Cost Considerations

### Free Tiers

**GitHub Pages**:
- ✅ Completely free for public repositories
- ✅ Custom domain support
- ✅ Automatic SSL certificates

**Render**:
- ✅ Free tier available (with limitations)
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ Takes ~1 minute to spin back up

### Paid Options

**Render Pro** ($7/month):
- No spin-down
- Better performance
- More resources
- Custom domains included

---

## 🎯 Production Checklist

Before going live, ensure:

- [ ] Environment variables are properly set
- [ ] HTTPS is working on both frontend and backend
- [ ] CORS is configured correctly
- [ ] WebAuthn domains match exactly
- [ ] Error handling works properly
- [ ] Frontend UI is responsive
- [ ] All API endpoints respond correctly
- [ ] Debug endpoints are disabled in production
- [ ] Security headers are configured
- [ ] Monitoring is set up

---

## 🔄 Updates and Maintenance

### Updating the Application

**Frontend updates**:
1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Wait for automatic deployment

**Backend updates**:
1. Make changes locally
2. Test with local frontend
3. Commit and push to GitHub
4. Wait for Render to rebuild and deploy

### Backup Considerations

**Important**: The current implementation uses in-memory storage. For production, consider:
- Adding a database (PostgreSQL on Render)
- Implementing regular backups
- Adding data export functionality

---

This completes your deployment setup! Your passkey authentication system should now be live and accessible worldwide.