// Enhanced sample data for IPO listings
const ipoData = [
  {
    id: 1,
    company: "Adani Power",
    priceMin: 329,
    priceMax: 336,
    openDate: "2023-06-03",
    closeDate: "2023-06-05",
    issueSize: 4553.15,
    issueType: "Book Built",
    listingDate: "2023-06-10",
    status: "Ongoing",
  },
  {
    id: 2,
    company: "VBL LTD",
    priceMin: 229,
    priceMax: 236,
    openDate: "2024-06-03",
    closeDate: "2024-06-05",
    issueSize: 1330.15,
    issueType: "Book Built",
    listingDate: "2024-06-10",
    status: "Upcoming",
  },
  {
    id: 3,
    company: "Tata Motors",
    priceMin: 549,
    priceMax: 569,
    openDate: "2024-06-03",
    closeDate: "2024-06-05",
    issueSize: 1340.15,
    issueType: "Book Built",
    listingDate: "2024-06-10",
    status: "New Listed",
  },
  {
    id: 4,
    company: "HDFC LTD",
    priceMin: 1244,
    priceMax: 1268,
    openDate: "2024-06-03",
    closeDate: "2024-06-05",
    issueSize: 1830.15,
    issueType: "Book Built",
    listingDate: "2024-06-11",
    status: "Upcoming",
  },
  {
    id: 5,
    company: "Reliance Industries",
    priceMin: 629,
    priceMax: 649,
    openDate: "2024-06-01",
    closeDate: "2024-06-05",
    issueSize: 3820.15,
    issueType: "Book Built",
    listingDate: "2024-06-10",
    status: "Ongoing",
  },
  {
    id: 6,
    company: "Infosys",
    priceMin: 1429,
    priceMax: 1450,
    openDate: "2024-06-03",
    closeDate: "2024-06-05",
    issueSize: 2130.15,
    issueType: "Book Built",
    listingDate: "2024-06-10",
    status: "Upcoming",
  },
  {
    id: 7,
    company: "ICICI Bank",
    priceMin: 729,
    priceMax: 750,
    openDate: "2024-06-03",
    closeDate: "2024-06-05",
    issueSize: 2170.15,
    issueType: "Book Built",
    listingDate: "2024-06-10",
    status: "New Listed",
  },
  {
    id: 8,
    company: "SBI",
    priceMin: 629,
    priceMax: 645,
    openDate: "2024-06-03",
    closeDate: "2024-06-05",
    issueSize: 3130.15,
    issueType: "Book Built",
    listingDate: "2024-06-10",
    status: "Upcoming",
  },
  {
    id: 9,
    company: "Wipro",
    priceMin: 429,
    priceMax: 445,
    openDate: "2024-06-03",
    closeDate: "2024-06-05",
    issueSize: 1130.15,
    issueType: "Book Built",
    listingDate: "2024-06-10",
    status: "New Listed",
  },
  {
    id: 10,
    company: "Axis Bank",
    priceMin: 929,
    priceMax: 950,
    openDate: "2024-06-03",
    closeDate: "2024-06-05",
    issueSize: 1830.15,
    issueType: "Book Built",
    listingDate: "2024-06-10",
    status: "Upcoming",
  },
  {
    id: 11,
    company: "Tech Innovations",
    priceMin: 120,
    priceMax: 125,
    openDate: "2024-07-01",
    closeDate: "2024-07-05",
    issueSize: 850.75,
    issueType: "Fixed Price",
    listingDate: "2024-07-15",
    status: "Upcoming",
  },
  {
    id: 12,
    company: "Green Energy",
    priceMin: 85,
    priceMax: 90,
    openDate: "2024-06-15",
    closeDate: "2024-06-20",
    issueSize: 950.25,
    issueType: "Hybrid",
    listingDate: "2024-06-30",
    status: "Ongoing",
  },
];

// Current state
let currentPage = 1;
const rowsPerPage = 5;
let filteredData = [...ipoData];
let sortColumn = "company";
let sortDirection = "asc";

