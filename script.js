// Track if messages are unlocked
let messagesUnlocked = false;

// Page Navigation
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Show selected page
  document.getElementById(pageId).classList.add("active");

  // Update navigation buttons
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Find and activate the correct button
  const buttons = document.querySelectorAll(".nav-btn");
  const pageOrder = ["home", "journey", "gallery", "messages"];
  const pageIndex = pageOrder.indexOf(pageId);
  if (pageIndex !== -1 && buttons[pageIndex]) {
    buttons[pageIndex].classList.add("active");
  }

  // Handle messages page - ALWAYS show lock screen when visiting
  if (pageId === "messages") {
    const lockedScreen = document.getElementById("messagesLocked");
    const messagesContent = document.getElementById("messagesContent");

    if (lockedScreen && messagesContent) {
      // Reset to locked state every time
      messagesUnlocked = false;
      lockedScreen.style.display = "flex";
      lockedScreen.style.opacity = "1";
      lockedScreen.style.transform = "translateY(0)";
      lockedScreen.style.transition = "";
      messagesContent.style.display = "none";
    }
  }
}

// Marriage Timer
function updateMarriageTimer() {
  const marriageDate = new Date("2024-04-04T00:00:00");
  const now = new Date();
  const diff = now - marriageDate;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44)
  );
  const days = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
}

// Timeline Animation
function animateTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 200);
        }
      });
    },
    { threshold: 0.1 }
  );

  timelineItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all 0.6s ease";
    item.style.animationDelay = index * 0.2 + "s";
    observer.observe(item);
  });
}

// Message Cards Animation
function animateMessageCards() {
  const messageCards = document.querySelectorAll(".message-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animationDelay = index * 0.2 + "s";
            entry.target.style.transform = "scale(1)";
            entry.target.style.opacity = "1";
          }, index * 150);
        }
      });
    },
    { threshold: 0.1 }
  );

  messageCards.forEach((card) => {
    observer.observe(card);
  });
}

// Gallery Animation - Updated for heart collage with 51 photos
function animateGallery() {
  const heartPhotos = document.querySelectorAll(".heart-photo");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "scale(1)";
          }, index * 25); // Slightly faster animation for 51 photos
        }
      });
    },
    { threshold: 0.1 }
  );

  heartPhotos.forEach((photo, index) => {
    photo.style.opacity = "0";
    photo.style.transform = "scale(0.8)";
    photo.style.transition = "all 0.4s ease";
    observer.observe(photo);
  });
}

// Interactive Image Effects - Updated with small popup for gallery images
function addImageEffects() {
  const timelineImages = document.querySelectorAll(".timeline-image");
  const heartPhotos = document.querySelectorAll(".heart-photo");

  // Timeline images functionality (keep existing large modal)
  timelineImages.forEach((img) => {
    img.addEventListener("click", function () {
      // Simple zoom effect (keep existing code)
      this.style.position = "fixed";
      this.style.top = "50%";
      this.style.left = "50%";
      this.style.transform = "translate(-50%, -50%) scale(1.8)";
      this.style.zIndex = "9999";
      this.style.transition = "all 0.4s ease";
      this.style.borderRadius = "20px";
      this.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.5)";

      // Create overlay
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.background = "rgba(0, 0, 0, 0.8)";
      overlay.style.zIndex = "9998";
      overlay.style.cursor = "pointer";
      overlay.style.backdropFilter = "blur(10px)";

      document.body.appendChild(overlay);

      // Close on click
      const closeModal = () => {
        this.style.position = "relative";
        this.style.top = "auto";
        this.style.left = "auto";
        this.style.transform = "scale(1)";
        this.style.zIndex = "auto";
        this.style.boxShadow = "none";
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      };

      overlay.addEventListener("click", closeModal);
      setTimeout(() => {
        this.addEventListener("click", closeModal, { once: true });
      }, 100);
    });
  });

  // Heart photos functionality (NEW - small popup)
  heartPhotos.forEach((photo) => {
    photo.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const img = this.querySelector("img");
      if (img) {
        openGalleryPopup(img.src, img.alt);
      }
    });
  });
}

// Gallery popup functions
function openGalleryPopup(imageSrc, imageAlt) {
  const popup = document.getElementById("galleryPopup");
  const popupImage = document.getElementById("popupImage");

  if (popup && popupImage) {
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popup.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeGalleryPopup() {
  const popup = document.getElementById("galleryPopup");
  if (popup) {
    popup.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Add sparkle effect on hover - Updated for heart collage
function addSparkleEffect() {
  const sparkleElements = document.querySelectorAll(
    ".timeline-content, .heart-photo, .message-card"
  );

  sparkleElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      if (window.innerWidth > 768) {
        // Only on desktop
        createSparkles(this);
      }
    });
  });
}

