// Modern IPO Dashboard JavaScript
class DashboardApp {
  constructor() {
    this.ipoData = [];
    this.charts = {};
    this.init();
  }

  init() {
    // Initialize components
    this.setupEventListeners();
    this.generateSampleData();
    this.initCharts();
    this.renderIPOData();
    this.renderTopIPOData();
  }

  setupEventListeners() {
    // Toast notification
    document.getElementById("viewReportBtn").addEventListener("click", () => {
      this.showToast("IPO report generated successfully!");

      // Simulate report generation
      setTimeout(() => {
        this.showToast("IPO report is ready for download!");
      }, 1500);
    });

    // Notification bell
    document
      .getElementById("notificationIcon")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        const dropdown = document.getElementById("notificationDropdown");
        dropdown.style.display =
          dropdown.style.display === "block" ? "none" : "block";
      });

    // Close notification dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !e.target.closest("#notificationDropdown") &&
        !e.target.closest("#notificationIcon")
      ) {
        document.getElementById("notificationDropdown").style.display = "none";
      }
    });

    // Search functionality
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () =>
      this.handleSearch(searchInput.value)
    );
    searchInput.addEventListener("focus", () => {
      if (searchInput.value) {
        document.getElementById("searchSuggestions").style.display = "block";
      }
    });

    // Add IPO button
    document.getElementById("addIpoBtn").addEventListener("click", () => {
      this.addRandomIPO();
    });

    // Refresh top IPO button
    document
      .getElementById("refreshTopIpoBtn")
      .addEventListener("click", () => {
        this.renderTopIPOData();
        this.showToast("Top IPO list refreshed");
      });

    // Sector filter
    document.getElementById("sectorFilter").addEventListener("change", (e) => {
      this.filterBySector(e.target.value);
    });

    // Stat circles
    document
      .querySelectorAll(".ipo-stats-container .circle")
      .forEach((circle) => {
        circle.addEventListener("click", () => {
          this.showToast(
            `Filtered by ${circle.querySelector(".circle-subtext").textContent}`
          );
        });
      });
  }

  initCharts() {
    // Doughnut Chart
    this.charts.ipoChart = new Chart(document.getElementById("ipoChart"), {
      type: "doughnut",
      data: {
        labels: ["Upcoming (35.7%)", "New Listed (59.5%)", "Ongoing (4.8%)"],
        datasets: [
          {
            data: [15, 25, 2],
            backgroundColor: ["#665aff", "#a39af5", "#d4d1f7"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 12,
              padding: 20,
              font: { size: 12 },
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.raw} IPO(s)`,
            },
          },
        },
        cutout: "70%",
        maintainAspectRatio: false,
      },
    });

    // Bar Chart for Sector Performance
    this.charts.sectorChart = new Chart(
      document.getElementById("sectorChart"),
      {
        type: "bar",
        data: {
          labels: [
            "Technology",
            "Finance",
            "Healthcare",
            "Consumer",
            "Energy",
            "Industrial",
          ],
          datasets: [
            {
              label: "Average Return (%)",
              data: [42.3, 28.7, 15.2, 22.8, -3.5, 18.9],
              backgroundColor: [
                "rgba(54, 162, 235, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(153, 102, 255, 0.7)",
                "rgba(255, 159, 64, 0.7)",
                "rgba(255, 99, 132, 0.7)",
                "rgba(201, 203, 207, 0.7)",
              ],
              borderColor: [
                "rgb(54, 162, 235)",
                "rgb(75, 192, 192)",
                "rgb(153, 102, 255)",
                "rgb(255, 159, 64)",
                "rgb(255, 99, 132)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                color: "rgba(0, 0, 0, 0.05)",
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      }
    );
  }

  generateSampleData() {
    this.ipoData = [
      {
        id: 1,
        company: "Vodafone Idea",
        sector: "Telecom",
        priceBand: "₹12 - ₹15",
        status: "gain",
        listingGain: "+13.5%",
        currentReturn: "+7.2%",
        logoBg: "from-blue-500 to-indigo-700",
        initials: "VI",
      },
      {
        id: 2,
        company: "Reliance Power",
        sector: "Energy",
        priceBand: "₹18 - ₹22",
        status: "loss",
        listingGain: "-8.3%",
        currentReturn: "-12.1%",
        logoBg: "from-red-500 to-orange-700",
        initials: "RP",
      },
      {
        id: 3,
        company: "Paytm",
        sector: "Fintech",
        priceBand: "₹1,950 - ₹2,150",
        status: "neutral",
        listingGain: "+1.2%",
        currentReturn: "-0.8%",
        logoBg: "from-green-500 to-teal-700",
        initials: "PA",
      },
      {
        id: 4,
        company: "LIC India",
        sector: "Insurance",
        priceBand: "₹875 - ₹949",
        status: "gain",
        listingGain: "+5.4%",
        currentReturn: "+18.7%",
        logoBg: "from-purple-500 to-indigo-700",
        initials: "LI",
      },
    ];
  }

  renderIPOData() {
    const tableBody = document.getElementById("ipoTableBody");
    tableBody.innerHTML = "";

    this.ipoData.forEach((ipo) => {
      const row = document.createElement("tr");

      // Status badge classes based on status
      let statusClass = "";
      let statusIcon = "";

      if (ipo.status === "gain") {
        statusClass = "bg-green-100 text-green-800";
        statusIcon = "fas fa-arrow-up";
      } else if (ipo.status === "loss") {
        statusClass = "bg-red-100 text-red-800";
        statusIcon = "fas fa-arrow-down";
      } else {
        statusClass = "bg-yellow-100 text-yellow-800";
        statusIcon = "fas fa-minus";
      }

      // Text color based on return
      const listingColor =
        ipo.status === "gain"
          ? "text-green-600"
          : ipo.status === "loss"
          ? "text-red-600"
          : "text-gray-600";
      const returnColor = ipo.currentReturn.startsWith("+")
        ? "text-green-600"
        : ipo.currentReturn.startsWith("-")
        ? "text-red-600"
        : "text-gray-600";

      row.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="company-logo bg-gradient-to-br ${
                                  ipo.logoBg
                                }">${ipo.initials}</div>
                                <div>
                                    <div class="font-medium text-gray-900">${
                                      ipo.company
                                    }</div>
                                    <div class="text-gray-500">${
                                      ipo.sector
                                    }</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">${
                          ipo.priceBand
                        }</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="status-badge ${statusClass}">
                                <i class="${statusIcon} trend-icon"></i> ${
        ipo.status.charAt(0).toUpperCase() + ipo.status.slice(1)
      }
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap ${listingColor} font-medium">${
        ipo.listingGain
      }</td>
                        <td class="px-6 py-4 whitespace-nowrap ${returnColor} font-medium">${
        ipo.currentReturn
      }</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button class="text-indigo-600 hover:text-indigo-900 mr-3 text-lg view-btn" data-id="${
                              ipo.id
                            }">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="text-indigo-600 hover:text-indigo-900 text-lg chart-btn" data-id="${
                              ipo.id
                            }">
                                <i class="fas fa-chart-line"></i>
                            </button>
                        </td>
                    `;

      tableBody.appendChild(row);
    });

    // Add event listeners to action buttons
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.closest(".view-btn").dataset.id;
        const ipo = this.ipoData.find((item) => item.id == id);
        this.showToast(`Viewing details for ${ipo.company}`);
      });
    });

    document.querySelectorAll(".chart-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.closest(".chart-btn").dataset.id;
        const ipo = this.ipoData.find((item) => item.id == id);
        this.showToast(`Showing chart for ${ipo.company}`);
      });
    });
  }

  renderTopIPOData() {
    const topIpoList = document.getElementById("topIpoList");
    topIpoList.innerHTML = "";

    const topIPOs = [
      { company: "Zomato", sector: "Food Delivery", return: "+142.3%" },
      { company: "Nykaa", sector: "Beauty & Cosmetics", return: "+96.7%" },
      { company: "Policybazaar", sector: "Insurance", return: "+74.8%" },
      { company: "Paytm", sector: "Fintech", return: "-42.1%" },
      { company: "Delhivery", sector: "Logistics", return: "-38.5%" },
    ];

    topIPOs.forEach((ipo) => {
      const item = document.createElement("div");
      item.className = "flex items-center justify-between";

      const isPositive = ipo.return.startsWith("+");

      item.innerHTML = `
                        <div class="flex items-center">
                            <div class="${
                              isPositive ? "bg-green-100" : "bg-red-100"
                            } p-3 rounded-xl mr-3">
                                <i class="${
                                  isPositive
                                    ? "fas fa-chart-line text-green-600"
                                    : "fas fa-chart-line-down text-red-600"
                                }"></i>
                            </div>
                            <div>
                                <div class="font-medium">${ipo.company}</div>
                                <div class="text-sm text-gray-500">${
                                  ipo.sector
                                }</div>
                            </div>
                        </div>
                        <div class="${
                          isPositive ? "text-green-600" : "text-red-600"
                        } font-bold">${ipo.return}</div>
                    `;

      topIpoList.appendChild(item);
    });
  }

  handleSearch(query) {
    const suggestionsContainer = document.getElementById("searchSuggestions");

    if (!query) {
      suggestionsContainer.style.display = "none";
      return;
    }

    // Simulate search results
    const results = [
      { type: "company", name: "Vodafone Idea", sector: "Telecom" },
      { type: "company", name: "Reliance Power", sector: "Energy" },
      { type: "ipo", name: "Paytm IPO", sector: "Fintech" },
      { type: "sector", name: "Technology Sector", sector: "Market Sector" },
      { type: "ipo", name: "LIC IPO", sector: "Insurance" },
    ].filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.sector.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length > 0) {
      suggestionsContainer.innerHTML = "";
      results.forEach((result) => {
        const item = document.createElement("div");
        item.className = "suggestion-item";
        item.innerHTML = `
                            <i class="${
                              result.type === "company"
                                ? "fas fa-building"
                                : result.type === "ipo"
                                ? "fas fa-file-invoice-dollar"
                                : "fas fa-chart-pie"
                            }"></i>
                            <div>
                                <div class="font-medium">${result.name}</div>
                                <div class="text-sm text-gray-500">${
                                  result.sector
                                }</div>
                            </div>
                        `;

        item.addEventListener("click", () => {
          document.getElementById("searchInput").value = result.name;
          suggestionsContainer.style.display = "none";
          this.showToast(`Searching for ${result.name}`);
        });

        suggestionsContainer.appendChild(item);
      });
      suggestionsContainer.style.display = "block";
    } else {
      suggestionsContainer.style.display = "none";
    }
  }

  addRandomIPO() {
    const newCompanies = [
      {
        company: "Tata Motors",
        sector: "Automobile",
        priceBand: "₹480 - ₹520",
        status: "gain",
        listingGain: "+8.2%",
        currentReturn: "+12.4%",
        logoBg: "from-blue-400 to-blue-600",
        initials: "TM",
      },
      {
        company: "Adani Green",
        sector: "Renewable Energy",
        priceBand: "₹1,200 - ₹1,350",
        status: "gain",
        listingGain: "+5.7%",
        currentReturn: "+22.1%",
        logoBg: "from-green-400 to-green-600",
        initials: "AG",
      },
      {
        company: "Infosys",
        sector: "IT Services",
        priceBand: "₹1,450 - ₹1,550",
        status: "neutral",
        listingGain: "+2.1%",
        currentReturn: "-1.5%",
        logoBg: "from-purple-400 to-purple-600",
        initials: "IN",
      },
    ];

    const randomCompany =
      newCompanies[Math.floor(Math.random() * newCompanies.length)];
    randomCompany.id = this.ipoData.length + 1;
    this.ipoData.unshift(randomCompany);

    this.renderIPOData();
    this.showToast(`${randomCompany.company} added to IPO list`);

    // Update stats circles
    const totalCircle = document
      .getElementById("totalIpoCircle")
      .querySelector(".circle-text");
    totalCircle.textContent = parseInt(totalCircle.textContent) + 1;

    if (randomCompany.status === "gain") {
      const gainCircle = document
        .getElementById("gainIpoCircle")
        .querySelector(".circle-text");
      gainCircle.textContent = parseInt(gainCircle.textContent) + 1;
    } else if (randomCompany.status === "loss") {
      const lossCircle = document
        .getElementById("lossIpoCircle")
        .querySelector(".circle-text");
      lossCircle.textContent = parseInt(lossCircle.textContent) + 1;
    }
  }

  filterBySector(period) {
    this.showToast(`Filtered IPO data for ${period}`);
    // In a real app, this would fetch new data based on the filter
  }

  showToast(message, isError = false) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");

    toastMessage.textContent = message;
    toast.classList.toggle("error", isError);
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
}

// Initialize the dashboard when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const dashboard = new DashboardApp();

  // Simulate live data updates
  setInterval(() => {
    // Randomly update one of the stat circles
    const stats = document.querySelectorAll(
      ".ipo-stats-container .circle-text"
    );
    const randomStat = stats[Math.floor(Math.random() * stats.length)];
    const currentValue = parseInt(randomStat.textContent);

    // Only update if it's not the main circle (to keep realistic ratios)
    if (!randomStat.parentElement.classList.contains("w-40")) {
      const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
      const newValue = Math.max(0, currentValue + change);
      randomStat.textContent = newValue;

      // Add a subtle animation to the updated stat
      randomStat.parentElement.style.transform += " scale(1.1)";
      setTimeout(() => {
        randomStat.parentElement.style.transform =
          randomStat.parentElement.style.transform.replace(" scale(1.1)", "");
      }, 300);
    }
  }, 10000);
});
