const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const loginButton = document.getElementById('login-submit');
loginButton.onclick = function() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    var cont = 0;
    if (username === '' || password === '') {
        alert('Please fill in both fields.');
        cont++;
        return;
    }
    else{
        localStorage.setItem('username', username);
        localStorage.setItem('lastLogin', new Date().toLocaleString());
        window.location.href = 'profile.html';
        alert('Login successful!');
    }
};
showSignup.onclick = function() {
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
    showSignup.classList.add('hidden');
    showLogin.classList.remove('hidden');
};
showLogin.onclick = function() {
     signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    showLogin.classList.add('hidden');
    showSignup.classList.remove('hidden');
};
var pass = document.getElementById('signup-password');
var confirmPass = document.getElementById('signup-password2');
const signupButton = document.getElementById('signup-submit');
var username = document.getElementById('signup-username');
var email = document.getElementById('signup-email');
signupButton.onclick = function() {
    if (username.value === '' || email.value === '' || pass.value === '' || confirmPass.value === '') {
        alert('Please fill in all fields.');
        return;
    }else{
    if (pass.value !== confirmPass.value) {
        alert('Passwords do not match!');
        return;
    }
    alert('Signup successful!');
    }
};
const nightModeButton = document.getElementById('night-mode-toggle');
nightModeButton.onclick = function() {
    if (document.body.classList.contains('night-mode')) {
        document.body.classList.remove('night-mode');
        document.body.classList.add('day-mode');
        nightModeButton.textContent = 'Night Mode';
    } else {
        document.body.classList.remove('day-mode');
        document.body.classList.add('night-mode');
        nightModeButton.textContent = 'Day Mode';
    }
};