// Function to format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return "N/A";
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Function to create the IPO table rows
function renderTable() {
  const tableBody = document.getElementById("ipo-table-body");
  tableBody.innerHTML = "";

  // Calculate pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const pageData = filteredData.slice(startIndex, endIndex);

  pageData.forEach((ipo) => {
    const row = document.createElement("tr");
    row.setAttribute("data-id", ipo.id);

    // Status class mapping
    const statusClass =
      ipo.status === "Ongoing"
        ? "status-ongoing"
        : ipo.status === "Upcoming"
        ? "status-upcoming"
        : ipo.status === "New Listed"
        ? "status-new"
        : "";

    // Get first letters for company logo
    const companyLetters = ipo.company
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2);

    row.innerHTML = `
          <td>
            <div class="company-cell">
              <div class="company-logo">${companyLetters}</div>
              <strong>${ipo.company}</strong>
            </div>
          </td>
          <td class="price-band">₹${ipo.priceMin} - ₹${ipo.priceMax}</td>
          <td>${formatDate(ipo.openDate)}</td>
          <td>${formatDate(ipo.closeDate)}</td>
          <td>₹${ipo.issueSize.toLocaleString()} Cr.</td>
          <td>${ipo.issueType}</td>
          <td>${formatDate(ipo.listingDate)}</td>
          <td><span class="status-badge ${statusClass}">${
      ipo.status
    }</span></td>
          <td><button class="action-btn update-btn"><i class="fas fa-edit"></i> Update</button></td>
          <td>
            <button class="action-icon delete-icon">
              <i class="fas fa-trash"></i>
            </button>
            <button class="action-icon view-icon">
              <i class="fas fa-eye"></i>
            </button>
          </td>
        `;

    tableBody.appendChild(row);
  });

  // Update pagination buttons
  updatePagination();
}

// Update pagination controls
function updatePagination() {
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  // Previous button
  const prevBtn = document.createElement("button");
  prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
  prevBtn.id = "prev-btn";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  });
  paginationContainer.appendChild(prevBtn);

  // Page buttons - show max 5 pages at a time
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  if (startPage > 1) {
    const firstBtn = document.createElement("button");
    firstBtn.textContent = "1";
    firstBtn.addEventListener("click", () => {
      currentPage = 1;
      renderTable();
    });
    paginationContainer.appendChild(firstBtn);

    if (startPage > 2) {
      const ellipsis = document.createElement("div");
      ellipsis.className = "ellipsis";
      ellipsis.textContent = "...";
      paginationContainer.appendChild(ellipsis);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    if (i === currentPage) {
      pageBtn.classList.add("active");
    }
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      renderTable();
    });
    paginationContainer.appendChild(pageBtn);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const ellipsis = document.createElement("div");
      ellipsis.className = "ellipsis";
      ellipsis.textContent = "...";
      paginationContainer.appendChild(ellipsis);
    }

    const lastBtn = document.createElement("button");
    lastBtn.textContent = totalPages;
    lastBtn.addEventListener("click", () => {
      currentPage = totalPages;
      renderTable();
    });
    paginationContainer.appendChild(lastBtn);
  }

  // Next button
  const nextBtn = document.createElement("button");
  nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
  nextBtn.id = "next-btn";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
    }
  });
  paginationContainer.appendChild(nextBtn);
}

// Filter data based on status
function filterData() {
  const statusFilter = document.getElementById("status-filter").value;
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();

  filteredData = ipoData.filter((ipo) => {
    const matchesStatus = statusFilter === "all" || ipo.status === statusFilter;
    const matchesSearch =
      ipo.company.toLowerCase().includes(searchTerm) ||
      ipo.status.toLowerCase().includes(searchTerm) ||
      ipo.issueType.toLowerCase().includes(searchTerm) ||
      ipo.priceMin.toString().includes(searchTerm) ||
      ipo.priceMax.toString().includes(searchTerm);

    return matchesStatus && matchesSearch;
  });

  // Sort data
  sortData();

  // Reset to first page
  currentPage = 1;
  renderTable();
}

