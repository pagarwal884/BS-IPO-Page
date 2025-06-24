document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const rememberMe = document.getElementById("keepSignedIn").checked;

  // Simple validation
  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  // In a real application, you would send this to your server
  console.log("Login attempt:", { email, password, rememberMe });

  // Show loading state
  const btn = document.querySelector(".btn-login");
  const originalText = btn.textContent;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
  btn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    alert("Login successful! Redirecting to dashboard...");
    btn.textContent = originalText;
    btn.disabled = false;

    // Redirect would happen here
    // window.location.href = '/dashboard';
  }, 1500);
});

// Forgot password functionality
document
  .querySelector(".forgot-password")
  .addEventListener("click", function (e) {
    e.preventDefault();
    alert("Password reset instructions will be sent to your email.");
  });

// Create account link
document
  .querySelector(".create-account a")
  .addEventListener("click", function (e) {
    e.preventDefault();
    alert("Redirecting to sign up page...");
  });
