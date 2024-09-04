import "@hotwired/turbo-rails";

document.addEventListener("turbo:load", function() {
  // Funkcja do otwierania modalu
  function openModal(modal, imageUrl, caption) {
    var modalImage = modal.querySelector("#modal-avatar-image");
    var modalCaption = modal.querySelector("#modal-avatar-caption");

    modalImage.src = imageUrl;
    modalCaption.textContent = caption;

    // Otwórz modal
    $(modal).modal('show');
  

    // Nasłuchiwanie na klawisz Escape
    const escapeListener = function(event) {
      if (event.key === "Escape") {
        $(modal).modal('hide');
        document.removeEventListener("keydown", escapeListener);
      }
    };
    document.addEventListener("keydown", escapeListener);
  }

  // Obsługa kliknięcia na avatar
  var avatars = document.querySelectorAll(".avatar-image");
  avatars.forEach(function(img) {
    img.addEventListener("click", function() {
      var userId = img.dataset.userId;
      var modal = document.getElementById("avatarModal");

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
});
