const form = document.getElementById('login-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const payload = Object.fromEntries(formData);
  console.log(payload);
});