// Sort data
function sortData() {
  filteredData.sort((a, b) => {
    let valueA, valueB;

    switch (sortColumn) {
      case "openDate":
      case "closeDate":
      case "listingDate":
        valueA = new Date(a[sortColumn]).getTime();
        valueB = new Date(b[sortColumn]).getTime();
        break;
      case "priceMin":
      case "priceMax":
      case "issueSize":
        valueA = a[sortColumn];
        valueB = b[sortColumn];
        break;
      default:
        valueA = a[sortColumn].toLowerCase();
        valueB = b[sortColumn].toLowerCase();
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
}

// Show toast notification
function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  toastMessage.textContent = message;
  toast.classList.toggle("error", isError);
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Initialize the dashboard
document.addEventListener("DOMContentLoaded", function () {
  renderTable();

  // Set up search
  document.getElementById("search-input").addEventListener("input", filterData);

  // Set up status filter
  document
    .getElementById("status-filter")
    .addEventListener("change", filterData);

  // Set up sort by
  document.getElementById("sort-by").addEventListener("change", (e) => {
    sortColumn = e.target.value;
    sortData();
    renderTable();
  });

  // Reset filters
  document.getElementById("reset-filters").addEventListener("click", () => {
    document.getElementById("status-filter").value = "all";
    document.getElementById("search-input").value = "";
    document.getElementById("sort-by").value = "company";
    sortColumn = "company";
    sortDirection = "asc";
    filteredData = [...ipoData];
    currentPage = 1;
    renderTable();
  });

  // Table sorting
  document.querySelectorAll("thead th[data-sort]").forEach((th) => {
    th.addEventListener("click", () => {
      const column = th.getAttribute("data-sort");
      if (sortColumn === column) {
        sortDirection = sortDirection === "asc" ? "desc" : "asc";
      } else {
        sortColumn = column;
        sortDirection = "asc";
      }
      sortData();
      renderTable();
    });
  });

  // Register IPO modal
  const modal = document.getElementById("register-modal");
  const openModalBtn = document.getElementById("open-register-modal");
  const closeModalBtns = document.querySelectorAll(".close-modal");

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  });

  // Submit new IPO
  document.getElementById("submit-ipo").addEventListener("click", () => {
    const company = document.getElementById("ipo-company").value;
    const minPrice = document.getElementById("ipo-price-min").value;
    const maxPrice = document.getElementById("ipo-price-max").value;

    if (!company || !minPrice || !maxPrice) {
      showToast("Please fill in all required fields", true);
      return;
    }

    // Create new IPO object
    const newIPO = {
      id: ipoData.length + 1,
      company: company,
      priceMin: parseFloat(minPrice),
      priceMax: parseFloat(maxPrice),
      openDate:
        document.getElementById("ipo-open").value ||
        new Date().toISOString().split("T")[0],
      closeDate:
        document.getElementById("ipo-close").value ||
        new Date().toISOString().split("T")[0],
      issueSize: document.getElementById("ipo-size").value
        ? parseFloat(document.getElementById("ipo-size").value)
        : 0,
      issueType: document.getElementById("ipo-type").value,
      listingDate:
        document.getElementById("ipo-listing").value ||
        new Date().toISOString().split("T")[0],
      status: document.getElementById("ipo-status").value,
    };

    // Add to data
    ipoData.unshift(newIPO);
    filteredData = [...ipoData];

    // Reset form
    document.getElementById("ipo-company").value = "";
    document.getElementById("ipo-price-min").value = "";
    document.getElementById("ipo-price-max").value = "";
    document.getElementById("ipo-size").value = "";

    // Close modal
    modal.style.display = "none";

    // Show success message
    showToast("IPO registered successfully!");

    // Refresh table
    currentPage = 1;
    sortData();
    renderTable();
  });

  // Table row actions
  document.addEventListener("click", function (event) {
    const row = event.target.closest("tr");
    if (!row) return;
    const ipoId = parseInt(row.getAttribute("data-id"));
    const ipo = ipoData.find((item) => item.id === ipoId);

    // Update button
    if (event.target.closest(".update-btn")) {
      alert(`Update functionality for ${ipo.company} would open an edit form.`);
    }

    // Delete button
    if (event.target.closest(".delete-icon")) {
      if (confirm(`Are you sure you want to delete ${ipo.company}?`)) {
        const index = ipoData.findIndex((item) => item.id === ipoId);
        if (index !== -1) {
          ipoData.splice(index, 1);
          filteredData = [...ipoData];
          renderTable();
          showToast(`${ipo.company} deleted successfully!`);
        }
      }
    }

    // View button
    if (event.target.closest(".view-icon")) {
      alert(
        `Viewing details for ${ipo.company}\nPrice Band: ₹${ipo.priceMin} - ₹${ipo.priceMax}\nStatus: ${ipo.status}`
      );
    }

    // Row click (view details)
    if (!event.target.closest("button") && event.target.closest("td")) {
      alert(
        `Company: ${ipo.company}\n` +
          `Price Band: ₹${ipo.priceMin} - ₹${ipo.priceMax}\n` +
          `Open: ${formatDate(ipo.openDate)}\n` +
          `Close: ${formatDate(ipo.closeDate)}\n` +
          `Listing: ${formatDate(ipo.listingDate)}\n` +
          `Issue Size: ₹${ipo.issueSize.toLocaleString()} Cr.\n` +
          `Issue Type: ${ipo.issueType}\n` +
          `Status: ${ipo.status}`
      );
    }
  });
});
