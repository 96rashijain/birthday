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
  const heartPhotos = document.querySelectorAll(".heart-photo");

  // Heart photos functionality (Gallery images with small popup)
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
let touchStartY = 0;
let touchEndY = 0;
let touchStartTime = 0;

document.addEventListener("touchstart", function (e) {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
  touchStartTime = Date.now();
});

document.addEventListener("touchend", function (e) {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;

  // Only process swipes that are quick (under 500ms)
  const touchDuration = Date.now() - touchStartTime;
  if (touchDuration < 500) {
    handleSwipe();
  }
});

function handleSwipe() {
  const swipeThreshold = 80; // Increased threshold
  const swipeDistance = Math.abs(touchEndX - touchStartX);
  const pages = ["home", "journey", "gallery", "messages"];
  const currentPage = document.querySelector(".page.active").id;
  const currentIndex = pages.indexOf(currentPage);

  // Only process if it's a clear horizontal swipe (not vertical scroll)
  const verticalMovement = Math.abs(touchEndY - touchStartY);
  if (verticalMovement > swipeDistance * 0.7) {
    return; // This was more of a vertical scroll, ignore
  }

  if (
    touchEndX < touchStartX - swipeThreshold &&
    currentIndex < pages.length - 1 &&
    swipeDistance > swipeThreshold
  ) {
    // Swipe left - next page
    const nextBtn = document.querySelectorAll(".nav-btn")[currentIndex + 1];
    nextBtn.click();
  }

  if (
    touchEndX > touchStartX + swipeThreshold &&
    currentIndex > 0 &&
    swipeDistance > swipeThreshold
  ) {
    // Swipe right - previous page
    const prevBtn = document.querySelectorAll(".nav-btn")[currentIndex - 1];
    prevBtn.click();
  }
}

// Music Player Variables
let isPlaying = false;
let audioElement = null;

// Initialize audio element
function initializeAudio() {
  audioElement = document.getElementById("backgroundMusic");
  if (audioElement) {
    audioElement.volume = 0.5; // Set initial volume to 50%

    // Add event listeners
    audioElement.addEventListener("ended", function () {
      // This shouldn't fire due to loop attribute, but just in case
      audioElement.currentTime = 0;
      audioElement.play();
    });

    audioElement.addEventListener("error", function (e) {
      console.log("Audio error:", e);
      showMusicMessage(
        "❌ Couldn't load the music file. Please check if the file exists! 🎵",
        4000
      );
    });

    audioElement.addEventListener("canplaythrough", function () {
      console.log("Audio loaded successfully!");
    });
  }
}

// Toggle music play/pause
function toggleMusic() {
  const musicBtn = document.getElementById("musicToggle");
  const musicIcon = musicBtn.querySelector(".music-icon");
  const musicText = musicBtn.querySelector(".music-text");

  if (!audioElement) {
    initializeAudio();
    return;
  }

  if (!isPlaying) {
    // Play music
    const playPromise = audioElement.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Audio started successfully
          isPlaying = true;
          musicBtn.classList.add("playing");
          musicIcon.textContent = "⏸️";
          musicText.textContent = "Pause Our Song";

          // Add floating music notes effect
          createMusicNotes();

          // Show success message
          showMusicMessage(
            "🎵 Our love song is now playing... Let the memories dance! 💕"
          );
        })
        .catch((error) => {
          // Auto-play was prevented
          console.log("Playback prevented:", error);
          showMusicMessage(
            "🎵 Click again to start our love song! (Browser blocked autoplay) 💕",
            4000
          );
        });
    }
  } else {
    // Pause music
    audioElement.pause();
    isPlaying = false;
    musicBtn.classList.remove("playing");
    musicIcon.textContent = "🎵";
    musicText.textContent = "Play Our Song";

    showMusicMessage("🔇 Music paused... but our love plays on forever! 💖");
  }
}

// Adjust volume
function adjustVolume(volume) {
  if (audioElement) {
    audioElement.volume = volume / 100;
  }

  // Update volume icon based on level
  const volumeIcon = document.querySelector(".volume-icon");
  if (volumeIcon) {
    if (volume == 0) {
      volumeIcon.textContent = "🔇";
    } else if (volume < 30) {
      volumeIcon.textContent = "🔉";
    } else {
      volumeIcon.textContent = "🔊";
    }
  }
}

// Create floating music notes effect
function createMusicNotes() {
  const notes = ["🎵", "🎶", "♪", "♫", "🎼"];

  for (let i = 0; i < 6; i++) {
    const note = document.createElement("div");
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    note.style.position = "fixed";
    note.style.left = Math.random() * (window.innerWidth - 50) + "px";
    note.style.top = window.innerHeight + "px";
    note.style.fontSize = Math.random() * 10 + 18 + "px";
    note.style.color = "#FF6B9D";
    note.style.pointerEvents = "none";
    note.style.zIndex = "1000";
    note.style.animation = `musicNoteFloat ${
      Math.random() * 2 + 4
    }s linear forwards`;
    note.style.textShadow = "0 0 10px rgba(255, 107, 157, 0.5)";

    document.body.appendChild(note);

    setTimeout(() => {
      if (note.parentNode) {
        note.parentNode.removeChild(note);
      }
    }, 6000);
  }

  // Continue creating notes while music is playing
  if (isPlaying) {
    setTimeout(createMusicNotes, 4000);
  }
}

