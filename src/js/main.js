
///////////////////////// SLIDER /////////////////////////

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


///////////////////////// ANIMACIONES AL HACER SCROLL /////////////////////////

// Selecciona todos los elementos que quieres animar al hacer scroll
const elements = document.querySelectorAll('.animate-on-scroll');

// Configura el Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const animation = entry.target.getAttribute('data-animation'); // Obtener la animación del atributo data
      // Remueve las clases de animación antes de agregarla para forzar la animación
      entry.target.classList.remove('animate__animated', animation);

      // Usar setTimeout para permitir que el navegador procese la remoción de clases y luego agregar la animación
      setTimeout(() => {
        entry.target.classList.add('animate__animated', animation);
      }, 100); // 100ms de retraso para asegurar la transición fluida
    } else {
      // Remueve la clase cuando el elemento no es visible para reiniciar la animación
      const animation = entry.target.getAttribute('data-animation'); // Obtener la animación del atributo data
      entry.target.classList.remove('animate__animated', animation);
    }
  });
}, {
  threshold: 0.5 // El 50% del elemento debe estar visible para activar la animación
});

// Asocia el Intersection Observer con los elementos
elements.forEach(element => {
  observer.observe(element);
});



///////////////////////// MENU RESPONSIVE /////////////////////////


const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

// Verificar si los elementos existen
if (burger && mobileMenu) {
    // Función para alternar el menú móvil
    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('hidden');
    };

    // Agregar evento al botón burger
    burger.addEventListener('click', toggleMobileMenu);

    // Cerrar el menú al hacer clic en un enlace
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden'); // Oculta el menú
        });
    });
} else {
    console.warn('No se encontraron los elementos burger o mobileMenu');
}



