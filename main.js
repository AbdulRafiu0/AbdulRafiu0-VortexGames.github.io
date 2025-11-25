// --- main.js (Simulated Client-Side Authentication) ---

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const accountPage = document.getElementById('page-myaccount');

    // Utility function to get user data from local storage
    const getUsers = () => {
        const users = localStorage.getItem('vortexUsers');
        return users? JSON.parse(users) : {};
    };

    // Utility function to set the current logged-in user state
    const setLoggedInUser = (email) => {
        localStorage.setItem('currentUser', email);
    };

    // --- A. Handle Sign Up (Create Account) ---
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password!== confirmPassword) {
                alert('Registration failed: Passwords do not match!');
                return;
            }

            let users = getUsers();

            if (users[email]) {
                alert('Registration failed: An account with this email already exists.');
                return;
            }

            // SIMULATION: Save user details (username and password) to local storage
            users[email] = {
                username: username,
                password: password, // WARNING: Plain text storage for demo only!
                joinDate: new Date().toLocaleDateString('en-US')
            };
            localStorage.setItem('vortexUsers', JSON.stringify(users));

            alert('Registration successful! Redirecting to login.');
            window.location.href = 'login.html';
        });
    }

    // --- B. Handle Login ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            let users = getUsers();

            const user = users[email];

            // SIMULATION: Check credentials
            if (user && user.password === password) {
                setLoggedInUser(email);
                alert('Login successful! Welcome Commander.');
                window.location.href = 'myaccount.html';
            } else {
                alert('Login failed: Invalid email or password.');
            }
        });
    }

    // --- C. Handle Logout (Used on myaccount.html) ---
    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        alert('You have logged out.');
        window.location.href = 'login.html';
    };

    // Attach logout function to the global scope for myaccount.html
    window.Auth = {
        logout: handleLogout
    };

    // --- D. My Account Page Initialization (Simulated Data Loading) ---
    if (accountPage) {
        const currentUserEmail = localStorage.getItem('currentUser');
        const users = getUsers();
        const user = users[currentUserEmail];

        if (!user) {
            // If no user is logged in, redirect to login page
            window.location.href = 'login.html';
            return;
        }

        // Load profile data into the page
        document.getElementById('user-name').textContent = user.username;
        document.getElementById('user-email').textContent = currentUserEmail;
        document.getElementById('user-date').textContent = `Member since: ${user.joinDate}`;
        document.getElementById('user-avatar').textContent = user.username.substring(0, 2).toUpperCase();
    }
});
