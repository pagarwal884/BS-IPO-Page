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
    const errorText = document.getElementById("errorText");

    // Hide previous messages
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    // Validate email
    if (!email || !isValidEmail(email)) {
      errorText.textContent = "Please enter a valid email address.";
      errorMessage.style.display = "flex";
      return;
    }

    // Show loading state
    resetBtn.disabled = true;
    btnText.style.visibility = "hidden";
    loading.style.display = "block";

    // Simulate API request
    try {
      // This would be a real fetch request in production
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate success response
      successMessage.style.display = "flex";
      document.getElementById("email").value = "";
    } catch (error) {
      errorText.textContent = "An error occurred. Please try again.";
      errorMessage.style.display = "flex";
    } finally {
      // Reset button state
      resetBtn.disabled = false;
      btnText.style.visibility = "visible";
      loading.style.display = "none";
    }
  });

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function goBack() {
  // In a real app, this would redirect to the login page
  alert("Redirecting to login page...");
}

// Add interactive effects
document.getElementById("email").addEventListener("input", function () {
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");
  successMessage.style.display = "none";
  errorMessage.style.display = "none";
});
