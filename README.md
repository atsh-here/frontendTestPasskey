# Passkey Authentication System

A complete, production-ready passkey authentication system using the WebAuthn API. This system provides secure, passwordless authentication with biometric verification.

## 🌟 Features

- **Passwordless Authentication**: Use biometrics, security keys, or platform authenticators
- **Modern UI**: Responsive design that works on desktop and mobile
- **Secure Backend**: Node.js server with proper WebAuthn implementation
- **Cross-Platform**: Works across different devices and browsers
- **Easy Deployment**: Ready for GitHub Pages (frontend) and Render (backend)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed on your system
- A modern browser that supports WebAuthn
- Git (for deployment)

### Local Development

1. **Extract the files** to your desired directory
2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration (default values work for local development)

4. **Start the backend server**:
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

5. **Serve the frontend**:
   - Open `index.html` in your browser, or
   - Use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8080

     # Using Node.js (install globally: npm install -g http-server)
     http-server -p 8080

     # Using PHP
     php -S localhost:8080
     ```

6. **Open your browser** and navigate to:
   - Frontend: `http://localhost:8080` (or just open index.html)
   - Backend API: `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

The system uses environment variables for configuration. Copy `.env.example` to `.env` and modify as needed:

```env
# Basic configuration
NODE_ENV=development
PORT=3000
RP_NAME=Passkey Authentication System
RP_ID=localhost
ORIGIN=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

### Frontend Configuration

Update the API endpoint in `script.js`:

```javascript
const CONFIG = {
    API_BASE: 'http://localhost:3000/api', // Change this for production
};
```

## 🌐 Browser Support

This system works with modern browsers that support WebAuthn:

- ✅ Chrome 67+
- ✅ Firefox 60+
- ✅ Safari 14+
- ✅ Edge 18+

## 📱 Supported Authenticators

- **Platform Authenticators**: Face ID, Touch ID, Windows Hello, Android biometrics
- **Security Keys**: YubiKey, Google Titan, and other FIDO2 devices
- **Hybrid Transport**: QR code authentication with mobile devices

## 🔒 Security Features

- **Phishing Resistant**: Cryptographic verification prevents phishing attacks
- **No Passwords**: Eliminates password-related vulnerabilities
- **Origin Verification**: Ensures requests come from authorized domains
- **Challenge-Response**: Prevents replay attacks
- **User Verification**: Requires biometric or PIN confirmation

## 🛠️ API Endpoints

### Registration
- `POST /api/register/begin` - Start registration process
- `POST /api/register/complete` - Complete registration

### Authentication
- `POST /api/authenticate/begin` - Start authentication
- `POST /api/authenticate/complete` - Complete authentication

### Utility
- `GET /api/health` - Health check

### Debug (Development Only)
- `GET /api/debug/users` - List registered users
- `GET /api/debug/credentials` - List credentials

## 🎯 Usage Flow

### Registration
1. User enters username, email, and display name
2. System generates a challenge
3. Browser creates a new credential using WebAuthn
4. Public key is stored on the server
5. User can now authenticate with their passkey

### Authentication
1. User enters username (optional)
2. System generates an authentication challenge
3. Browser signs the challenge with stored credential
4. Server verifies the signature
5. User is authenticated

## 🔍 Troubleshooting

### Common Issues

**"WebAuthn is not supported"**
- Use a modern browser (Chrome 67+, Firefox 60+, Safari 14+, Edge 18+)
- Ensure you're using HTTPS in production

**"Registration failed"**
- Check that your authenticator is properly set up
- Try a different authenticator type
- Check browser console for detailed errors

**"Authentication failed"**
- Ensure you're using the same device/authenticator used for registration
- Clear browser data and re-register if necessary
- Check that the RP_ID matches your domain

**CORS errors**
- Ensure FRONTEND_URL in .env matches your frontend origin
- Check that your backend is running and accessible

### Debug Mode

In development, you can access debug endpoints:
- `http://localhost:3000/api/debug/users` - View registered users
- `http://localhost:3000/api/debug/credentials` - View stored credentials

## 🏗️ Project Structure

```
passkey-authentication-system/
├── index.html          # Frontend interface
├── script.js           # WebAuthn client logic
├── styles.css          # Responsive styling
├── server.js           # Node.js backend
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── README.md           # This file
└── DEPLOYMENT.md       # Deployment instructions
```

## 🔄 Development

### Adding Features

1. **Database Integration**: Replace in-memory storage with a real database
2. **User Management**: Add profile management, credential management
3. **Enhanced Security**: Add rate limiting, logging, monitoring
4. **Multi-Factor**: Combine with other authentication methods

### Code Structure

- **Frontend**: Vanilla JavaScript with modern async/await patterns
- **Backend**: Express.js with modular route handling
- **Security**: Proper challenge generation and verification
- **Error Handling**: Comprehensive error messages and logging

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review browser console for errors
3. Ensure all dependencies are installed
4. Verify environment configuration
5. Check that you're using a supported browser

## 🔗 Useful Links

- [WebAuthn Guide](https://webauthn.guide/)
- [WebAuthn Specification](https://www.w3.org/TR/webauthn-2/)
- [Can I Use WebAuthn](https://caniuse.com/webauthn)
- [FIDO Alliance](https://fidoalliance.org/)

---

Made with ❤️ for secure, passwordless authentication