// Splash Auth Controller (Sign In & Register)
document.addEventListener('DOMContentLoaded', () => {
  const signinView = document.getElementById('signin-view');
  const registerView = document.getElementById('register-view');
  const linkGoRegister = document.getElementById('link-go-register');
  const linkGoLogin = document.getElementById('link-go-login');
  const authAlert = document.getElementById('auth-alert');

  const signinForm = document.getElementById('signin-form');
  const btnSignin = document.getElementById('btn-signin');
  const signinUsername = document.getElementById('signin-username');
  const signinPassword = document.getElementById('signin-password');

  const registerForm = document.getElementById('register-form');
  const btnRegister = document.getElementById('btn-register');
  const regUsername = document.getElementById('reg-username');
  const regPassword = document.getElementById('reg-password');
  const regConfirmPassword = document.getElementById('reg-confirm-password');

  const turnstileBox = document.getElementById('turnstile-box');
  const turnstileSpinner = document.getElementById('turnstile-spinner');
  const turnstileCheck = document.getElementById('turnstile-check');
  const turnstileText = document.getElementById('turnstile-text');

  const btnForgotPassword = document.getElementById('btn-forgot-password');
  const modalForgot = document.getElementById('modal-forgot');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnModalOk = document.getElementById('btn-modal-ok');

  let isTurnstileVerified = false;

  // 1. View Switching (Sign In <-> Register)
  function showView(view) {
    clearAlert();
    if (view === 'register') {
      signinView.classList.remove('active');
      registerView.classList.add('active');
      window.location.hash = 'register';
      document.title = 'Splash • Create Account';
      triggerTurnstile();
    } else {
      registerView.classList.remove('active');
      signinView.classList.add('active');
      window.location.hash = 'login';
      document.title = 'Splash • Sign In';
    }
  }

  // Handle URL hash on load
  if (window.location.hash === '#register' || new URLSearchParams(window.location.search).get('mode') === 'register') {
    showView('register');
  } else {
    showView('login');
  }

  linkGoRegister.addEventListener('click', (e) => {
    e.preventDefault();
    showView('register');
  });

  linkGoLogin.addEventListener('click', (e) => {
    e.preventDefault();
    showView('login');
  });

  // 2. Alert Notification Helper
  function showAlert(message, type = 'error') {
    authAlert.textContent = message;
    authAlert.className = `auth-alert ${type}`;
    authAlert.style.display = 'flex';
  }

  function clearAlert() {
    authAlert.textContent = '';
    authAlert.style.display = 'none';
  }

  // 3. Password Show/Hide Toggle
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const eyeOpen = btn.querySelector('.eye-open');
      const eyeClosed = btn.querySelector('.eye-closed');

      if (input.type === 'password') {
        input.type = 'text';
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
      } else {
        input.type = 'password';
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
      }
    });
  });

  // 4. Cloudflare Turnstile Verification Simulation
  function triggerTurnstile() {
    isTurnstileVerified = false;
    btnRegister.disabled = true;
    turnstileSpinner.style.display = 'block';
    turnstileCheck.style.display = 'none';
    turnstileText.textContent = 'Verifying...';

    setTimeout(() => {
      completeTurnstile();
    }, 1200);
  }

  function completeTurnstile() {
    isTurnstileVerified = true;
    turnstileSpinner.style.display = 'none';
    turnstileCheck.style.display = 'block';
    turnstileText.textContent = 'Success!';
    btnRegister.disabled = false;
  }

  turnstileBox.addEventListener('click', () => {
    if (!isTurnstileVerified) {
      completeTurnstile();
    }
  });

  // 5. Sign In Form Handler
  signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert();

    const username = signinUsername.value.trim();
    const password = signinPassword.value;

    if (!username || !password) {
      showAlert('Please enter both username and password.');
      return;
    }

    setLoading(btnSignin, true);

    try {
      const endpoint = '/api/auth/login';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data && data.success) {
        // Save session
        localStorage.setItem('splash_token', data.token);
        localStorage.setItem('splash_user', JSON.stringify(data.user || { username: username }));

        showAlert('Authenticated successfully! Redirecting...', 'success');

        setTimeout(() => {
          window.location.href = '/portal';
        }, 600);
      } else {
        const errorMsg = (data && data.message) ? data.message : 'Invalid username or password.';
        showAlert(errorMsg, 'error');
      }
    } catch (err) {
      showAlert('Unable to reach authentication server. Please check your connection.', 'error');
    } finally {
      setLoading(btnSignin, false);
    }
  });

  // 6. Register Form Handler
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert();

    if (!isTurnstileVerified) {
      showAlert('Please complete the verification check before continuing.');
      return;
    }

    const username = regUsername.value.trim();
    const password = regPassword.value;
    const confirmPassword = regConfirmPassword ? regConfirmPassword.value : '';

    if (username.length < 3) {
      showAlert('Username must be at least 3 characters.');
      return;
    }

    if (password.length < 6) {
      showAlert('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Passwords do not match. Please verify and re-type.');
      return;
    }

    setLoading(btnRegister, true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          confirmPassword: confirmPassword
        })
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data && data.success) {
        // Save session immediately
        if (data.token) {
          localStorage.setItem('splash_token', data.token);
        }
        if (data.user) {
          localStorage.setItem('splash_user', JSON.stringify(data.user));
        }
        showAlert('Account registered! Redirecting to your Access Portal...', 'success');
        setTimeout(() => {
          window.location.href = '/portal';
        }, 800);
      } else {
        const errorMsg = (data && data.message) ? data.message : 'Registration could not be completed.';
        showAlert(errorMsg, 'error');
      }
    } catch (err) {
      showAlert('Failed to contact server for registration. Please try again.', 'error');
    } finally {
      setLoading(btnRegister, false);
    }
  });

  // Helper: Loading Spinner on button
  function setLoading(btn, isLoading) {
    const textSpan = btn.querySelector('.btn-text');
    const spinnerSpan = btn.querySelector('.btn-spinner');
    if (isLoading) {
      btn.disabled = true;
      textSpan.style.opacity = '0';
      spinnerSpan.style.display = 'block';
    } else {
      btn.disabled = false;
      textSpan.style.opacity = '1';
      spinnerSpan.style.display = 'none';
    }
  }

  // Helper: Persistent Device ID
  function getOrCreateDeviceId() {
    let devId = localStorage.getItem('splash_device_id');
    if (!devId) {
      devId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('splash_device_id', devId);
    }
    return devId;
  }

  // 7. Forgot Password Modal Listeners
  btnForgotPassword.addEventListener('click', (e) => {
    e.preventDefault();
    modalForgot.style.display = 'flex';
  });

  function closeModal() {
    modalForgot.style.display = 'none';
  }

  btnCloseModal.addEventListener('click', closeModal);
  btnModalOk.addEventListener('click', closeModal);
  modalForgot.querySelector('.auth-modal-backdrop').addEventListener('click', closeModal);
});
