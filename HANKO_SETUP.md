# Hanko Passkey Integration Setup

## Configuration Details

Your Hanko setup is now configured with:
- **API URL**: `https://passkeys.hanko.io/5de5bb77-9895-45d6-bd23-47ef1c757c25`
- **JWKS URL**: `https://passkeys.hanko.io/5de5bb77-9895-45d6-bd23-47ef1c757c25/.well-known/jwks.json`
- **Tenant ID**: `5de5bb77-9895-45d6-bd23-47ef1c757c25`
- **API Key**: `29b1b74b-d4c7-40bc-b4c1-0c9ab5aef540`

✅ **Configuration is complete!** Your app.js is now configured with your actual Hanko credentials.

## How It Works

1. **User Registration**: Create a user account with email (password is optional for fallback)
2. **Passkey Registration**: Register a passkey for passwordless authentication
3. **Passkey Login**: Login using the registered passkey

## Features

- ✅ Passwordless authentication with passkeys
- ✅ Email-based user identification
- ✅ JWT token management
- ✅ Cross-platform passkey support
- ✅ Simplified API compared to raw WebAuthn

## Domain Configuration

Make sure to configure your domain in the Hanko dashboard:
- For local development: `http://localhost:3000` (or your port)
- For production: your actual domain

## Testing

1. Open `index.html` in a browser
2. Register a user with an email address
3. Register a passkey for that email
4. Try logging in with the passkey

## Security Notes

- Passkeys are stored securely by the browser/OS
- JWT tokens are returned for authenticated API calls
- No passwords are stored or transmitted (when using passkeys only)
