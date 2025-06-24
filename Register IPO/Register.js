document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const registerBtn = document.getElementById("register-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const uploadLogoBtn = document.getElementById("upload-logo-btn");
  const deleteLogoBtn = document.getElementById("delete-logo-btn");
  const logoUpload = document.getElementById("logo-upload");
  const companyLogo = document.getElementById("company-logo");
  const ipoForm = document.getElementById("ipo-form");
  const listedIpoForm = document.getElementById("listed-ipo-form");
  const companyNameInput = document.getElementById("companyName");
  const displayCompanyName = document.getElementById("display-company-name");
  const tabs = document.querySelectorAll(".tab");
  const ipoInfoTab = document.getElementById("ipo-info-tab");
  const additionalInfoTab = document.getElementById("additional-info-tab");
  const notificationBell = document.getElementById("notification-bell");
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  const globalSearch = document.getElementById("global-search");

  // Tab Switching
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab");

      // Update active tab
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Show corresponding content
      if (tabName === "ipo-info") {
        ipoInfoTab.style.display = "block";
        additionalInfoTab.style.display = "none";
      } else if (tabName === "additional-info") {
        ipoInfoTab.style.display = "none";
        additionalInfoTab.style.display = "block";
      }
    });
  });

  // Logo Upload
  uploadLogoBtn.addEventListener("click", function () {
    logoUpload.click();
  });

  logoUpload.addEventListener("change", function (e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function (event) {
        // Create image element
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
          // Create canvas to resize image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set canvas dimensions to 60x60
          canvas.width = 60;
          canvas.height = 60;

          // Draw image on canvas
          ctx.drawImage(img, 0, 0, 60, 60);

          // Set canvas as logo
          companyLogo.innerHTML = "";
          companyLogo.appendChild(canvas);
          companyLogo.style.background = "none";
        };
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  });

  // Delete Logo
  deleteLogoBtn.addEventListener("click", function () {
    companyLogo.innerHTML = "NSE";
    companyLogo.style.background = "linear-gradient(135deg, #1e88e5, #1a76c9)";
    showToast("Logo removed successfully");
  });

  // Update displayed company name
  companyNameInput.addEventListener("input", function () {
    displayCompanyName.textContent = this.value || "NSE India";
  });

  // Calculate listing gain when IPO price or listing price changes
  const ipoPriceInput = document.getElementById("ipoPrice");
  const listingPriceInput = document.getElementById("listingPrice");
  const listingGainInput = document.getElementById("listingGain");

  function calculateListingGain() {
    const ipoPrice = parseFloat(ipoPriceInput.value);
    const listingPrice = parseFloat(listingPriceInput.value);

    if (!isNaN(ipoPrice) && !isNaN(listingPrice) && ipoPrice > 0) {
      const gain = ((listingPrice - ipoPrice) / ipoPrice) * 100;
      listingGainInput.value = gain.toFixed(2) + " %";
    } else {
      listingGainInput.value = "";
    }
  }

  ipoPriceInput.addEventListener("input", calculateListingGain);
  listingPriceInput.addEventListener("input", calculateListingGain);

  // Calculate current return when IPO price or CMP changes
  const cmpInput = document.getElementById("cmp");
  const currentReturnInput = document.getElementById("currentReturn");

  function calculateCurrentReturn() {
    const ipoPrice = parseFloat(ipoPriceInput.value);
    const cmp = parseFloat(cmpInput.value);

    if (!isNaN(ipoPrice) && !isNaN(cmp) && ipoPrice > 0) {
      const returnValue = ((cmp - ipoPrice) / ipoPrice) * 100;
      currentReturnInput.value = returnValue.toFixed(2) + " %";
    } else {
      currentReturnInput.value = "";
    }
  }

  ipoPriceInput.addEventListener("input", calculateCurrentReturn);
  cmpInput.addEventListener("input", calculateCurrentReturn);

  // Form Submission
  registerBtn.addEventListener("click", function () {
    if (ipoForm.checkValidity()) {
      // Collect IPO form data
      const ipoData = {
        companyName: document.getElementById("companyName").value,
        priceBand: document.getElementById("priceBand").value,
        openDate: document.getElementById("open").value,
        closeDate: document.getElementById("close").value,
        issueSize: document.getElementById("issueSize").value,
        issueType: document.getElementById("issueType").value,
        listingDate: document.getElementById("listingDate").value,
        status: document.getElementById("status").value,
      };

      // Collect listed IPO data
      const listedIpoData = {
        ipoPrice: document.getElementById("ipoPrice").value,
        listingPrice: document.getElementById("listingPrice").value,
        listingGain: document.getElementById("listingGain").value,
        listingDateNew: document.getElementById("listingDateNew").value,
        cmp: document.getElementById("cmp").value,
        currentReturn: document.getElementById("currentReturn").value,
        rhp: document.getElementById("rhp").value,
        drhp: document.getElementById("drhp").value,
      };

      // Combine data
      const formData = { ...ipoData, ...listedIpoData };

      // Save to localStorage (simulating database)
      const savedIpos = JSON.parse(localStorage.getItem("ipos")) || [];
      savedIpos.push(formData);
      localStorage.setItem("ipos", JSON.stringify(savedIpos));

      showToast("IPO registered successfully!");

      // Reset forms
      ipoForm.reset();
      listedIpoForm.reset();
      document.getElementById("companyName").value = "";
      displayCompanyName.textContent = "NSE India";
      companyLogo.innerHTML = "NSE";
      companyLogo.style.background =
        "linear-gradient(135deg, #1e88e5, #1a76c9)";
    } else {
      showToast("Please fill in all required fields", true);
      // Trigger HTML5 validation
      ipoForm.reportValidity();
    }
  });

  // Cancel button
  cancelBtn.addEventListener("click", function () {
    if (
      confirm(
        "Are you sure you want to cancel? All unsaved changes will be lost."
      )
    ) {
      ipoForm.reset();
      listedIpoForm.reset();
      document.getElementById("companyName").value = "";
      displayCompanyName.textContent = "NSE India";
      companyLogo.innerHTML = "NSE";
      companyLogo.style.background =
        "linear-gradient(135deg, #1e88e5, #1a76c9)";
      showToast("Form has been reset");
    }
  });

  // Notification bell
  notificationBell.addEventListener("click", function () {
    showToast("You have 2 new notifications");
  });

  // Global search
  globalSearch.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    if (searchTerm.length > 2) {
      // In a real app, this would search the database
      showToast(`Searching for "${searchTerm}"...`);
    }
  });

  // Show toast notification
  function showToast(message, isError = false) {
    toastMessage.textContent = message;
    toast.classList.toggle("error", isError);
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // Pre-fill form with sample data for demonstration
  function fillSampleData() {
    document.getElementById("companyName").value = "Vodafone Idea";
    document.getElementById("priceBand").value = "₹12 - ₹15";
    document.getElementById("open").value = "2024-07-01";
    document.getElementById("close").value = "2024-07-05";
    document.getElementById("issueSize").value = "2300 Cr.";
    document.getElementById("issueType").value = "Book Built";
    document.getElementById("listingDate").value = "2024-07-15";
    document.getElementById("status").value = "Upcoming";

    document.getElementById("ipoPrice").value = "12.5";
    document.getElementById("listingPrice").value = "14.2";
    document.getElementById("listingDateNew").value = "2024-07-15";
    document.getElementById("cmp").value = "13.8";
    document.getElementById("rhp").value = "https://example.com/rhp.pdf";
    document.getElementById("drhp").value = "https://example.com/drhp.pdf";

    // Trigger calculations
    calculateListingGain();
    calculateCurrentReturn();

    // Update displayed company name
    displayCompanyName.textContent = "Vodafone Idea";
  }

  // Fill sample data after 1 second for demo purposes
  setTimeout(fillSampleData, 1000);
});
