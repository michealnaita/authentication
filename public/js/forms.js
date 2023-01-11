// TODO:  alert user about the errors
const form = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');

const route = window.location.pathname.split('/')[1];

logoutBtn &&
  logoutBtn.addEventListener('click', async () => {
    try {
      const res = await fetch('/' + route + '/logout');
      const data = await res.json();
      if (data.success) {
        location.href = '/';
      } else {
        window.alert(data.error_message);
      }
    } catch (e) {
      window.alert(e.error_message);
      console.log(e);
    }
  });
form &&
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    try {
      const res = await fetch('/' + route + '/login', {
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        location.href = '/' + route;
      } else {
        throw new Error(data.error_message);
      }
    } catch (e) {
      window.alert('Wrong Credentials');
    }
  });
