import "@hotwired/turbo-rails";

document.addEventListener("turbo:load", function() {
  // Funkcja do tworzenia i otwierania modala
  function openModal(imageUrl) {
    // Tworzymy element modal, jeśli jeszcze nie istnieje
    let existingModal = document.getElementById('avatarModal');
    if (!existingModal) {
      let modal = document.createElement('div');
      modal.id = 'avatarModal';
      modal.classList.add('modal');
      modal.innerHTML = `
        <span class="close">&times;</span>
        <img class="modal-avatar-image" id="modal-avatar-image" alt="Avatar">
      `;

      document.body.appendChild(modal);

      // Zamknij modal po kliknięciu na przycisk X
      modal.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none';
      });

      // Zamknij modal po kliknięciu poza obrazek
      window.addEventListener('click', function(event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      });
    }

    // Aktualizuj źródło obrazka i pokaż modal
    let modalImg = document.getElementById("modal-avatar-image");
    modalImg.src = imageUrl;
    document.getElementById('avatarModal').style.display = "flex";
  }

  // Nasłuchuj na klawisz Escape, by zamknąć modal
  function setupEscapeListener() {
    const escapeListener = function(event) {
      if (event.key === "Escape") {
        let modal = document.getElementById('avatarModal');
        if (modal) {
          modal.style.display = "none";
        }
      }
    };
    document.addEventListener("keydown", escapeListener);

    // Usuń nasłuchiwacz przy zamknięciu modala
    document.getElementById('avatarModal')?.querySelector('.close')?.addEventListener('click', function() {
      document.removeEventListener("keydown", escapeListener);
    });
  }

  // Obsługa kliknięcia na avatar
  var avatars = document.querySelectorAll(".avatar-image");
  avatars.forEach(function(img) {
    img.addEventListener("click", function() {
      var imageUrl = img.src;  // Używamy źródła obrazka z klikniętego avatara
      openModal(imageUrl);
      setupEscapeListener();
    });
  });

  // Obsługa kliknięcia na zdjęcia z postów
  var postImages = document.querySelectorAll(".post-image");
  postImages.forEach(function(img) {
    img.addEventListener("click", function() {
      var imageUrl = img.src;  // Używamy źródła obrazka z klikniętego zdjęcia
      openModal(imageUrl);
      setupEscapeListener();
    });
  });
});
