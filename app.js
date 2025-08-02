import { Hanko } from 'https://cdn.jsdelivr.net/npm/@teamhanko/hanko-elements@latest/dist/elements.mjs';

// Your Hanko configuration
const HANKO_API_URL = 'https://passkeys.hanko.io/5de5bb77-9895-45d6-bd23-47ef1c757c25';
const TENANT_ID = '5de5bb77-9895-45d6-bd23-47ef1c757c25';
const API_KEY = '29b1b74b-d4c7-40bc-b4c1-0c9ab5aef540';

const hanko = new Hanko(HANKO_API_URL, {
  apiKey: API_KEY
});

const log = (msg) => {
  const el = document.createElement('li');
  el.textContent = msg;
  document.getElementById('messages').prepend(el);
};

// Create user account with email/password (optional - Hanko supports passwordless)
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('reg-username').value; // Using email instead of username
  const password = document.getElementById('reg-password').value;

  try {
    // Create user with Hanko
    const user = await hanko.user.create({
      email: email,
      password: password
    });
    
    log(`User created successfully: ${user.email}`);
  } catch (error) {
    console.error('Registration error:', error);
    log(`Registration failed: ${error.message}`);
  }
});

// Register a passkey with Hanko
document.getElementById('register-passkey-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('passkey-username').value; // Using email

  try {
    // Start passkey registration with Hanko
    const credential = await hanko.webauthn.register({
      email: email
    });

    log(`Passkey registered successfully for: ${email}`);
    console.log('Credential:', credential);
  } catch (error) {
    console.error('Passkey registration error:', error);
    log(`Passkey registration failed: ${error.message}`);
  }
});

// Login with passkey using Hanko
document.getElementById('login-passkey-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-username').value;

  try {
    // Authenticate with Hanko passkey
    const token = await hanko.webauthn.authenticate({
      email: email
    });

    log(`Login successful for: ${email}`);
    log(`JWT Token received: ${token.substring(0, 50)}...`);
    
    // Store token for authenticated requests
    localStorage.setItem('hanko_token', token);
    
    // You can now use this token for authenticated API calls
    const userInfo = await hanko.user.getCurrent();
    log(`Welcome back, ${userInfo.email}!`);
    
  } catch (error) {
    console.error('Passkey login error:', error);
    log(`Passkey login failed: ${error.message}`);
  }
});
