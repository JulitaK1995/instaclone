document.addEventListener("DOMContentLoaded", function() {
  let currentIndex = 0;
  const images = document.querySelectorAll('.carousel-image');
  const totalImages = images.length;
  const currentImageElement = document.getElementById('current-image');

  function showImage(index) {
    images.forEach((img, i) => {
      img.style.display = i === index ? 'block' : 'none';
    });
    currentImageElement.textContent = index + 1;
  }

  document.querySelector('.carousel-prev').addEventListener('click', function() {
    currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
    showImage(currentIndex);
  });

  document.querySelector('.carousel-next').addEventListener('click', function() {
    currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
    showImage(currentIndex);
  });

  showImage(currentIndex);
});
