import {
  startRegistration,
  startAuthentication
} from 'https://cdn.jsdelivr.net/npm/@simplewebauthn/browser/+esm';

const BACKEND_URL = 'https://your-backend.onrender.com'; // 👈 Replace this

const log = (msg) => {
  const el = document.createElement('li');
  el.textContent = msg;
  document.getElementById('messages').prepend(el);
};

// Create user account
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;

  const res = await fetch(`${BACKEND_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  log(await res.text());
});

// Register a passkey
document.getElementById('register-passkey-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('passkey-username').value;

  try {
    const challengeRes = await fetch(`${BACKEND_URL}/register-challenge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const options = await challengeRes.json();

    const attResp = await startRegistration(options);

    const verificationRes = await fetch(`${BACKEND_URL}/register-verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, response: attResp }),
    });

    log(await verificationRes.text());
  } catch (err) {
    console.error(err);
    log('Passkey registration failed.');
  }
});

// Login with passkey
document.getElementById('login-passkey-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;

  try {
    const challengeRes = await fetch(`${BACKEND_URL}/login-challenge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const options = await challengeRes.json();

    const assertion = await startAuthentication(options);

    const verificationRes = await fetch(`${BACKEND_URL}/login-verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, response: assertion }),
    });

    log(await verificationRes.text());
  } catch (err) {
    console.error(err);
    log('Passkey login failed.');
  }
});
