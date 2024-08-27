import "@hotwired/turbo-rails"

// JavaScript kod
document.addEventListener("turbo:load", function() {
  // Funkcja do otwierania modalu
  function openModal(modal, imgSrc, captionText) {
    var modalImg = modal.querySelector(".modal-content");
    var caption = modal.querySelector(".caption");

    modal.style.display = "block";
    modalImg.src = imgSrc;
    if (caption) caption.innerHTML = captionText;

    // Nasłuchiwanie na klawisz Escape
    const escapeListener = function(event) {
      if (event.key === "Escape") {
        modal.style.display = "none";
        document.removeEventListener("keydown", escapeListener);
      }
    };
    document.addEventListener("keydown", escapeListener);

    // Zamknięcie modalu po kliknięciu przycisku "close"
    var span = modal.querySelector(".close");
    span.addEventListener("click", function() {
      modal.style.display = "none";
      document.removeEventListener("keydown", escapeListener);
    });

    // Zamknięcie modalu po kliknięciu w dowolne miejsce poza obrazkiem
    modal.addEventListener("click", function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
        document.removeEventListener("keydown", escapeListener);
      }
    });
  }

  // Obsługa kliknięcia na avatar
  var avatars = document.querySelectorAll(".avatar-image");
  avatars.forEach(function(img) {
    img.addEventListener("click", function() {
      var userId = img.dataset.userId;
      var modalId = "modal-" + userId;
      var modal = document.getElementById(modalId);

      fetch(`/users/${userId}/avatar_data`)
        .then(response => response.json())
        .then(data => {
          openModal(modal, data.image_url, data.caption);
        });
    });
  });

  // Obsługa kliknięcia na zdjęcia z postów
  var postImages = document.querySelectorAll(".post-image");
  postImages.forEach(function(img) {
    img.addEventListener("click", function() {
      var modal = document.getElementById("image-modal");
      openModal(modal, img.src, "");
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".reply-toggle").forEach(function(button) {
      button.addEventListener("click", function() {
        var commentId = button.getAttribute("data-comment-id");
        var formContainer = document.getElementById("reply-form-" + commentId);
        if (formContainer) {
          // Toggle visibility of the form
          if (formContainer.style.display === "none" || formContainer.style.display === "") {
            formContainer.style.display = "block";
            // Optionally focus on the text area
            formContainer.querySelector(".reply-input").focus();
          } else {
            formContainer.style.display = "none";
          }
        }
      });
    });
  });
  
});