// Show music message
function showMusicMessage(message, duration = 3000) {
  // Remove existing message if any
  const existingMessage = document.querySelector(".music-notification");
  if (existingMessage) {
    existingMessage.remove();
  }

  const notification = document.createElement("div");
  notification.className = "music-notification";
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 107, 157, 0.9);
    color: white;
    padding: 15px 25px;
    border-radius: 25px;
    font-size: 14px;
    font-weight: 600;
    z-index: 10000;
    animation: musicMessageSlide 0.5s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 25px rgba(255, 107, 157, 0.4);
    text-align: center;
    max-width: 90vw;
  `;

  document.body.appendChild(notification);

  // Remove after specified duration
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "musicMessageSlide 0.5s ease reverse";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 500);
    }
  }, duration);
}

// Add CSS animations for music effects
if (!document.querySelector("#musicAnimations")) {
  const musicAnimationsStyle = document.createElement("style");
  musicAnimationsStyle.id = "musicAnimations";
  musicAnimationsStyle.textContent = `
    @keyframes musicNoteFloat {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      50% {
        transform: translateY(-250px) rotate(180deg);
        opacity: 0.8;
      }
      100% {
        transform: translateY(-500px) rotate(360deg);
        opacity: 0;
      }
    }
    
    @keyframes musicMessageSlide {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  `;
  document.head.appendChild(musicAnimationsStyle);
}

// Initialize music player when gallery page is visited
function initializeMusicPlayer() {
  initializeAudio();

  // Show welcome message
  setTimeout(() => {
    const galleryPage = document.getElementById("gallery");
    if (galleryPage && galleryPage.classList.contains("active")) {
      showMusicMessage(
        "🎵 Welcome to our memories! Click 'Play Our Song' to add music to your journey! 💕",
        4000
      );
    }
  }, 1000);
}

// Override the original showPage function to handle music
const originalShowPage = window.showPage || showPage;
window.showPage = function (pageId) {
  originalShowPage(pageId);

  if (pageId === "gallery") {
    // Initialize music player when gallery page is visited
    setTimeout(initializeMusicPlayer, 500);
  } else if (isPlaying && audioElement) {
    // Pause music when leaving gallery page
    audioElement.pause();
    isPlaying = false;
    const musicBtn = document.getElementById("musicToggle");
    if (musicBtn) {
      musicBtn.classList.remove("playing");
      const musicIcon = musicBtn.querySelector(".music-icon");
      const musicText = musicBtn.querySelector(".music-text");
      if (musicIcon) musicIcon.textContent = "🎵";
      if (musicText) musicText.textContent = "Play Our Song";
    }
  }
};

// Ensure showPage is globally available
if (!window.showPage) {
  window.showPage = originalShowPage;
}
let heartsInterval;

function createFloatingHeart() {
  const heartsContainer = document.getElementById("floatingHearts");
  if (!heartsContainer) return;

  const hearts = ["🧡", "❤️", "🧡", "❤️", "🧡", "❤️", "🧡", "❤️", "🧡", "❤️"];
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

  // Random starting position
  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s"; // 4-7 seconds
  heart.style.animationDelay = Math.random() * 2 + "s";

  // Add some horizontal drift
  const drift = (Math.random() - 0.5) * 100;
  heart.style.setProperty("--drift", drift + "px");

  heartsContainer.appendChild(heart);

  // Remove heart after animation completes
  setTimeout(() => {
    if (heart.parentNode) {
      heart.parentNode.removeChild(heart);
    }
  }, 8000);
}

function startFloatingHearts() {
  // Create hearts at regular intervals
  heartsInterval = setInterval(createFloatingHeart, 800);

  // Create initial hearts
  for (let i = 0; i < 3; i++) {
    setTimeout(createFloatingHeart, i * 200);
  }
}

function stopFloatingHearts() {
  if (heartsInterval) {
    clearInterval(heartsInterval);
  }
}

// Enhanced floating hearts with horizontal drift
const floatingHeartsStyle = document.createElement("style");
floatingHeartsStyle.textContent = `
  @keyframes floatUp {
    0% {
      transform: translateY(100vh) translateX(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) translateX(var(--drift, 0px)) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(floatingHeartsStyle);

// Start hearts when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Start floating hearts after a short delay
  setTimeout(startFloatingHearts, 1000);
});

// Optional: Restart hearts when page changes (if you want)
const originalShowPageForHearts = window.showPage;
window.showPage = function (pageId) {
  if (originalShowPageForHearts) {
    originalShowPageForHearts(pageId);
  }

  // Clear existing hearts
  const heartsContainer = document.getElementById("floatingHearts");
  if (heartsContainer) {
    heartsContainer.innerHTML = "";
  }

  // Restart hearts animation
  stopFloatingHearts();
  setTimeout(startFloatingHearts, 500);
};