function createSparkles(element) {
  const sparkles = ["✨", "⭐", "🌟", "💫"];
  const rect = element.getBoundingClientRect();

  for (let i = 0; i < 3; i++) {
    const sparkle = document.createElement("div");
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.position = "fixed";
    sparkle.style.left = Math.random() * rect.width + rect.left + "px";
    sparkle.style.top = Math.random() * rect.height + rect.top + "px";
    sparkle.style.fontSize = "16px";
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "1000";
    sparkle.style.animation = "sparkleFloat 1.5s ease-out forwards";

    document.body.appendChild(sparkle);

    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, 1500);
  }
}

// Add CSS for sparkle and fade animations
const sparkleStyle = document.createElement("style");
sparkleStyle.textContent = `
  @keyframes sparkleFloat {
    0% {
      opacity: 1;
      transform: translateY(0) scale(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-20px) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-40px) scale(0);
    }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-10px); }
  }
`;
document.head.appendChild(sparkleStyle);

// Confetti Effect
function createConfetti() {
  const colors = ["#FF6B9D", "#FF8E53", "#4ECDC4", "#A8E6CF", "#FFD93D"];
  const confettiCount = 60;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-10px";
    confetti.style.width = Math.random() * 10 + 5 + "px";
    confetti.style.height = Math.random() * 10 + 5 + "px";
    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    confetti.style.transform = "rotate(" + Math.random() * 360 + "deg)";
    confetti.style.animation = `confettiFall ${
      Math.random() * 2 + 3
    }s linear forwards`;
    confetti.style.zIndex = "1000";
    confetti.style.pointerEvents = "none";

    document.body.appendChild(confetti);

    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, 5000);
  }
}

