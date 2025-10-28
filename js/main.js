// Simple UI logic + local-storage fake auth for demo purposes
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const message = document.getElementById('message');

    function showMsg(text, type = 'info') {
        message.textContent = text;
        message.className = 'message show';
        if (type === 'success') message.style.border = '1px solid rgba(16,185,129,0.12)';
        if (type === 'error') message.style.border = '1px solid rgba(239,68,68,0.12)';
        setTimeout(() => { message.className = 'message'; }, 4000);
    }

    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    });
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
    });

    // Signup: store a simple user in localStorage (demo only)
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim().toLowerCase();
        const pass = document.getElementById('signupPass').value;
        const pass2 = document.getElementById('signupPass2').value;

        if (!name || !email || !pass) return showMsg('Please fill all fields', 'error');
        if (pass.length < 6) return showMsg('Password must be at least 6 characters', 'error');
        if (pass !== pass2) return showMsg('Passwords do not match', 'error');

        const users = JSON.parse(localStorage.getItem('demo_users') || '{}');
        if (users[email]) return showMsg('Email already registered', 'error');

        users[email] = { name, pass };
        localStorage.setItem('demo_users', JSON.stringify(users));
        showMsg('Account created! You can now sign in.', 'success');

        // switch to login after short delay
        setTimeout(() => {
            signupForm.reset();
            signupForm.classList.remove('active');
            loginForm.classList.add('active');
        }, 900);
    });

    // Login: validate against localStorage
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim().toLowerCase();
        const pass = document.getElementById('loginPass').value;
        const users = JSON.parse(localStorage.getItem('demo_users') || '{}');

        if (!email || !pass) return showMsg('Please fill all fields', 'error');

        if (users[email] && users[email].pass === pass) {
            showMsg(`Welcome back, ${users[email].name || 'user'}!`, 'success');
            // Demo: simulate a "logged in" state
            setTimeout(() => {
                alert(`Demo: logged in as ${email}. (This is a simple demo using localStorage.)`);
                loginForm.reset();
            }, 600);
        } else {
            showMsg('Invalid email or password', 'error');
        }
    });

    // default view: login
    loginForm.classList.add('active');
});
