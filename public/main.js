const api = 'http://localhost:3000/api';

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${api}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem('isAdmin', data.isAdmin);
    localStorage.setItem('userId', data.userId);
    window.location.href = 'dashboard.html';
  } else {
    alert('Login Failed');
  }
}

async function register() {
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;

  const res = await fetch(`${api}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    alert('Registered! Now login.');
    document.getElementById('registerSection').style.display = 'none';
  }
}

function showRegister() {
  document.getElementById('registerSection').style.display = 'block';
}
