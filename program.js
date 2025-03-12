<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teen Patti & Rummy - Authentication</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h2>Login</h2>
        <form id="loginForm">
            <input type="text" id="mobile" placeholder="Enter Mobile Number" required>
            <input type="password" id="password" placeholder="Enter Password" required>
            <button type="submit">Login</button>
        </form>
        <p><a href="forgot-password.html">Forgot Password?</a></p>
        <p>Don't have an account? <a href="register.html">Register</a></p>
    </div>
    
    <div class="container">
        <h2>Register</h2>
        <form id="registerForm">
            <input type="text" id="regMobile" placeholder="Enter Mobile Number" required>
            <input type="password" id="regPassword" placeholder="Enter Password" required>
            <input type="password" id="confirmPassword" placeholder="Confirm Password" required>
            <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="index.html">Login</a></p>
    </div>
    
    <div class="container">
        <h2>Forgot Password</h2>
        <form id="forgotPasswordForm">
            <input type="text" id="forgotMobile" placeholder="Enter Registered Mobile Number" required>
            <button type="submit">Send OTP</button>
        </form>
    </div>
    
    <div class="container" id="otpContainer" style="display: none;">
        <h2>Verify OTP</h2>
        <form id="otpForm">
            <input type="text" id="otp" placeholder="Enter OTP" required>
            <button type="submit">Verify OTP</button>
        </form>
    </div>
    
    <div class="container">
        <h2>Wallet</h2>
        <p>Balance: <span id="walletBalance">0</span></p>
        <button id="refreshWallet">Refresh Balance</button>
        <button id="addCoins">Add Coins</button>
    </div>
    
    <script>
        document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault();
            let mobile = document.getElementById("mobile").value;
            let password = document.getElementById("password").value;
            
            fetch("http://yourserver.com/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mobile: mobile, password: password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Login Successful");
                    window.location.href = "dashboard.html";
                } else {
                    alert("Login Failed: " + data.message);
                }
            });
        });
        
        document.getElementById("registerForm").addEventListener("submit", function(event) {
            event.preventDefault();
            let regMobile = document.getElementById("regMobile").value;
            let regPassword = document.getElementById("regPassword").value;
            let confirmPassword = document.getElementById("confirmPassword").value;
            
            if (regPassword !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            
            fetch("http://yourserver.com/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mobile: regMobile, password: regPassword })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Registration Successful");
                    window.location.href = "index.html";
                } else {
                    alert("Registration Failed: " + data.message);
                }
            });
        });
        
        document.getElementById("forgotPasswordForm").addEventListener("submit", function(event) {
            event.preventDefault();
            let forgotMobile = document.getElementById("forgotMobile").value;
            
            fetch("http://yourserver.com/api/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mobile: forgotMobile })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById("otpContainer").style.display = "block";
                    alert("OTP sent to: " + forgotMobile);
                } else {
                    alert("Failed to send OTP: " + data.message);
                }
            });
        });
        
        document.getElementById("otpForm").addEventListener("submit", function(event) {
            event.preventDefault();
            let otp = document.getElementById("otp").value;
            
            fetch("http://yourserver.com/api/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otp: otp })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("OTP Verified");
                    window.location.href = "reset-password.html";
                } else {
                    alert("OTP Verification Failed: " + data.message);
                }
            });
        });
        
        document.getElementById("refreshWallet").addEventListener("click", function() {
            fetch("http://yourserver.com/api/wallet", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById("walletBalance").textContent = data.balance;
                }
            });
        });
    </script>
</body>
</html>
