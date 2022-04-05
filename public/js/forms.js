// TODO:  alert user about the errors
const form = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');

logoutBtn &&
  logoutBtn.addEventListener('click', async () => {
    try {
      const res = await fetch('/session/logout');
      const data = await res.json();
      if (data.success) {
        location.href = '/session/login';
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  });
form &&
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    console.log(payload);
    try {
      const res = await fetch('/session/login', {
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const resData = await res.json();
      if (resData.success) {
        location.href = '/session';
      } else {
        console.log(resData);
      }
    } catch (e) {
      console.log(e.message);
    }
  });
