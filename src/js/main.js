
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



//////////////////////// ANIMACIONES AL HACER SCROLL /////////////////////////

// Seleccionar todos los elementos que se animarán al hacer scroll
const elements = document.querySelectorAll('.animate-on-scroll');

// Configurar el Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    
    const animation = entry.target.dataset.animation; // Obtener la animación del atributo data-animation

    if (entry.isIntersecting) {
      // Remueve y vuelve a agregar la clase para reiniciar la animación
      entry.target.classList.remove('animate__animated', animation);
      setTimeout(() => {
        entry.target.classList.add('animate__animated', animation);
      }, 100);
    } else {
      // Elimina la animación cuando el elemento deja de ser visible
      entry.target.classList.remove('animate__animated', animation);
    }
  });
}, 
 {
   threshold: 0.5 // Se activa cuando el 50% del elemento está visible en la pantalla
});

    // Asignar el observer a cada elemento con la clase .animate-on-scroll
     elements.forEach(element => observer.observe(element));




///////////////////////// MENU RESPONSIVE /////////////////////////

    // Elementos
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');

    // Toggle menú móvil
    burger.addEventListener('click', () => {
        const expanded = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', !expanded);
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('block');
    });

    // Cerrar el menú móvil al hacer clic en un enlace
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            burger.setAttribute('aria-expanded', false);
        });
    });



// contador de visitas. 

 let visitas = localStorage.getItem("visitas"); 
  if (!visitas) {
    visitas = 1;
  } else {
    visitas = parseInt(visitas) + 1;
  }

  localStorage.setItem("visitas", visitas);
  document.getElementById("visitas").textContent = 
    `Esta es tu visita número: ${visitas}`;