document
  .getElementById("resetForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const resetBtn = document.getElementById("resetBtn");
    const btnText = document.getElementById("btnText");
    const loading = document.getElementById("loading");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");

    // Hide previous messages
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    // Validate email
    if (!email || !isValidEmail(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    // Show loading state
    resetBtn.disabled = true;
    btnText.style.display = "none";
    loading.style.display = "inline-block";

    try {
      // Send request to backend
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccess("Password reset link has been sent to your email address.");
        document.getElementById("email").value = "";
      } else {
        showError(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      showError("Network error. Please check your connection and try again.");
    } finally {
      // Reset button state
      resetBtn.disabled = false;
      btnText.style.display = "inline";
      loading.style.display = "none";
    }
  });

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showSuccess(message) {
  const successMessage = document.getElementById("successMessage");
  successMessage.textContent = message;
  successMessage.style.display = "block";
}

function showError(message) {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function goBack() {
  // Redirect to login page or go back in history
  window.history.back();
}

// Add some interactive effects
document.getElementById("email").addEventListener("input", function () {
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");
  successMessage.style.display = "none";
  errorMessage.style.display = "none";
});
