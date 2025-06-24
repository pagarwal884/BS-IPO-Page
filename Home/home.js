// Mobile menu toggle
const mobileMenuIcon = document.querySelector(".mobile-menu-icon");
const mobileNav = document.getElementById("mobileNav");

mobileMenuIcon.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

// FAQ toggle functionality
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle("active");
  });
});

// Tab slider functionality
const leftArrows = document.querySelectorAll(".left-arrow");
const rightArrows = document.querySelectorAll(".right-arrow");
const tabsContainers = document.querySelectorAll(".tabs-container");

leftArrows.forEach((arrow, index) => {
  arrow.addEventListener("click", () => {
    tabsContainers[index].scrollBy({ left: -300, behavior: "smooth" });
  });
});

rightArrows.forEach((arrow, index) => {
  arrow.addEventListener("click", () => {
    tabsContainers[index].scrollBy({ left: 300, behavior: "smooth" });
  });
});
