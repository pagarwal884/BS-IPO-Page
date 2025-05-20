// document.addEventListener("DOMContentLoaded", () => {
//     const dropdownToggle = document.querySelector(".dropdown-toggle");
//     const dropdown = document.querySelector(".dropdown");

//     dropdownToggle.addEventListener("click", (e) => {
//         e.preventDefault(); 
//         dropdown.classList.toggle("active"); 
//     });
// });

// document.addEventListener('DOMContentLoaded', function () {
//     const container = document.getElementById('tabsContainer');
//     const leftArrow = document.querySelector('.left-arrow');
//     const rightArrow = document.querySelector('.right-arrow');
//     const indicators = document.getElementById('indicators');

//     const tabWidth = 180; // Each tab + margin
//     const visibleTabs = Math.floor(container.offsetWidth / tabWidth);
//     const totalTabs = container.children.length;
//     const totalViews = Math.ceil(totalTabs / visibleTabs);
//     let currentView = 0;

//     // Create indicators
//     for (let i = 0; i < totalViews; i++) {
//         const dot = document.createElement('div');
//         dot.classList.add('dot');
//         if (i === 0) dot.classList.add('active');
//         indicators.appendChild(dot);
//     }

//     const updateIndicators = () => {
//         const dots = indicators.querySelectorAll('.dot');
//         dots.forEach(dot => dot.classList.remove('active'));
//         dots[currentView].classList.add('active');
//     };

//     rightArrow.addEventListener('click', () => {
//         if (currentView < totalViews - 1) {
//             currentView++;
//             container.scrollLeft += tabWidth * visibleTabs;
//             updateIndicators();
//         }
//     });

//     leftArrow.addEventListener('click', () => {
//         if (currentView > 0) {
//             currentView--;
//             container.scrollLeft -= tabWidth * visibleTabs;
//             updateIndicators();
//         }
//     });
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const questions = document.querySelectorAll(".faq-question");
//     questions.forEach((question) => {
//       question.addEventListener("click", () => {
//         question.parentElement.classList.toggle("active");
//       });
//     });
//   });

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
                container.scrollLeft += tabWidth * visibleTabs;
                updateIndicators();
            }
        });

        leftArrow.addEventListener('click', () => {
            if (currentView > 0) {
                currentView--;
                container.scrollLeft -= tabWidth * visibleTabs;
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
});
