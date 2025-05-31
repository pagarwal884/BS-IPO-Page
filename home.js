document.addEventListener("DOMContentLoaded", () => {
  // Dropdown toggle
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdown = document.querySelector(".dropdown");
  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.classList.toggle("active"); 
    });
  }

  // Tab scrolling and indicators
  const container = document.getElementById('tabsContainer');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const indicators = document.getElementById('indicators');

  if (container && leftArrow && rightArrow && indicators) {
    const tabWidth = 180;
    const visibleTabs = Math.floor(container.offsetWidth / tabWidth);
    const totalTabs = container.children.length;
    const totalViews = Math.ceil(totalTabs / visibleTabs);
    let currentView = 0;

    // Create indicators
    for (let i = 0; i < totalViews; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      indicators.appendChild(dot);
    }

    const updateIndicators = () => {
      const dots = indicators.querySelectorAll('.dot');
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentView].classList.add('active');
    };

    rightArrow.addEventListener('click', () => {
      if (currentView < totalViews - 1) {
        currentView++;
        container.scrollBy({ left: tabWidth * visibleTabs, behavior: 'smooth' });
        updateIndicators();
      }
    });

    leftArrow.addEventListener('click', () => {
      if (currentView > 0) {
        currentView--;
        container.scrollBy({ left: -tabWidth * visibleTabs, behavior: 'smooth' });
        updateIndicators();
      }
    });
  }

  // FAQ toggle
  const questions = document.querySelectorAll(".faq-question");
  questions.forEach((question) => {
    question.addEventListener("click", () => {
      question.parentElement.classList.toggle("active");
    });
  });

  // Search toggle
  const searchIcon = document.querySelector('.search-icon');
  const searchWrapper = document.querySelector('.search-wrapper');

  if (searchIcon && searchWrapper) {
    searchIcon.addEventListener('click', () => {
      searchWrapper.classList.toggle('active');
      const input = searchWrapper.querySelector('.search-input');
      if (input) {
        if (searchWrapper.classList.contains('active')) {
          input.focus();
        } else {
          input.value = "";
        }
      }
    });
  }

  // Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
    });
  }
});
