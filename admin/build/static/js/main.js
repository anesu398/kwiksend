document.addEventListener("DOMContentLoaded", function () {
  // Navigation Menu Toggle
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const menuBtnIcon = menuBtn.querySelector("i");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
  });

  navLinks.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
  });

  // Scroll Reveal Animations
  const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
  };

  ScrollReveal().reveal(".header__image img", { ...scrollRevealOption, origin: "right" });
  ScrollReveal().reveal(".header__content h1", { ...scrollRevealOption, delay: 500 });
  ScrollReveal().reveal(".header__content .section__description", { ...scrollRevealOption, delay: 1000 });
  ScrollReveal().reveal(".header__content .header__btn", { ...scrollRevealOption, delay: 1500 });

  ScrollReveal().reveal(".explore__image img", { ...scrollRevealOption, origin: "left" });
  ScrollReveal().reveal(".explore__content .section__header", { ...scrollRevealOption, delay: 500 });
  ScrollReveal().reveal(".explore__content .section__description", { ...scrollRevealOption, delay: 1000 });
  ScrollReveal().reveal(".explore__content .explore__btn", { ...scrollRevealOption, delay: 1500 });

  ScrollReveal().reveal(".banner__card", { ...scrollRevealOption, interval: 500 });

  ScrollReveal().reveal(".chef__image img", { ...scrollRevealOption, origin: "right" });
  ScrollReveal().reveal(".chef__content .section__header", { ...scrollRevealOption, delay: 500 });
  ScrollReveal().reveal(".chef__content .section__description", { ...scrollRevealOption, delay: 1000 });
  ScrollReveal().reveal(".chef__list li", { ...scrollRevealOption, delay: 1500, interval: 500 });

  // Swiper Initializations
  const swiper = new Swiper(".swiper", {
    loop: true,
    pagination: { el: ".swiper-pagination" },
  });

  new Swiper(".trusted__swiper", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    autoplay: { delay: 2000, disableOnInteraction: false },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    },
  });

  // Chatbot Popup Controls
  const fab = document.getElementById("chatbot-fab");
  const chatbotPopup = document.getElementById("chatbot-popup");
  const closeBtn = document.getElementById("close-btn");
  const chatInput = document.getElementById("chat-input");
  const fileInput = document.getElementById("file-input");
  const emojiBtn = document.getElementById("emoji-btn");
  const sendBtn = document.getElementById("send-btn");
  const chatbotContent = document.getElementById("chatbot-content");
  const emojiPicker = document.getElementById("emoji-picker");

  // Show chatbot on FAB click
  fab.addEventListener("click", function () {
    chatbotPopup.style.display = "block";
  });

  // Close chatbot on close button click
  closeBtn.addEventListener("click", function () {
    chatbotPopup.style.display = "none";
  });

  // Toggle emoji picker visibility
  emojiBtn.addEventListener("click", function () {
    emojiPicker.style.display = emojiPicker.style.display === "none" ? "block" : "none";
  });

  // Append selected emoji to input field and hide picker
  emojiPicker.addEventListener("emoji-click", function (event) {
    chatInput.value += event.detail.unicode;
    emojiPicker.style.display = "none";
  });

  // Handle file selection
  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const fileMessage = document.createElement("p");
      fileMessage.textContent = `📎 ${file.name} selected`;
      chatbotContent.appendChild(fileMessage);
      fileInput.value = ""; // Reset the file input
    }
  });

  // Send message on send button click
  sendBtn.addEventListener("click", function () {
    const message = chatInput.value.trim();
    if (message) {
      const userMessage = document.createElement("p");
      userMessage.classList.add("user-message"); // Optional: add a class for styling
      userMessage.textContent = message;
      chatbotContent.appendChild(userMessage);
      chatInput.value = ""; // Clear the input
    }
  });

  // Optional: Allow pressing "Enter" to send the message
  chatInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendBtn.click();
    }
  });
});