// Add confetti animation CSS
const confettiStyle = document.createElement("style");
confettiStyle.textContent = `
  @keyframes confettiFall {
    to {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(confettiStyle);

// Handle timeline layout for different screen sizes
function handleTimelineLayout() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  if (window.innerWidth <= 768) {
    // Mobile layout - all items on one side
    timelineItems.forEach((item) => {
      const content = item.querySelector(".timeline-content");
      content.style.width = "calc(100% - 70px)";
      content.style.marginLeft = "50px";
      content.style.marginRight = "0";
      content.style.textAlign = "left";
    });
  } else if (window.innerWidth >= 769 && window.innerWidth <= 1023) {
    // Medium screens - centered single column
    timelineItems.forEach((item) => {
      const content = item.querySelector(".timeline-content");
      content.style.width = "70%";
      content.style.margin = "0 auto";
      content.style.textAlign = "left";
    });
  } else {
    // Large desktop layout - alternating sides
    timelineItems.forEach((item, index) => {
      const content = item.querySelector(".timeline-content");
      content.style.width = "45%";
      content.style.maxWidth = "500px";

      if ((index + 1) % 2 === 1) {
        // Odd items (1st, 3rd, 5th, etc.) - Left side
        content.style.marginRight = "auto";
        content.style.marginLeft = "0";
        content.style.textAlign = "left";
      } else {
        // Even items (2nd, 4th, 6th, etc.) - Right side
        content.style.marginLeft = "auto";
        content.style.marginRight = "0";
        content.style.textAlign = "right";
      }
    });
  }
}

// Passcode Functions
function showPasscodePopup() {
  const popup = document.getElementById("passcodePopup");
  const input = document.getElementById("passcodeInput");
  const error = document.getElementById("passcodeError");

  if (popup && input && error) {
    popup.classList.add("active");
    document.body.style.overflow = "hidden";

    // Clear previous input and error
    input.value = "";
    error.classList.remove("show");

    // Focus on input after animation
    setTimeout(() => {
      input.focus();
    }, 300);
  }
}

function closePasscodePopup() {
  const popup = document.getElementById("passcodePopup");
  if (popup) {
    popup.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

function checkPasscode() {
  const input = document.getElementById("passcodeInput");
  const error = document.getElementById("passcodeError");
  const enteredCode = input.value.trim();
  const correctCode = "2929"; // Passcode

  if (enteredCode === correctCode) {
    // Correct passcode
    unlockMessages();
    closePasscodePopup();
    createSuccessConfetti();
  } else {
    // Wrong passcode
    showPasscodeError();

    // Shake animation for input
    if (input) {
      input.style.animation = "shake 0.5s ease-in-out";
      setTimeout(() => {
        input.style.animation = "";
      }, 500);
      input.value = "";
    }
  }
}

function showPasscodeError() {
  const error = document.getElementById("passcodeError");
  if (error) {
    error.classList.add("show");
    setTimeout(() => {
      error.classList.remove("show");
    }, 3000);
  }
}

function unlockMessages() {
  const lockedScreen = document.getElementById("messagesLocked");
  const messagesContent = document.getElementById("messagesContent");

  messagesUnlocked = true;

  if (lockedScreen && messagesContent) {
    // Fade out locked screen
    lockedScreen.style.transition = "all 0.5s ease";
    lockedScreen.style.opacity = "0";
    lockedScreen.style.transform = "translateY(-20px)";

    setTimeout(() => {
      lockedScreen.style.display = "none";
      messagesContent.style.display = "block";
      messagesContent.style.opacity = "0";
      messagesContent.style.transform = "translateY(20px)";

      // Fade in messages content
      setTimeout(() => {
        messagesContent.style.transition = "all 0.6s ease";
        messagesContent.style.opacity = "1";
        messagesContent.style.transform = "translateY(0)";

        // Re-animate message cards
        animateMessageCards();
      }, 100);
    }, 500);
  }
}

function createSuccessConfetti() {
  const colors = ["#FF6B9D", "#FF8E53", "#4ECDC4", "#A8E6CF", "#FFD93D"];
  const symbols = ["💕", "💖", "💝", "🎉", "✨", "🌟"];
  const confettiCount = 40;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    const isSymbol = Math.random() > 0.6;

    if (isSymbol) {
      confetti.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];
      confetti.style.fontSize = Math.random() * 10 + 15 + "px";
    } else {
      confetti.style.width = Math.random() * 8 + 4 + "px";
      confetti.style.height = Math.random() * 8 + 4 + "px";
      confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    }

    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-10px";
    confetti.style.transform = "rotate(" + Math.random() * 360 + "deg)";
    confetti.style.animation = `confettiFall ${
      Math.random() * 2 + 3
    }s linear forwards`;
    confetti.style.zIndex = "10001";
    confetti.style.pointerEvents = "none";

    document.body.appendChild(confetti);

    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, 5000);
  }
}

// Add shake animation CSS
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function () {
  updateMarriageTimer();
  setInterval(updateMarriageTimer, 3600000); // Update every hour
  animateTimeline();
  animateMessageCards();
  animateGallery();
  addImageEffects();
  addSparkleEffect();
  handleTimelineLayout();

  // Add birthday confetti effect after a delay
  setTimeout(() => {
    createConfetti();
  }, 1500);

  // Add more confetti periodically on home page
  setInterval(() => {
    if (document.getElementById("home").classList.contains("active")) {
      createConfetti();
    }
  }, 4000);

  // Passcode input event listeners
  const passcodeInput = document.getElementById("passcodeInput");
  const passcodePopup = document.getElementById("passcodePopup");

  if (passcodeInput) {
    passcodeInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        checkPasscode();
      }
    });
  }

  if (passcodePopup) {
    passcodePopup.addEventListener("click", function (e) {
      if (e.target === passcodePopup) {
        closePasscodePopup();
      }
    });
  }

  // Gallery popup event listeners
  const galleryPopup = document.getElementById("galleryPopup");
  if (galleryPopup) {
    galleryPopup.addEventListener("click", function (e) {
      if (e.target === galleryPopup) {
        closeGalleryPopup();
      }
    });
  }

  // Close popups with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (passcodePopup && passcodePopup.classList.contains("active")) {
        closePasscodePopup();
      }
      if (galleryPopup && galleryPopup.classList.contains("active")) {
        closeGalleryPopup();
      }
    }
  });
});

// Handle window resize
window.addEventListener("resize", function () {
  handleTimelineLayout();
});

// Add keyboard navigation
document.addEventListener("keydown", function (e) {
  const pages = ["home", "journey", "gallery", "messages"];
  const currentPage = document.querySelector(".page.active").id;
  const currentIndex = pages.indexOf(currentPage);

  if (e.key === "ArrowRight" && currentIndex < pages.length - 1) {
    const nextBtn = document.querySelectorAll(".nav-btn")[currentIndex + 1];
    nextBtn.click();
  } else if (e.key === "ArrowLeft" && currentIndex > 0) {
    const prevBtn = document.querySelectorAll(".nav-btn")[currentIndex - 1];
    prevBtn.click();
  }
});

// Add touch gesture support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function (e) {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", function (e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const pages = ["home", "journey", "gallery", "messages"];
  const currentPage = document.querySelector(".page.active").id;
  const currentIndex = pages.indexOf(currentPage);

  if (
    touchEndX < touchStartX - swipeThreshold &&
    currentIndex < pages.length - 1
  ) {
    // Swipe left - next page
    const nextBtn = document.querySelectorAll(".nav-btn")[currentIndex + 1];
    nextBtn.click();
  }

  if (touchEndX > touchStartX + swipeThreshold && currentIndex > 0) {
    // Swipe right - previous page
    const prevBtn = document.querySelectorAll(".nav-btn")[currentIndex - 1];
    prevBtn.click();
  }
}
