import "@hotwired/turbo-rails"

// JavaScript kod
document.addEventListener("turbo:load", function() {
  var images = document.querySelectorAll(".avatar-image");

  images.forEach(function(img) {
    img.addEventListener("click", function() {
      var userId = img.dataset.userId;
      var modalId = "modal-" + userId;
      var modal = document.getElementById(modalId);
      var modalImg = modal.querySelector(".modal-content");
      var captionText = modal.querySelector("#caption-" + userId);

      // Wykonanie zapytania AJAX do serwera, aby uzyskać dodatkowe dane (jeśli potrzebne)
      fetch(`/users/${userId}/avatar_data`)
        .then(response => response.json())
        .then(data => {
          // Załaduj dane do modalu
          modal.style.display = "block";
          modalImg.src = data.image_url;
          captionText.innerHTML = data.caption;

          // Dodaj nasłuchiwanie na klawisz Escape tylko raz po otwarciu modalu
          const escapeListener = function(event) {
            if (event.key === "Escape") {
              modal.style.display = "none";
              document.removeEventListener("keydown", escapeListener);
            }
          };
          document.addEventListener("keydown", escapeListener);
        });

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
    });
  });
});