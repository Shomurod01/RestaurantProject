document.addEventListener("DOMContentLoaded", function () {
  // Language dropdown functionality
  const languageDropdown = document.querySelector(".language-dropdown");
  const selectedLanguage = document.querySelector(".selected-language");
  const currentLanguageText = document.getElementById("current-language");
  const languageOptions = document.querySelectorAll(".language-options li");
  const langElements = document.querySelectorAll(".lang");
  const langSecondaryElements = document.querySelectorAll(".lang-secondary");
  const langPlaceholders = document.querySelectorAll(".lang-placeholder");

  // Set default language
  let currentLanguage = "pl"; // Default to Polish

  // Toggle dropdown
  selectedLanguage.addEventListener("click", function () {
    languageDropdown.classList.toggle("open");
    selectedLanguage.classList.toggle("active");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!languageDropdown.contains(e.target)) {
      languageDropdown.classList.remove("open");
      selectedLanguage.classList.remove("active");
    }
  });

  // Function to switch language
  function switchLanguage(lang) {
    currentLanguage = lang;

    // Update dropdown text
    currentLanguageText.textContent = lang.toUpperCase();

    // Update active option
    languageOptions.forEach((option) => {
      option.classList.remove("active");
      if (option.getAttribute("data-lang") === lang) {
        option.classList.add("active");
      }
    });

    // Update text content for elements with language data attributes
    langElements.forEach((element) => {
      const langText = element.getAttribute(`data-lang-${lang}`);
      if (langText) {
        element.textContent = langText;
      }
    });

    // Update secondary language elements
    langSecondaryElements.forEach((element) => {
      const langText = element.getAttribute(`data-lang-${lang}`);
      if (langText) {
        element.textContent = langText;
      }
    });

    // Update placeholders
    langPlaceholders.forEach((element) => {
      const langText = element.getAttribute(`data-lang-${lang}`);
      if (langText) {
        element.placeholder = langText;
      }
    });

    // Save language preference
    localStorage.setItem("preferredLanguage", lang);

    // Close dropdown after selection
    languageDropdown.classList.remove("open");
    selectedLanguage.classList.remove("active");
  }

  // Add click event to language options
  languageOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      switchLanguage(lang);
    });
  });

  // Check for saved language preference
  const savedLanguage = localStorage.getItem("preferredLanguage");
  if (savedLanguage) {
    switchLanguage(savedLanguage);
  }

  // Hamburger Menu Toggle
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const mainNav = document.getElementById("main-nav");

  hamburgerIcon.addEventListener("click", function () {
    this.classList.toggle("open");
    mainNav.classList.toggle("open");
  });

  // Close menu when clicking on a nav link (mobile)
  const navLinks = document.querySelectorAll(".main-nav ul li a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburgerIcon.classList.remove("open");
      mainNav.classList.remove("open");
    });
  });

  // Active nav link based on scroll position
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const scrollPosition = window.pageYOffset + 100; // Offset for header

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // Menu Navigation
  const menuNavItems = document.querySelectorAll(".nav-item");
  const menuCategories = document.querySelectorAll(".menu-category");

  menuNavItems.forEach((item) => {
    item.addEventListener("click", function () {
      const targetCategory = this.getAttribute("data-target");

      // Update active nav item
      menuNavItems.forEach((navItem) => {
        navItem.classList.remove("active");
      });
      this.classList.add("active");

      // Show target category
      menuCategories.forEach((category) => {
        category.classList.remove("active");
        if (category.id === targetCategory) {
          category.classList.add("active");
        }
      });
    });
  });

  // Form submission
  const contactForm = document.querySelector(".contact-form form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Here you would implement form submission logic
      // For now, just show an alert in the current language
      let thankYouMessage =
        "Dziękujemy za wiadomość! Skontaktujemy się wkrótce.";

      if (currentLanguage === "uz") {
        thankYouMessage =
          "Xabaringiz uchun rahmat! Tez orada siz bilan bog'lanamiz.";
      } else if (currentLanguage === "ru") {
        thankYouMessage =
          "Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.";
      } else if (currentLanguage === "en") {
        thankYouMessage =
          "Thank you for your message! We will get back to you soon.";
      }

      alert(thankYouMessage);
      this.reset();
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset for fixed header
          behavior: "smooth",
        });
      }
    });
  });

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".menu-item, .about-content, .contact-content"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.classList.add("animate");
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on load
});
