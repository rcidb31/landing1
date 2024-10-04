const track = document.querySelector('.slide-track');// Inicializa la posición del slide al hacer click en el botón prev
const slides = document.querySelectorAll('.slide');// Inicializa la posición del slide al hacer click en el botón prev
const prevButton = document.getElementById('prev');// Inicializa la posición del slide al hacer click en el botón prev
const nextButton = document.getElementById('next');// Inicializa la posición del slide al hacer click en el botón next


let currentIndex = 0;

// función para actualizar la posición del slide
function updateSlidePosition() {
  const width = slides[currentIndex].clientWidth;
  track.style.transform = `translateX(-${currentIndex * width}px)`;
}
// Inicializa la posición del slide al hacer click en el botón next
nextButton.addEventListener('click', () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0; // Vuelve al inicio
  }
  updateSlidePosition();
});

// Inicializa la posición del slide al hacer click en el botón prev
prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = slides.length - 1; // Va al último slide
  }
  updateSlidePosition();
});

window.addEventListener('resize', updateSlidePosition);
