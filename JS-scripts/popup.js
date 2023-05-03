document.addEventListener("DOMContentLoaded", () => {
    const popupOverlay = document.querySelector(".popup-overlay");
    const skipButton = document.querySelector(".skip-button");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          popupOverlay.classList.add("active");
        }
      });
    
  
    // Add an event listener to the skip button to delete the popup
    skipButton.addEventListener("click", () => {
      popupOverlay.remove("popup-overlay active");
    });
  });