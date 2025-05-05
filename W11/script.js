// Registration handler
document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
  
    // Simulate AJAX POST with localStorage
    function ajaxPost(userData, callback) {
      setTimeout(() => {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));
        callback(true);
      }, 500);
    }
  
    if (registerForm) {
      registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const user = {
          name: document.getElementById("name").value.trim(),
          email: document.getElementById("email").value.trim(),
          mobile: document.getElementById("mobile").value.trim(),
          dob: document.getElementById("dob").value,
          city: document.getElementById("city").value.trim(),
          address: document.getElementById("address").value.trim(),
          username: document.getElementById("username").value.trim(),
          password: document.getElementById("password").value
        };
  
        if (!/^\d{10}$/.test(user.mobile)) {
          alert("Mobile number must be 10 digits");
          return;
        }
  
        ajaxPost(user, (success) => {
          if (success) {
            alert("Registration successful!");
            window.location.href = "login.html";
          }
        });
      });
    }
  
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const username = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value;
  
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const found = users.find(u => u.username === username && u.password === password);
  
        if (found) {
          alert("Login successful!");
          window.location.href = "users.html";
        } else {
          alert("Invalid credentials.");
        }
      });
    }
  });
  