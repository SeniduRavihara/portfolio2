// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = mobileMenuBtn.querySelector("i");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");

  if (mobileMenu.classList.contains("hidden")) {
    menuIcon.className = "fas fa-bars text-xl";
  } else {
    menuIcon.className = "fas fa-times text-xl";
  }
});

// Navigation active state
const navLinks = document.querySelectorAll(".nav-link");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
const sections = document.querySelectorAll("section");

// Function to update active navigation
function updateActiveNav() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  // Update desktop navigation
  navLinks.forEach((link) => {
    link.classList.remove("text-blue-600");
    link.classList.add("text-gray-700");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.remove("text-gray-700");
      link.classList.add("text-blue-600");
    }
  });

  // Update mobile navigation
  mobileNavLinks.forEach((link) => {
    link.classList.remove("text-blue-600");
    link.classList.add("text-gray-700");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.remove("text-gray-700");
      link.classList.add("text-blue-600");
    }
  });
}

// Listen for scroll events
window.addEventListener("scroll", updateActiveNav);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Close mobile menu if open
    if (!mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
      menuIcon.className = "fas fa-bars text-xl";
    }
  });
});

// Fade in animation for elements
function fadeInElements() {
  const fadeElements = document.querySelectorAll(".fade-in");

  fadeElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 100;

    if (isVisible) {
      element.classList.add("visible");
    }
  });
}

// Populate Skills
function populateSkills() {
  const skillsGrid = document.getElementById("skills-grid");

  if (!skillsGrid || !window.technicalSkillsData) {
    console.log("Skills grid or data not found");
    return;
  }

  skillsGrid.innerHTML = ""; // Clear existing content

  window.technicalSkillsData.forEach((skill) => {
    const skillCard = document.createElement("div");
    skillCard.className =
      "bg-white rounded-lg shadow-md p-6 text-center card-hover fade-in";

    skillCard.innerHTML = `
      <div class="skill-logo mb-4">
        <i class="${skill.logo} text-4xl ${skill.color}"></i>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">${skill.name}</h3>
      <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div class="progress-bar bg-blue-600 h-2 rounded-full" data-width="${skill.level}" style="width: 0%"></div>
      </div>
      <span class="text-sm text-gray-600">${skill.level}%</span>
    `;

    skillsGrid.appendChild(skillCard);
  });

  // Animate progress bars after a delay
  setTimeout(() => {
    document.querySelectorAll(".progress-bar").forEach((bar) => {
      const width = bar.getAttribute("data-width");
      bar.style.width = width + "%";
    });
  }, 500);
}

// Populate Services
function populateServices() {
  const servicesGrid = document.getElementById("services-grid");

  if (!servicesGrid || !window.servicesData) {
    console.log("Services grid or data not found");
    return;
  }

  servicesGrid.innerHTML = ""; // Clear existing content

  window.servicesData.forEach((service) => {
    const serviceCard = document.createElement("div");
    serviceCard.className =
      "bg-white rounded-lg shadow-md overflow-hidden card-hover fade-in";

    serviceCard.innerHTML = `
      <div class="h-32 bg-gradient-to-br ${
        service.gradient
      } flex items-center justify-center">
        <i class="${service.icon} text-white text-3xl"></i>
      </div>
      <div class="p-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-3">${
          service.title
        }</h3>
        <p class="text-gray-700 mb-4 text-sm leading-relaxed">${
          service.description
        }</p>
        
        <div class="mb-4">
          <h4 class="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
          <ul class="text-sm text-gray-600 space-y-1">
            ${service.features
              .map(
                (feature) =>
                  `<li class="flex items-center"><i class="fas fa-check text-green-500 mr-2 text-xs"></i>${feature}</li>`
              )
              .join("")}
          </ul>
        </div>
        
        <div class="flex flex-wrap gap-1">
          ${service.technologies
            .map(
              (tech) =>
                `<span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">${tech}</span>`
            )
            .join("")}
        </div>
      </div>
    `;

    servicesGrid.appendChild(serviceCard);
  });
}

// Populate Projects
function populateProjects() {
  const projectsGrid = document.getElementById("projects-grid");

  if (!projectsGrid || !window.projectsData) {
    console.log("Projects grid or data not found");
    return;
  }

  projectsGrid.innerHTML = ""; // Clear existing content

  window.projectsData.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className =
      "bg-white rounded-lg shadow-md overflow-hidden card-hover fade-in";

    const statusBadge =
      project.status === "Live"
        ? '<span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded ml-2">Live</span>'
        : project.status === "In Development"
        ? '<span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">In Progress</span>'
        : '<span class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded ml-2">Completed</span>';

    // Use image if available, otherwise fallback to a placeholder
    const projectVisual = project.image
      ? `<img src="${project.image}" alt="${project.title}" class="h-48 w-full object-cover" />`
      : `<div class="h-48 w-full bg-gray-200 flex items-center justify-center"><span class="text-gray-400">No Image</span></div>`;

    projectCard.innerHTML = `
      ${projectVisual}
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-2">${
          project.title
        }${statusBadge}</h3>
        <p class="text-gray-700 mb-4 text-sm leading-relaxed">${
          project.description
        }</p>
        <div class="flex flex-wrap gap-1 mb-4">
          ${project.technologies
            .map(
              (tech) =>
                `<span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">${tech}</span>`
            )
            .join("")}
        </div>
        <div class="flex gap-2">
          ${
            project.liveUrl
              ? `<a href="${
                  project.liveUrl
                }" target="_blank" rel="noopener noreferrer" class="flex-1 text-center px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:border-blue-600 hover:text-blue-600 transition-colors">
            <i class="fas fa-external-link-alt mr-1"></i>
            ${project.status === "In Development" ? "Preview" : "Live Demo"}
          </a>`
              : ""
          }
          <a href="${
            project.githubUrl
          }" target="_blank" rel="noopener noreferrer" class="flex-1 text-center px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:border-blue-600 hover:text-blue-600 transition-colors">
            <i class="fab fa-github mr-1"></i>
            Code
          </a>
        </div>
      </div>
    `;

    projectsGrid.appendChild(projectCard);
  });
}

// Listen for scroll events for animations
window.addEventListener("scroll", fadeInElements);

// Initial load - wait for all scripts to load
window.addEventListener("load", () => {
  console.log("Page loaded, populating content...");

  // Small delay to ensure all scripts are loaded
  setTimeout(() => {
    populateSkills();
    populateServices();
    populateProjects();
    fadeInElements();
  }, 100);
});

// Also try to populate when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready, attempting to populate...");

  setTimeout(() => {
    populateSkills();
    populateServices();
    populateProjects();
    fadeInElements();
  }, 200);
});

// Intersection Observer for better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all fade-in elements after content is loaded
setTimeout(() => {
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });
}, 500);
