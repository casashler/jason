const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Serve modal content
app.get('/helpModal.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'help.html')));
app.get('/loginModal.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/registerModal.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));

// Handle form submissions (example)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // authenticate user
  res.send('Logged in (simulate)');
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // save user
  res.send('Registered (simulate)');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
document.getElementById('openLoginModal').addEventListener('click', () => {
  document.getElementById('loginModal').style.display = 'block';
});
document.getElementById('openLoginModal').addEventListener('click', (e) => {
  e.preventDefault(); // this stops navigation to "#"
  document.getElementById('loginModal').style.display = 'block';
});
function openModal(modalType) {
  document.getElementById('modalOverlay').style.display = 'block';

  fetch(`${modalType}.html`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.text();
    })
    .then(html => {
      document.getElementById('modalBody').innerHTML = html;
    })
    .catch(err => {
      console.error('Failed to load modal:', err);
      document.getElementById('modalBody').innerHTML = `<p style="color:red;">Failed to load modal: ${modalType}</p>`;
    });
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  const icon = document.getElementById('icon');
  
  if (document.body.classList.contains('dark')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
  
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}
